import { Navigate, useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext/UserContext.jsx";

export default function Logout() {
    const { logoutHandler } = useContext(UserContext);
    const [done, setDone] = useState(false);

    useEffect(() => {
        logoutHandler()
            .then(() => setDone(true))
            .catch((err) => {
                alert(err.message);
                setDone(true);
            });
    }, []);

    if (done) {
        return <Navigate to="/" />;
    }

    return <p>Logging out...</p>;
}
