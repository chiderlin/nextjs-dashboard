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
  // 1.validate data
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'), // 看name 不是id
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // 2. transform
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // 3. setting database
  await sql`
  INSERT INTO invoices (customer_id, amount, status, date)
  VALUES (${customerId},${amountInCents},${status},${date})
  `;

  // 4. remove cache, redirect to orignal page

  // clear thos cache and trigger a new request to the server
  revalidatePath('/dashboard/invoices');

  // At this point, you also want to redirect the user back to the
  // /dashboard/invoices page. You can do this with the redirect function from Nextjs
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCent = amount * 100;
  await sql`
  UPDATE invoices
  SET customer_id = ${customerId}, amount=${amountInCent}, status=${status}
  WHERE id = ${id}
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`
  DELETE FROM invoices WHERE id = ${id}
  `;
  /* Since this action is being called in /dashboard/invoices path,
   you don't need to call redirect.

   Calling revalidatePath will trigger a new server request and re-render the table
   */

  revalidatePath('/dashboard/invoices');
}
