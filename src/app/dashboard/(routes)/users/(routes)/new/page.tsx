import { SingleItemHeading } from '@/app/dashboard/_components/single-item-heading';

import { CreateUserForm } from './_components/create-user-form';

const CreateUserPage = () => {
  return (
    <>
      <SingleItemHeading title="users" singleTile="user" action="create" />
      <CreateUserForm />
    </>
  );
};

export default CreateUserPage;
