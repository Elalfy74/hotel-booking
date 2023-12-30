import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export interface BreadcrumbItemType {
  title: string;
  url: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItemType[] }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-gray-400"
          >
            <HomeIcon className="h-5 w-5" />
          </Link>
        </li>
        {items.map((item, i) => (
          <li className="flex items-center" key={item.title}>
            <ChevronRightIcon className="mr-1 h-5 w-5 md:mr-2" />
            {i === items.length - 1 ? (
              <span className="text-sm font-medium capitalize text-gray-500 dark:text-gray-400">
                {item.title}
              </span>
            ) : (
              <Link
                className="text-sm font-medium capitalize text-gray-700 hover:text-gray-900 hover:underline dark:text-gray-300 dark:hover:text-gray-400"
                href={item.url}
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

interface HomeIconProps {
  className?: string;
}
const HomeIcon = ({ className }: HomeIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
