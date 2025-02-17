'use client';
import Register from '../register/page';
import Login from '../login/page';

export default function Authentication() {
    return (
        <main className="container-fluid py-5">
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <h3>Login</h3>
                        <hr />
                        <Login />
                    </div>
                    <div className="col-5 offset-2">
                        <h3>Sign up /Register </h3>
                        <hr />
                        <Register />
                    </div>
                </div>
            </div>
        </main>
    );
}