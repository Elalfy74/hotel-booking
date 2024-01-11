import { PageHeading } from '@/app/dashboard/_components/page-heading';

import { CreateHotelCategoryDialog } from './_components/create-hotel-category-dialog';
import { HotelCategoriesTable } from './_components/hotel-categories-table';

export default function HotelCategoriesPage() {
  return (
    <>
      <PageHeading
        title="hotel categories"
        singleTile="hotel category"
        CreateButton={CreateHotelCategoryDialog}
      />
      <HotelCategoriesTable />
    </>
  );
}
