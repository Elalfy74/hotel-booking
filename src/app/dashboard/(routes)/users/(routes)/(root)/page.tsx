import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { UsersTable } from './_components/users-table';

const UsersPage = async () => {
  return (
    <>
      <PageHeading title="users" singleTile="user" />
      <UsersTable />
    </>
  );
};
export default UsersPage;
