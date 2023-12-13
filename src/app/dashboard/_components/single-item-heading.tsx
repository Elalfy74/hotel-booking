import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface SingleItemHeadingProps {
  title: string;
  singleTile: string;
}

export const SingleItemHeading = ({ title, singleTile }: SingleItemHeadingProps) => {
  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold capitalize">Edit {singleTile}</h1>
      <Link className="capitalize text-blue-500" href={`/dashboard/${title}`}>
        <ArrowLeftIcon className="mr-1 inline-block h-4 w-4" />
        Back to {title}
      </Link>
    </>
  );
};
