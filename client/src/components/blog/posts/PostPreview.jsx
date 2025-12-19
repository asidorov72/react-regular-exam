import {Link} from "react-router";
import PostMeta from "./PostMeta.jsx";
import React from "react";

function PostPreview({
    _id,
    title,
    subtitle,
    _ownerId,
    _createdOn,
    _updatedOn,
}) {
    return (
        <div className="post-preview">
            <Link to={`/posts/${_id}/details`}>
                <h2 className="post-title">{title}</h2>
                {subtitle !== '' && <h3 className="post-subtitle">{subtitle}</h3>}
            </Link>
            <PostMeta
                _ownerId={_ownerId}
                _createdOn={_createdOn}
                _updatedOn={_updatedOn}
            />
        </div>
    )
}

export default React.memo(PostPreview);