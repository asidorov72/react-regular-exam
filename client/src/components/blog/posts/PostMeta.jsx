import formatDate from "../../../utils/dateUtil.js";
import { useUserContext } from "../../../contexts/UserContext.jsx";

export default function PostMeta({ _ownerId, _createdOn, _updatedOn }) {
    const { user, isAuthenticated } = useUserContext();

    const isOwner = isAuthenticated && user?._id === _ownerId;

    const dateMs =
        _updatedOn && _createdOn && _updatedOn > _createdOn
            ? _updatedOn
            : _createdOn;

    const postedOnDate = formatDate(dateMs);

    return (
        <p className="post-meta">
            {isOwner && <>Posted by {user.email}</>}
            {!isOwner && <>Posted on {postedOnDate}</>}
            {isOwner && <> on {postedOnDate}</>}
        </p>
    );
}
