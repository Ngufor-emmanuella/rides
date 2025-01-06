import Image from 'next/image';
// import './styles/contact.css';

export default function Contact() {
    return (
        <main className="main">
            <div className="d-flex flex-row">
                <div className="p-2 contact-first">
                    <h3>
                        The Royal Essence of Journey:
                        <br /> Best and Affordable Ride Ever!
                    </h3>
                    <p>
                        You can rent a car for any purpose. We make car renting easy, whether you need a sports
                        coupe for a weekend ride with a date or a roadster for a road trip in Cameroon for a few days.
                        We ensure our rides fit your specific needs.
                    </p>
                    <h4>Book Your Ride Today!</h4>
                    <p>
                        <strong>Need a ride?</strong> 
                        Message us on Facebook or call <strong>+237 652 921000</strong> to book your next trip with BoloRides. 
                        We’ll get you where you need to go, safely and on time.
                    </p>
                </div>

                <div className="p-2 contact-second">
                    <Image 
                        className="brown-circle" 
                        src="/assets/imgs/slider/prado.jpeg" 
                        alt="Black Prado Car" 
                        width={500} // Set appropriate width
                        height={300} // Set appropriate height
                    />
                    <Image 
                        className="show-car" 
                        src="/assets/imgs/slider/brown2.jpeg" 
                        alt="Circle Drawing" 
                        width={500} // Set appropriate width
                        height={300} // Set appropriate height
                    />
                </div>
            </div>

            <br />

            <section className="home-slider position-relative" style={{ width: '100%' }}>
                <div className="container mt-5">
                    <h2 className="contact-now">Reach Us Now !!</h2>
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
                            <button type="submit" className="btn btn-primary">Submit Your Message</button>
                        </div>
                    </form>
                    <br />
                    <br />
                </div>
            </section>     
        </main>
    );
}