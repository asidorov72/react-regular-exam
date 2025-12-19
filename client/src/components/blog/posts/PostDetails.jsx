import { useParams, Link, useNavigate } from "react-router";
import useRequest from "../../../hooks/useRequest.js";
import PostMeta from "./PostMeta.jsx";
import React, {useOptimistic, startTransition, useMemo} from "react";
import useIsOwner from "../../../hooks/useIsOwner.js";
import PostWrapper from "./PostWrapper.jsx";

export default function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();

    // useRequest will look into the modified url
    const url = useMemo(() => (
        `/data/clean_blog/${postId}`
    ), [postId]);

    const { data: post, loading, error, request } = useRequest(url, {});

    const [optimisticPost, dispatchOptimisticPost] = useOptimistic(
        post,
        (state, action) => {
            switch (action.type) {
                case "REMOVE_POST":
                    return null;
                case "RESTORE_POST":
                    return action.payload; // if deleting failed, rollback to previous state
                default:
                    return state;
            }
        }
    );

    const {
        _id,
        title,
        imageUrl,
        _ownerId,
        content = { sections: [] },
        _createdOn,
        _updatedOn,
    } = optimisticPost || {};

    const sections = content?.sections ?? [];
    const isOwner = useIsOwner(_ownerId);

    if (loading) {
        return (
            <PostWrapper>
                <p className="no-articles">Loading...</p>
            </PostWrapper>
        );
    }

    if (error) {
        return (
            <PostWrapper>
                <p className="no-articles">{error.message}</p>
            </PostWrapper>
        );
    }

    if (!_id) {
        return (
            <PostWrapper>
                <p className="no-articles">Post deleted.</p>
            </PostWrapper>
        );
    }

    const onDeleteHandler = async () => {
        const confirmed = confirm(`Are you sure you want to delete "${title}" post?`);
        if (!confirmed) return;

        const previous = optimisticPost;

        // optimistic update
        startTransition(() => {
            dispatchOptimisticPost({ type: "REMOVE_POST" });
        });

        try {
            await request(`/data/clean_blog/${_id}`, "DELETE");
            navigate("/");
        } catch (e) {
            // rollback
            startTransition(() => {
                dispatchOptimisticPost({ type: "RESTORE_POST", payload: previous });
            });
            console.error(e);
            alert("Unable to delete post.");
        }
    };

    return (
        <PostWrapper>
            {sections.length === 0 ? (
                <p className="no-articles">No content posted yet.</p>
            ) : (
                sections.map((s, idx) => (
                    <section key={idx} className="mb-4">
                        {s.title && <h2 className="section-heading">{s.title}</h2>}

                        {(s.text || "")
                            .split(/\n\s*\n/g)
                            .filter(Boolean)
                            .map((p, pIdx) => (
                                <p key={pIdx}>{p}</p>
                            ))}
                    </section>
                ))
            )}

            {imageUrl && (
                <img className="img-fluid mb-4" src={imageUrl} alt={title || "posts image"} />
            )}

            <PostMeta _ownerId={_ownerId} _createdOn={_createdOn} _updatedOn={_updatedOn} />

            {isOwner && (
                <div className="d-flex justify-content-between mb-4">
                    <Link
                        to={`/posts/${postId}/edit`}
                        className="btn btn-outline-secondary text-uppercase"
                    >
                        Edit post
                    </Link>

                    <button
                        className="btn btn-outline-danger text-uppercase"
                        onClick={onDeleteHandler}
                    >
                        Delete post
                    </button>
                </div>
            )}
        </PostWrapper>
    );
}
