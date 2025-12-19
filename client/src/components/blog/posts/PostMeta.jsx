import formatDate from "../../../utils/dateUtil.js";
import { useUserContext } from "../../../contexts/UserContext.jsx";
import useIsOwner from "../../../hooks/useIsOwner.js";
import React from "react";

function PostMeta({ _ownerId, _createdOn, _updatedOn }) {
    const { user } = useUserContext();
    const isOwner = useIsOwner(_ownerId);

    const dateMs =
        _updatedOn && _createdOn && _updatedOn > _createdOn
            ? _updatedOn
            : _createdOn;

    const postedOnDate = formatDate(dateMs);

    return (
        <p className="post-meta">
            {isOwner
                ? <>Posted by {user.email} on {postedOnDate}</>
                : <>Posted on {postedOnDate}</>
            }
        </p>
    );
}

export default React.memo(PostMeta);
