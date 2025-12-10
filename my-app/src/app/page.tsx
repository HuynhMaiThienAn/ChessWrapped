'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      router.push(`/user/${username}`);
    }
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#302e2b] text-white p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-[#81b64c]">
            CHESS WRAPPED
          </h1>
          <p className="text-zinc-400">Enter your Chess.com username to see your year in review.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. hikaru)"
                className="p-4 rounded-lg bg-[#262421] border border-zinc-700 text-white focus:outline-none focus:border-[#81b64c]"
            />
            <button
                type="submit"
                className="p-4 rounded-lg bg-[#81b64c] font-bold text-white hover:bg-[#a3d160] transition-colors"
            >
              GENERATE REPORT
            </button>
          </form>
        </div>
      </main>
  );
}