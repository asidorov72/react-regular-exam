import { useUserContext } from "../contexts/UserContext.jsx";

export default function useIsOwner(ownerId) {
    const { user, isAuthenticated } = useUserContext();

    return Boolean(isAuthenticated && user?._id === ownerId);
}
