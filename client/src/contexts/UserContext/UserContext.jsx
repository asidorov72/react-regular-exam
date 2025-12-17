import {createContext, useContext} from "react";
import useRequest from "../../hooks/useRequest.js";
import usePersistedState from "../../hooks/usePersistedState.js";

const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: "",
        password: "",
        _createdOn: 0,
        _id: "",
        accessToken: "",
    },
    loginHandler() {},
    logoutHandler() {},
    registerHandler() {},
});

export function UserProvider({
    children,
}) {
    const [user, setUser] = usePersistedState(null);
    const { request } = useRequest();

    const registerHandler = async (email, password) => {
        const newUser = {email, password};

        // Register API call
        const result = await request('/users/register', 'POST', newUser,);

        // login user after registration
        setUser(result);
    }

    const loginHandler = async (email, password) => {
        const result = await request('/users/login', 'POST', { email, password });

        console.log("Login result");
        console.log(result);

        setUser(result);
    }

    const logoutHandler = () => {
        return request('/users/logout', 'GET', null, {accessToken: user?.accessToken,})
            .finally(() => {setUser(null)});
    }

    const userContextValues = {
        isAuthenticated: !!user?.accessToken,
        user,
        loginHandler,
        logoutHandler,
        registerHandler,
    };
    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext);
}

export default UserContext;