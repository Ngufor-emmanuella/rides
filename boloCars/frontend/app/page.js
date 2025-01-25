import Image from 'next/image';
import './styles/homepage.css';
import Link from "next/link";


export default function Home() {
    return (
        <main className="main">
            <div className=" text-center homebackground">

            <h1 className="display-2 mb-40 home-header"> BOLO CAR RENTALS <br /> SERVICES - </h1>
            <h3 className="mb-65 home-header">THE BEST CAR RENTALS IN CAMEROON!</h3>

            <Link className="btn btn-dark mt-3" href="/contact"> Book Us Now </Link>
            
            </div>

            <br />
            <br />
            
            <div className="single-hero-slider single-animation-wrap">
                
                <h3 className="about-welcome">Our Offers...</h3>

                <br />
                <br />
                
                <div className="carousel-8-columns-cover position-relative">
                    <div className="container">
                        <div className="row ">
                            <div className="col-md-4 mb-4">
                                <div className="card-1 g-4">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/images/prcies-tag.png" alt="Best prices" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6 ><a href="#" className="home-card">Best prices <br /> & offers</a></h6>
                                    <p>Order Now!</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/images/delivery.jpeg" alt="Free delivery" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#"  className="home-card">Free <br /> delivery</a></h6>
                                    <p>24/7 amazing services</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/images/great-deals.jpeg" alt="Great Daily Deals" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#"  className="home-card" >Great Daily <br /> Deals</a></h6>
                                    <p>When you choose</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/images/assortments.jpeg" alt="Wide Assortment" width={500} height={120} className="assorts" />
                                        </a>
                                    </figure>
                                    <h6><a href="#"  className="home-card" >We Offer Wide <br /> Assortment</a></h6>
                                    <p>Mega Discounts</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/images/returns.jpeg" alt="Secure Easy Returns" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#"  className="home-card" >Secure Easy <br /> Returns</a></h6>
                                    <p>Within 30 days</p>
                                </div>
                            </div>

                            <div className="col-md-4 mb-4">
                                <div className="card-1">
                                    <figure className="img-hover-scale overflow-hidden">
                                        <a href="#">
                                            <Image src="/images/delivery.png" alt="Best prices" width={500} height={300} className="img-fluid" />
                                        </a>
                                    </figure>
                                    <h6><a href="#"  className="home-card" >Best prices <br /> & offers</a></h6>
                                    <p>Order Now!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* carousels for cars pictures */}
                <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel"  data-bs-interval="1000">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <Image src="/images/prado.jpeg" className="d-block" alt="cars" width={200} height={300} />

                        </div>
                       
                        <div className="carousel-item">
                        <Image src="/images/prado-round.jpeg" className="d-block" alt="cars" width={200} height={300} />

                        </div>
                        <div className="carousel-item">
                        <Image src="/images/prado2.jpeg" className="d-block" alt="cars" width={200} height={300} />
                        </div>

                        <div className="carousel-item">
                        <Image src="/images/prado-white.jpeg" className="d-block" alt="cars" width={200} height={300} />
                        </div>

                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

               
            </div>
            <br />
            <br />
           
        </main>
    );
}


