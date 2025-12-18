import {useEffect, useRef} from "react";
import {Link} from "react-router";
import {useUserContext} from "../../../contexts/UserContext.jsx";

export default function Navigation() {
    const { isAuthenticated } = useUserContext();
    const navRef = useRef(null);

    // navigation on scroll effect
    useEffect(() => {
        const mainNav = navRef.current;
        if (!mainNav) return;

        let scrollPos = 0;
        const headerHeight = mainNav.clientHeight;

        const onScroll = () => {
            const currentTop = document.body.getBoundingClientRect().top * -1;

            if (currentTop < scrollPos) {
                // Scrolling up
                if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-visible');
                } else {
                    mainNav.classList.remove('is-visible', 'is-fixed');
                }
            } else {
                // Scrolling down
                mainNav.classList.remove('is-visible');
                if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                    mainNav.classList.add('is-fixed');
                }
            }

            scrollPos = currentTop;
        };

        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return (
        <nav
            ref={navRef}
            className="navbar navbar-expand-lg navbar-light"
            id="mainNav"
        >
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">
                    Start Bootstrap
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    Menu <i className="fas fa-bars" />
                </button>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/contact">
                                Contact
                            </Link>
                        </li>
                        {isAuthenticated
                            ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/posts/create">Add new Post</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/logout">Logout</Link>
                                    </li>
                                </>
                            )
                            : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/register">Registration</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}