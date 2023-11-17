import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export default async function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <p>Shadcn Working</p>
    </main>
  );
}
