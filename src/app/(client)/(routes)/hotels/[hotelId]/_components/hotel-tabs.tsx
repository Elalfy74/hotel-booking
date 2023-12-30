import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HotelDescription = ({ description }: { description: string }) => {
  return <p className="leading-7 tracking-wide text-gray-700 dark:text-gray-100">{description}</p>;
};

const HotelFeatures = ({ features }: { features: { id: string; name: string }[] }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {features.map((feature) => (
        <span
          key={feature.id}
          className="h-fit rounded-lg bg-white px-3 py-2 shadow-sm dark:border dark:border-gray-300 dark:bg-transparent dark:text-white"
        >
          {feature.name}
        </span>
      ))}
    </div>
  );
};

interface HotelTabsProps {
  description: string;
  features: { id: string; name: string }[];
}
export const HotelTabs = ({ description, features }: HotelTabsProps) => {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-transparent">
        <TabsTrigger
          value="description"
          className="rounded-none border-b text-black data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none dark:text-white"
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          value="features"
          className="rounded-none border-b text-black data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none dark:text-white"
        >
          Features
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description" className="px-1 pt-2">
        <HotelDescription description={description} />
      </TabsContent>
      <TabsContent value="features" className="px-1 pt-2">
        <HotelFeatures features={features} />
      </TabsContent>
    </Tabs>
  );
};
