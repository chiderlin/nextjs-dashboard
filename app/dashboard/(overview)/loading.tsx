/*
A loading skeleton is a simplified version of the UI. Many website use them as a placeholder
(or fallback) to indicate to users that the content is loading.

Since loading.tsx is a level higher than /invoices/page.tsx & /customers/page.tsx in the file sys,
it's also applied to those pages.

Creating /(overview) inside the dashboard folder -> when you ceate a new folder using parentese (), the name won't be included in the URL path.
(move loading.tsx & page.tsx in to this folder)

Now, the loading.tsx file will only apply to your dashboard overview page.

*/

import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}
