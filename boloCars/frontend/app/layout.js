'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Footer from './components/footer';
import  AuthProvider from './components/authContext';
import { usePathname } from 'next/navigation';


// import { Inter } from 'next/font/google'; 
// const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideFooterPaths = [
    '/prado1-elvis',
    '/prado2-levinus', 
    '/rav4-serge', 
    '/signup', 
    '/login', 
    '/addform',
    '/elvis-history',
    '/elvis-monthly-goals',
    
  ];

  const shouldHideFooter = hideFooterPaths.some(path => pathname.startsWith(path));

  return (
    <html lang='en'>
      <head>
      <link rel="icon" href="/favicon.ico" />

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-..." crossOrigin="anonymous" />
        
        <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-..." crossOrigin="anonymous" defer >
        </script>
        
        
      </head>
      <body className="body">
        <AuthProvider>
          <Header />
          <div className="container">
            {children}
          </div>

          {!shouldHideFooter && <Footer />}
          </AuthProvider>
      </body>
    </html>
  );
}