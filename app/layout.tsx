import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'], // Menentukan subset Latin
  display: 'swap',   // Strategi tampilan font
  variable: '--font-poppins', // Menetapkan variabel CSS
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] // Menentukan berat font yang ingin digunakan
});

export const metadata = {
  title: 'CV Maker',
  description: 'Create your professional CV effortlessly with our easy-to-use platform.',
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className='bg-white text-black'>{children}</body>
    </html>
  );
}
