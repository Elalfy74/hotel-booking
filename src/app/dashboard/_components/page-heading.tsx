import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface PageHeadingProps {
  title: string;
  singleTile: string;
  subtitle?: string;
}

export const PageHeading = ({ title, singleTile, subtitle }: PageHeadingProps) => {
  return (
    <div className="mb-10 flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold capitalize">{title}</h1>
        <p className="text-muted-foreground">{subtitle ?? `View and manage your ${title}`}</p>
      </div>
      <Button size="lg" asChild>
        <Link href={`/dashboard/${title}/new`}>
          <PlusCircleIcon className="mr-2 h-4 w-4" />
          Add {singleTile}
        </Link>
      </Button>
    </div>
  );
};
