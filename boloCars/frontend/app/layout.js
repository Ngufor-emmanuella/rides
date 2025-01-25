import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import Footer from './components/footer';
import { AuthProvider } from './authContext';

// import { Inter } from 'next/font/google'; 
// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'BOLO RIDES App', 
  description: 'This is an application that offers car rental services, and allows drivers to input their daily transaction of car rentals, which is calculated and stored in the database',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
      <link rel="icon" href="/favicon.ico" />

      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-..." crossOrigin="anonymous" />
        
        <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-..." crossOrigin="anonymous" defer >
        </script>
        
        <title>{metadata.title}</title>
        
        <meta name="description" content={metadata.description} />
      
      </head>
      <body className="body">
        <AuthProvider>
          <Header />
          <div className="container">
            {children}
          </div>
          <Footer />
          </AuthProvider>
      </body>
    </html>
  );
}