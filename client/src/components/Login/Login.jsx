import {useNavigate} from "react-router";
import useForm from "../../hooks/useForm.js";
import {useContext} from "react";
import UserContext from "../../contexts/UserContext/UserContext.jsx";

export default function Login() {
    const navigate = useNavigate();
    const { loginHandler } = useContext(UserContext);
    const submitHandler = async ({email, password}) => {
        if (!email || !password) {
            return alert('Email and password are required!');
        }

        try {
            await loginHandler(email, password);

            console.log("Logged in: " + email, password);

            navigate('/');
        } catch (e) {
            alert(e.message);
        }
    }

    const {
        register,
        formAction,
    } = useForm(submitHandler, {
        email: '',
        password: '',
    });

    return (
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <p>Please enter your email and password to log in.</p>

                        <div className="my-5">
                            <form id="login" action={formAction}>

                                {/* Email */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email..."
                                        required
                                        {...register('email')}
                                    />
                                    <label htmlFor="email">Email address</label>
                                </div>

                                {/* Password */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password..."
                                        required
                                        {...register('password')}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                                {/* Submit */}
                                <button
                                    className="btn btn-primary text-uppercase"
                                    type="submit"
                                    defaultValue="Login"
                                >
                                    Login
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

    // return (
    //     <section id="login-page">
    //         <form id="login" action={formAction}>
    //             <div className="container">
    //                 <h1>Login</h1>
    //                 <label htmlFor="email">Email</label>
    //                 <input
    //                     type="email"
    //                     id="email"
    //                     placeholder="Your Email"
    //                     {...register('email')}
    //                 />
    //                 <label htmlFor="login-pass">Password</label>
    //                 <input
    //                     type="password"
    //                     id="login-password"
    //                     placeholder="Password"
    //                     {...register('password')}
    //                 />
    //                 <input type="submit" className="btn submit" defaultValue="Login" />
    //             </div>
    //         </form>
    //     </section>
    // );
}