import Signup from '../signup/page';
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
                        <h3>Sign up</h3>
                        <hr />
                        <Signup />
                    </div>
                </div>
            </div>
        </main>
    );
}