import { Heading } from '@/app/dashboard/_components/heading';

import { UsersTable } from './_components/users-table';

const UsersPage = async () => {
  return (
    <>
      <Heading title="users" singleTile="user" />
      <UsersTable />
    </>
  );
};
export default UsersPage;
