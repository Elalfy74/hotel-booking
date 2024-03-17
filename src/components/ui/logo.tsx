export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M25.556 11.685A10 10 0 0 0 20 10V0A20 20 0 1 1 0 20h10a10 10 0 1 0 15.556-8.315'
        fill='#2563eb'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10 0A10 10 0 0 1 0 10v10A20 20 0 0 0 20 0z'
        fill='#2563eb'
      />
    </svg>
  );
};
