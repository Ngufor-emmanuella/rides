'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userToken = localStorage.getItem('user_token');
        setIsLoggedIn(!!userToken); // Set true if token is present
    }, []); // Run only on mount

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" href="/">BOLORides</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                        </li>
                        {
                            isLoggedIn ? (
                                <li className="nav-item">
                                    <Link className="nav-link" href="/logout">Logout</Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/signup">Signup</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/login">Login</Link>
                                    </li>
                                </>
                            )
                        }
                        <li className="nav-item">
                            <Link className="nav-link" href="/about">About</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="/signup">Signup</Link></li>
                                <li><Link className="dropdown-item" href="/login">Login</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contact</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/prado1-elvis">Prado1 - Elvis</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/prado2-levinus">Prado2 - Levinus</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="/rav4-serge">Rav4 - Serge </Link>
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