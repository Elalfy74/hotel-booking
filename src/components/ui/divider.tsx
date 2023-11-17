export const Divider = ({ children }: { children: string }) => {
  return (
    <div className="relative flex items-center py-5 text-sm">
      <div className="flex-grow border-t"></div>
      <span className="mx-4 flex-shrink text-gray-400">{children}</span>
      <div className="flex-grow border-t"></div>
    </div>
  );
};
