'use client';

import { useState, FormEvent } from 'react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setMessage(data.message);
      setEmail('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#1A4231] text-gray-100 p-4">
      <div className="max-w-3xl w-full mx-auto text-center space-y-12">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Be first to unlock AI-driven growth playbooks—get an <span style={{color: '#C9F223'}}>AI COO</span> that turns every dollar into <span style={{color: '#C9F223'}}>predictable scale</span>.
          </h1>
          <p className="text-lg text-gray-500 md:text-xl dark:text-gray-400">
            Join the Ventry waitlist and turn every dollar of your monthly revenue into reliable, data-driven growth. It&apos;s like having a seasoned operations partner on your team—without the six-figure salary.
          </p>

          <div className="w-full max-w-sm mx-auto">
            <form className="flex space-x-2" onSubmit={handleSubmit}>
              <input
                className="flex-1 px-4 py-2 text-gray-900 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                className="px-6 py-2 text-gray-900 bg-[#C9F223] rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#C9F223] focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Joining...' : 'Join the Waitlist'}
              </button>
            </form>
            {message && <p className="text-green-500 mt-4">{message}</p>}
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </header>

        <section 
          className= "w-full max-w-5xl mx-auto py-12 bg-[#21433c] rounded-lg shadow-lg border border-white"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '25px 25px',
          }}
        >
            <div className="container px-4 md:px-6">
                <div className="space-y-3 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter text-white md:text-4xl/tight">
                        How Ventry Works Like a Real COO
                    </h2>
                    <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Ventry gives you a clear path to growth. By analyzing your unique business metrics, it crafts and executes strategies with the precision of a world-class operations expert.
                    </p>
                </div>
                <div className="mx-auto mt-8 grid gap-8 sm:grid-cols-2">
                    <div className="p-4 rounded-lg text-left">
                        <h3 className="text-xl font-bold mb-2 text-white">Data-Driven Strategy</h3>
                        <p className="text-gray-300">Leveraging multimodal LLMs and RAG-driven benchmarks—backed by hundreds of e-commerce case studies and leading venture-operations texts—Ventry analyzes your business&apos;s unique metrics.</p>
                    </div>
                    <div className="p-4 rounded-lg text-left">
                        <h3 className="text-xl font-bold mb-2 text-white">Cohesive Monthly Plans</h3>
                        <p className="text-gray-300">It generates a cohesive monthly strategy to ensure every marketing dollar and operational tweak contributes directly to your bottom line.</p>
                    </div>
                    <div className="p-4 rounded-lg text-left">
                        <h3 className="text-xl font-bold mb-2 text-white">Precision-Tuned Daily Actions</h3>
                        <p className="text-gray-300">Ventry provides you with precision-tuned daily action plans, turning high-level strategy into clear, manageable tasks for you and your team.</p>
                    </div>
                     <div className="p-4 rounded-lg text-left">
                        <h3 className="text-xl font-bold mb-2 text-white">Continuous Optimization</h3>
                        <p className="text-gray-300">Just like a human partner, Ventry learns and adapts, continuously refining its approach based on what&apos;s working for your business right now.</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join the Exclusive Beta</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Sign up now to be one of the 100 exclusive beta testers and experience the future of business execution for absolutely free. No credit card required. We will send you the beta version as soon as it&apos;s ready.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
              </div>
            </div>
          </div>
        </section>

        <footer className="w-full py-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ventry Inc. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
