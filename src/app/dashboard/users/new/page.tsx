import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

import { CreateUserForm } from './_components/create-user-form';

const CreateUserPage = () => {
  return (
    <>
      <h1 className="mb-2 text-4xl font-semibold">Create User</h1>
      <Link className="text-blue-500" href="/dashboard/users">
        <ArrowLeftIcon className="mr-1 inline-block h-4 w-4" />
        Back to Users
      </Link>
      <CreateUserForm />
    </>
  );
};

export default CreateUserPage;
