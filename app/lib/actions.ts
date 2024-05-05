// By adding this, you mark all the exported functions within the file as
// server functions.

/* 
These server functions can then be imported into Client and Server Components,
Making them extremely versatile.
*/
'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Type validation and coercion
import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'), // 看name 不是id
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId},${amountInCents},${status},${date})
  `;

  // clear thos cache and trigger a new request to the server
  revalidatePath('/dashboard/invoices');

  // At this point, you also want to redirect the user back to the
  // /dashboard/invoices page. You can do this with the redirect function from Nextjs
  redirect('/dashboard/invoices');
}
