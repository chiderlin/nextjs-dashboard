//  Create an invoice (APIs) but not really a API. let you write down sql within Nextjs
// 1. Create a new route and form
import Form from '@/app/ui/invoices/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';

export default async function Pager() {
  const customers = await fetchCustomers();

  return (
    <main>
      {/* Breadcrumbs are a navigation aid that helps users visualize their
      current location within a hierarchical structire of a website.  */}
      {/* EX: Invoices / Create Invoices */}
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
