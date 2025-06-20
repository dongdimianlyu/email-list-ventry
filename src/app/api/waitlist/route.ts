import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }

  try {
    const waitlistCollection = db.collection('waitlist');

    // Optional: Check for duplicate emails
    const snapshot = await waitlistCollection.where('email', '==', email).get();
    if (!snapshot.empty) {
      return NextResponse.json({ error: 'This email is already on the waitlist.' }, { status: 409 });
    }

    await waitlistCollection.add({
      email: email,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'You have been added to the waitlist!' });
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json({ error: 'Something went wrong. Please check server logs for details.' }, { status: 500 });
  }
} 