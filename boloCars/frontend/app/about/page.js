import Image from 'next/image';
import '../styles/about.css';

export default function About() {
    return (
    <main className="main">
      <div className="container mb-30 about-container" >
        
        <h1> Welcome to BoloRides :
          
          <br/> Your Reliable Ride Across Cameroon!</h1>
          
          <p> Whether you’re heading across town or traveling to a special event, BoloRides offers safe, 
            comfortable, and affordable transportation. We pride ourselves on delivering top-notch service 
            throughout Douala and beyond.
          </p> 
            <h4> Why Choose BoloRides? </h4>
    
            <div className="carausel-5-columns-cover position-relative" >
                <div className="carausel-5-columns white-box" id="carausel-5-columns">
                    <div className="card-1">
                        <figure className="img-hover-scale overflow-hidden">
                            <a href="#">
                              <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" /> 
                            </a>
                        </figure>
                        <h6>
                            <a href="#"> Easy Booking: </a>
                            <br />
                            Message us on Facebook or call us to schedule your ride
                           
                        </h6>
                    </div>
        
                    <div className="card-1">
                        <figure className="img-hover-scale overflow-hidden">
                            <a href="#">
                              <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                            </a>
                        </figure>
                        <h6>
                            <a href="#"> Safe & Trusted Drivers: </a>
                            <br />
                            Our experienced drivers ensure a safe and pleasant journey every time.
                            
                        </h6>
                    </div>
                    <div className="card-1">
                        <figure className="img-hover-scale overflow-hidden">
                            <a href="#">
                              <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                            </a>
                        </figure>
                        <h6>
                            <a href="#"> Affordable Rates:</a>
                            <br />
                            Enjoy fair and transparent pricing with flexible payment options.
                            
                        </h6>
                    </div>
        
                    <div className="card-1">
                        <figure className="img-hover-scale overflow-hidden">
                            <a href="#">
                              <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                              
                            </a>
                        </figure>
                        <h6>
                            <a href="#"> Available Anytime:</a>
                            <br />
                             We’re here 24/7, so you can count on us for your ride, day or night.
                        </h6>
                    
                    </div>
        
                    <div className="card-1">
                        <figure className="img-hover-scale overflow-hidden">
                            <a href="#">
                              <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                              </a>
                        </figure>
                        <h6>
                            <a href="#">  Event & Group Transportation: </a>
                           Planning a big event or traveling with a group? BoloRides offers 
                            customized transportation for weddings, conferences, and more.
                        </h6>
                       
                    </div>
                </div>
            </div>
       
    
        <h4> Book Your Ride Today! </h4>
    
            <p>
                <strong>  Need a ride? </strong> 
                Message us on Facebook or call <strong> +237 652 921000 </strong> to book your next trip with BoloRides. 
                We’ll get you where you need to go, safely and on time.
            </p>
   
     </div>
  </main>
      
    );
  }
  