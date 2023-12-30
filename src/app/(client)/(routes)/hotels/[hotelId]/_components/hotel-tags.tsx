interface HotelTagsProps {
  tags: { id: string; name: string }[];
}

const colorsClasses = [
  'bg-orange-200 text-orange-600',
  'bg-pink-200 text-pink-600',
  'bg-cyan-200 text-cyan-600',
  'bg-teal-200 text-teal-600',
  'bg-blue-200 text-blue-600',
  'bg-purple-200 text-purple-600',
];

export const HotelTags = ({ tags }: HotelTagsProps) => {
  if (!tags.length) {
    return null;
  }

  const fixedTags = tags.slice(0, colorsClasses.length);

  return (
    <div className="my-5 flex flex-wrap gap-5">
      {fixedTags.map((tag, i) => (
        <span key={tag.id} className={`rounded-lg p-2 text-xs ${colorsClasses[i]}`}>
          {tag.name}
        </span>
      ))}
    </div>
  );
};
