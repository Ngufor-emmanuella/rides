import Link from "next/link";
import Image from 'next/image';
import '../styles/footer.css';



export default function Footer() {
    return (

        <footer className="main">
     
        <section className="section-padding footer-mid">
            <div className="container pt-15 pb-20">
                <div className="row row-footer">
                    <div className="col">
                        <div className="widget-about font-md mb-md-3 mb-lg-3 mb-xl-0">
                            <div className="logo mb-30">
                                <Link href="index.html" className="mb-15"><Image src="/images/bolo-logo1.jpeg" alt="logo" width={500} height={300}  priority className="logo1" /></Link>
                            </div>
                            <ul className="contact-infor bolo-list">
                                <li className="address"><Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon" /><strong>Address: </strong> <span> Douala, Inbetween total Bonateki and Pharmacy Akwa Nord</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-link-widget col">
                        <h4 className="widget-title">Company</h4>
                        <ul className="footer-list mb-sm-5 mb-md-0">
                            <li><Link href="/about" className="bolo-list">About Us</Link></li>
                            <li><Link href="/contact" className="bolo-list">Contact Us</Link></li>
                            <li><Link href="#" className="bolo-list">Delivery Information</Link></li>
                            <li><Link href="#" className="bolo-list">Terms &amp; Conditions</Link></li>
                            <li className="address"><Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon" /><strong>Call Us:</strong><span> +237 652921000 / 693333940 </span></li>

                        </ul>
                    </div>
  
                    <div className="footer-link-widget col">
                        <h4 className="widget-title">Account</h4>
                        <ul className="footer-list mb-sm-5 mb-md-0">
                            <li><Link href="/signup" className="bolo-list">Sign In</Link></li>
                            <li><Link href="#" className="bolo-list">View Cart</Link></li>
                            <li><Link href="#" className="bolo-list">My Wishlist</Link></li>
                            <li><Link href="#" className="bolo-list">Track My Order</Link></li>
                            <li className="address"><Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon"/><strong>Email:</strong><span> BoloRides.com</span></li>
                            <li className="address"><Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon" /><strong>Hours:</strong><span>8:00 - 18:00, Mon - Sat</span></li>

                        </ul>
                    </div>
  
                    <div className="footer-link-widget col">
                      <h4 className="widget-title" >Follow Us</h4>
                      <ul className="footer-list mb-sm-5 mb-md-0">
                          <li className="mobile-social-icon mb-50"><Link href="#" > <Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon" /></Link></li>
                          <li className="mobile-social-icon mb-50"><Link href="#"><Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon" /></Link></li>
                          <li className="mobile-social-icon mb-50"><Link href="#"><Image src="/images/brown.jpeg" alt="brown round icon"  width={500} height={300} className="brown-icon"/></Link></li>
                      </ul>
                  </div>
                </div>
               
            </div>
  
          <div>
              <h6  className="site-copyright"> Copyright 2025 © Bolo Rides... All rights reserved. </h6>
          </div>
        </section>
    </footer>
  
    );
}

