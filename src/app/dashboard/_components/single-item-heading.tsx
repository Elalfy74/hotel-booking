import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface SingleItemHeadingProps {
  title: string;
  singleTile: string;
  action: 'create' | 'edit';
}

export const SingleItemHeading = ({ title, singleTile, action }: SingleItemHeadingProps) => {
  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold capitalize">
        {action} {singleTile}
      </h1>
      <Link className="capitalize text-blue-500" href={`/dashboard/${title}`}>
        <ArrowLeftIcon className="mr-1 inline-block h-4 w-4" />
        Back to {title}
      </Link>
    </>
  );
};
