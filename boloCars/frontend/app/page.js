import Image from 'next/image';
import './styles/homepage.css';
import Link from "next/link";


export default function Home() {
    return (
        <main className="main">
            <div className=" text-center homebackground">

            <h1 className="display-2 mb-40"> BOLO CAR RENTALS <br /> SERVICES - </h1>
            <h3 className="mb-65">THE BEST CAR RENTALS IN CAMEROON!</h3>

            <Link className="btn btn-dark mt-3" href="/contact"> Book Us Now </Link>
            
            </div>

            <br />
            <br />
            
            <div className="single-hero-slider single-animation-wrap">
                
                <h3>Our Offers...</h3>

                <br />
                <br />
                
                <div className="carousel-8-columns-cover position-relative">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#">Best prices <br /> & offers</a></h6>
                                    <p>Order Now!</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Free delivery" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#">Free <br /> delivery</a></h6>
                                    <p>24/7 amazing services</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Great Daily Deals" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#">Great Daily <br /> Deals</a></h6>
                                    <p>When you choose</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Wide Assortment" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#">We Offer Wide <br /> Assortment</a></h6>
                                    <p>Mega Discounts</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Secure Easy Returns" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#">Secure Easy <br /> Returns</a></h6>
                                    <p>Within 30 days</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#">Best prices <br /> & offers</a></h6>
                                    <p>Order Now!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}