'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

export default function LandingPage() {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    router.push(`/user/${username.trim()}`);
  };

  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#302e2b] text-white p-4">

        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-[#81b64c] tracking-tighter">
            CHESS WRAPPED
          </h1>
          <p className="text-zinc-400 mt-2">
            Enter your username to see your 2025 stats.
          </p>
        </div>

        <Card className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. Hikaru)"
                autoFocus
            />

            <Button
                type="submit"
                fullWidth
                isLoading={isLoading}
                disabled={!username.trim()}
            >
              GENERATE
            </Button>
          </form>
        </Card>

      </main>
  );
}