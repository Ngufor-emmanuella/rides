import Image from 'next/image';
import '../styles/about.css';
import Link from "next/link";

export default function About() {
    return ( 
    <main className="main">
      <div className="container mb-30 about-container" >
        
        <h2 className="about-header"> <strong className="about-welcome">  Welcome to BoloRides : </strong>
          
          <br/> Your Reliable Ride Across Cameroon!
          
        </h2>
          
          <p className="about-paragragh"> Whether you’re heading across town or traveling to a special event, BoloRides offers safe, 
            comfortable, and affordable transportation. We pride ourselves on delivering top-notch service 
            throughout Douala and beyond.
          </p>
           <br />

            <h3 className="about-welcome">  Why Choose BoloRides?  </h3>
            <br />
    
            <div className="carousel-8-columns-cover position-relative about-div">
                <div className="container">
                    <div className="row">
                        {/* First Row */}
                        <div className="col-md-4 mb-4 " >
                            <div className="card-1 columnrows">
                                <figure className="img-hover-scale overflow-hidden">
                                    <a href="#">
                                        <Image 
                                            src="/images/brown.jpeg" 
                                            alt="Best prices" 
                                            width={500} 
                                            height={300} 
                                            className="img-fluid" 
                                        />
                                    </a>
                                </figure>
                                <h6 className="card-h6">
                                    <Link href="#" className="card-link">Easy Booking:</Link>
                                    <br />
                                    <br />
                                    Message us on Facebook or call us to schedule your ride
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card-1  columnrows">
                                <figure className="img-hover-scale overflow-hidden">
                                    <a href="#">
                                        <Image 
                                            src="/images/brown.jpeg"
                                            alt="Best prices" 
                                            width={500} 
                                            height={300} 
                                            className="img-fluid" 
                                        />
                                    </a>
                                </figure>
                                <h6 className="card-h6">
                                    <Link href="#" className="card-link" >Safe & Trusted Drivers:</Link>
                                    <br />
                                   
                                    Our experienced drivers ensure a safe and pleasant journey every time.
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card-1  columnrows">
                                <figure className="img-hover-scale overflow-hidden">
                                    <a href="#">
                                        <Image 
                                            src="/images/brown.jpeg" 
                                            alt="Best prices" 
                                            width={500} 
                                            height={300} 
                                            className="img-fluid" 
                                        />
                                    </a>
                                </figure>
                                <h6 className="card-h6">
                                    <Link href="#" className="card-link">Affordable Rates:</Link>
                                    <br />
                                    Enjoy fair and transparent pricing with flexible payment options.
                                </h6>
                            </div>
                        </div>

                        {/* Second Row */}
                        <div className="col-md-4 mb-4">
                            <div className="card-1 columnrows">
                                <figure className="img-hover-scale overflow-hidden">
                                    <a href="#">
                                        <Image 
                                            src="/images/brown.jpeg"
                                            alt="Best prices" 
                                            width={500} 
                                            height={300} 
                                            className="img-fluid" 
                                        />
                                    </a>
                                </figure>
                                <h6 className="card-h6">
                                    <Link href="#" className="card-link" >Available Anytime:</Link>
                                    <br />
                                    We’re here 24/7, so you can count on us for your ride, day or night.
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card-1 columnrows">
                                <figure className="img-hover-scale overflow-hidden">
                                    <a href="#">
                                        <Image 
                                            src="/images/brown.jpeg"
                                            alt="Best prices" 
                                            width={500} 
                                            height={300} 
                                            className="img-fluid" 
                                        />
                                    </a>
                                </figure>
                                <h6 className="card-h6">
                                    <Link href="#" className="card-link" >Event & Group Transportation:</Link>
                                    <br />
                                    <br />
                                    Planning a big event or traveling with a group? 
                                </h6>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4">
                            <div className="card-1 columnrows">
                                <figure className="img-hover-scale overflow-hidden">
                                    <a href="#">
                                        <Image 
                                            src="/images/brown.jpeg"
                                            alt="Best prices" 
                                            width={500} 
                                            height={300} 
                                            className="img-fluid" 
                                        />
                                    </a>
                                </figure>

                                <h6 className="card-h6">
                                    <Link href="#" className="card-link" >  Best prices & offers: </Link>
                                    <br />
                                    BoloRides offers customized transportation for weddings, conferences, and more. 
                                </h6>

                            </div>
                        </div>
                    </div>
                </div>
           </div>
           <br />
           <br />

           <h4 className="about-welcome" > Book Your Ride Today! </h4>
    
            <p  className="about-paragragh">
                <strong  className="about-header">  Need a ride? </strong> 
                Message us on Facebook or call <strong> +237 652 921000 </strong> to book your next trip with BoloRides. 
                We’ll get you where you need to go, safely and on time.
            </p>
            <br />
     </div>
     <br />
   
  </main>
      
    );
  }
  
  