'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

// orignally, using <a></a> : full page refresh on each page navigation.
// change it to <Link></Link>: be able to navigate between the pages without seeing full refresh.
/**
 * Nextjs: Automatic code-splitting and prefetching, to improve the navigation experience.
 * 第一次點選會load一次，之後就不會一直full page refreshing
 */
export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const pathname = usePathname();
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            // When link.href matches the pathname, the link should be displayed with blue text and a light blue bg.
            // 正在被點選的那頁，按鈕會變亮
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              { 'bg-sky-100 text-blue-600': pathname === link.href },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
