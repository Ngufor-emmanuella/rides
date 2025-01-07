'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from 'next/image';
import '../styles/header.css';

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('user_token');
        setIsLoggedIn(!!userToken); 
    }, []); 

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container">
                <Image src="/images/bolo-logo1.jpeg" alt="Bolo Rides Logo" width={500} height={300} className="logo" />
                <Link className="navbar-brand navigation" href="/">BOLO - Rides</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
            {/* <Image src="/assets/imgs/theme/icons/price1.jpeg" alt="Best prices" width={500} height={300} className="img-fluid" /> */}
                    
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active navigation" aria-current="page" href="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link navigation" href="/about">About Us</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <Link 
                                className="nav-link dropdown-toggle navigation" 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                               Our Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item navigation" href="/category1"> Small Cars </Link></li>
                                <li><Link className="dropdown-item navigation" href="/category2"> Big Cars </Link></li>
                                <li><Link className="dropdown-item navigation" href="/category3"> All Cars Categories</Link></li>
                                <li><hr className="dropdown-divider navigation" /></li>
                                <li><Link className="dropdown-item navigation" href="#"> Others</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link navigation" href="/contact">Contact Us</Link>
                        </li>

                        <li className="nav-item dropdown">
                            <Link 
                                className="nav-link dropdown-toggle navigation" 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                Car Sheets
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item navigation" href="/prado1-elvis"> Prado1 - Elvis </Link></li>
                                <li><Link className="dropdown-item navigation" href="/prado2-levinus"> Prado2 - Levinus </Link></li>
                                <li><Link className="dropdown-item navigation" href="/rav4-serge"> Rav4 - Serge </Link></li>
                                <li><hr className="dropdown-divider navigation" /></li>
                            </ul>
                        </li> 

                        <li className="nav-item dropdown ">
                            <Link 
                                className="nav-link dropdown-toggle navigation" 
                                href="#" 
                                role="button" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                            >
                                Account
                            </Link>
                            <ul className="dropdown-menu">
                                {isLoggedIn ? (
                                    <li><Link className="dropdown-item navigation" href="/logout">Logout</Link></li>
                                ) : (
                                    <>
                                        <li><Link className="dropdown-item navigation" href="/signup">Signup</Link></li>
                                        <li><Link className="dropdown-item navigation" href="/login">Login</Link></li>
                                        <li><Link className="dropdown-item navigation" href="/logout">Logout</Link></li>

                                    </>
                                )}
                            </ul>
                        </li>


                          
                    </ul>

                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}