import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export default async function Home() {
  return (
    <main className='flex items-center justify-center h-screen w-full'>
      <Button>Shadcn Working</Button>
    </main>
  );
}
