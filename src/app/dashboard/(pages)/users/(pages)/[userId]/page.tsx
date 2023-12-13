import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { EditUser } from './_components/edit-user';

interface SingleUserPageProps {
  params: { userId: string };
}

export const dynamic = 'force-static';

const SingleUserPage = ({ params: { userId } }: SingleUserPageProps) => {
  return (
    <>
      <SingleItemHeading title="users" singleTile="User" />
      <EditUser userId={userId} />
    </>
  );
};

export default SingleUserPage;
