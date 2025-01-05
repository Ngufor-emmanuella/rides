import Image from 'next/image';
import './styles/homepage.css';

export default function Home() {
    return (
        <main className="container-fluid bg-light p-3">
            <div className="row bg-light py-5 gx-5 text-center">
                <h4 className="head"> hello davi </h4>

                <p><button className="btn btn-dark mt-3"> Book Us Now </button></p>
            </div>
            
            <div className="single-hero-slider single-animation-wrap">
                <div className="slider-content">
                    <h1 className="display-2 mb-40"> BOLO CAR RENTALS <br /> SERVICES - </h1>
                    <p className="mb-65">THE BEST CAR RENTALS IN CAMEROON!</p>
                </div>
                
                <h3>Our Offers...</h3>
                
                <div className="carausel-8-columns-cover position-relative">
                    <div className="carausel-8-columns" id="carausel-8-columns">
                        <div className="card-1">
                            <figure className="img-hover-scale overflow-hidden">
                                <a href="#">
                                    <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" />
                                </a>
                            </figure>
                            <h6><a href="#">Best prices <br /> & offers</a></h6>
                            <p>Order Now!</p>
                        </div>

                        {/* Repeat for other cards... */}
                    </div>
                </div>
            </div>
        </main>
    );
}