import {useNavigate} from "react-router";
import useForm from "../../../hooks/useForm.js";
import UserContext from "../../../contexts/UserContext.jsx";
import {useContext} from "react";

export default function Register() {
    const navigate = useNavigate();
    const { registerHandler: onRegister } = useContext(UserContext);

    const registerSubmitHandler = async (values) => {
        const { email, password, confirmPassword } = values;

        console.log(values);

        if (!email || !password) {
            return alert('Email and password are required!');
        }

        if (password !== confirmPassword) {
            return alert('Password missmatch!');
        }

        try {
            await onRegister(email, password);

            navigate('/');
        } catch (err) {
            alert(err.message);
        }
    }

    const {
        register,
        formAction,
    } = useForm(registerSubmitHandler, {
        email: '',
        password: '',
        confirmPassword: '',
    });

    // ...register('email') - [...] -> деструктурираме обекта register за да получим няколко отделни полета
    // return (
    //     <section id="register-page" className="content auth">
    //         <form id="register" action={formAction}>
    //             <div className="container">
    //                 <div className="brand-logo" />
    //                 <h1>register</h1>
    //                 <label htmlFor="email">Email:</label>
    //                 <input
    //                     type="email"
    //                     id="email"
    //                     {...register('email')}
    //                     placeholder="Your Email"
    //                 />
    //                 <label htmlFor="password">Password:</label>
    //                 <input
    //                     type="password"
    //                     id="password"
    //                     {...register('password')}
    //                     placeholder="Password"
    //                 />
    //                 <label htmlFor="confirmPassword">Confirm Password:</label>
    //                 <input
    //                     type="password"
    //                     id="confirmPassword"
    //                     {...register('confirmPassword')}
    //                     placeholder="Repeat Password"
    //                 />
    //                 <input className="btn submit" type="submit" defaultValue="register" />
    //             </div>
    //         </form>
    //     </section>
    // );

    return (
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <p>Create an account to continue.</p>

                        <div className="my-5">
                            <form id="register" action={formAction}>
                                {/* Email */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="email"
                                        type="email"
                                        placeholder="Your Email"
                                        {...register("email")}
                                        required
                                    />
                                    <label htmlFor="email">Email address</label>
                                </div>

                                {/* Password */}
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                        {...register("password")}
                                        required
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>

                                {/* Confirm Password */}
                                <div className="form-floating mb-4">
                                    <input
                                        className="form-control"
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Repeat Password"
                                        {...register("confirmPassword")}
                                        required
                                    />
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                </div>

                                <button className="btn btn-primary text-uppercase" type="submit">
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}