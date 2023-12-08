import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { EditUser } from './_components/edit-user';

interface SingleUserPageProps {
  params: { userId: string };
}

export const dynamic = 'force-static';

const SingleUserPage = ({ params: { userId } }: SingleUserPageProps) => {
  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold">Edit User</h1>
      <Link className="text-blue-500" href="/dashboard/users">
        <ArrowLeftIcon className="mr-1 inline-block h-4 w-4" />
        Back to Users
      </Link>
      <EditUser userId={userId} />
    </>
  );
};

export default SingleUserPage;
