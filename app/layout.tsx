import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

// any UI you add to the root layout will be shared across all pages in your app.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
