export const Divider = ({ children }: { children: string }) => {
  return (
    <div className='relative flex py-5 items-center'>
      <div className='flex-grow border-t'></div>
      <span className='flex-shrink mx-4 text-gray-400'>{children}</span>
      <div className='flex-grow border-t'></div>
    </div>
  );
};
