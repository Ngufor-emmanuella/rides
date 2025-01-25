import Image from 'next/image';
import '../styles/contact.css';

export default function Contact() {
    return (
        <main className="main">
            <div className="d-flex flex-row">
                <div className="p-2 contact-first">
                    <h3 className="about-header">
                        <strong className="about-welcome">The Royal Essence of Journey: </strong>
                        <br /> Best and Affordable Ride Ever!
                    </h3>
                    <p className="about-paragragh">
                        You can rent a car for any purpose. We make car renting easy, whether you need a sports
                        coupe for a weekend ride with a date or a roadster for a road trip in Cameroon for a few days.
                        We ensure our rides fit your specific needs.
                    </p>
                  
                    <h4 className="about-header">Book Your Ride Today!</h4>
                 
                    <p  className="about-paragragh">
                        <strong className="about-header"> Need a ride?</strong> <br /> 
                        Message us on Facebook or call <strong>+237 652 921000</strong> to book your next trip with BoloRides. 
                        We’ll get you where you need to go, safely and on time.
                    </p>
                </div>

                <div className="p-2 contact-second">
                    <Image className="show-car" src="/images/brown2.jpeg" alt="car" width={500} height={300}  />
                    
                    <Image className="brown-circle" src="/images/prado-round.jpeg" alt="Circle Drawing" width={500} height={300} />
                </div>
            </div>

            <section className="home-slider position-relative" style={{ width: '100%' }}>
                <div className="container mt-5">
                    <h2 className="about-header">Reach Us Now !!</h2>
                    <form method="POST">
                        <div className="form-group change-color">
                            <label htmlFor="fname" className="label">Your Name</label>
                            <input 
                                type="text" 
                                id="fname" 
                                name="name" 
                                className="form-control input-change" 
                                placeholder="Your name here ..." 
                                required 
                            />
                            <br />
                            <label htmlFor="exampleInputEmail1" className="label">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                name="email" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter email" 
                                required 
                            />
                            <br />

                            <label htmlFor="subject" className="label">Your Message</label>
                            <textarea 
                                className="form-control" 
                                id="subject" 
                                name="subject" 
                                placeholder="Leave us a message here" 
                                rows="5" 
                                maxLength="500" 
                                required 
                            ></textarea>
                            <br />
                            <br />
                            <button type="submit" className="btn button">Submit Your Message</button>
                        </div>
                    </form>
                 
                   
                </div>
            </section>     
        </main>
    );
}