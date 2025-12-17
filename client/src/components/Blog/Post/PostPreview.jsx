import useRequest from "../../../hooks/useRequest.js";
import formatDate from "../../../utils/dateUtil.js";
import {Link} from "react-router";

export default function PostPreview({
    _id,
    title,
    subtitle,
    _createdOn,
    _updatedOn,
}) {

    const { data: user } = useRequest('/data/clean_blog', []);
    const postedOnDate = (_updatedOn > _createdOn) ? formatDate(_updatedOn) : formatDate(_createdOn);

    return (
        <div className="post-preview">
            <Link to={`/posts/${_id}`}>
                <h2 className="post-title">{title}</h2>
                {subtitle !== '' && <h3 className="post-subtitle">{subtitle}</h3>}
            </Link>
            <p className="post-meta">
                {` Posted on ${postedOnDate}`}
            </p>
        </div>
    )
}