import {useParams, Link, useNavigate} from "react-router";
import useRequest from "../../../hooks/useRequest.js";
import PostMeta from "./PostMeta.jsx";
import React from "react";
import useIsOwner from "../../../hooks/useIsOwner.js";

export default function PostDetails() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const { data: post, loading, error, request } = useRequest(`/data/clean_blog/${postId}`, {});

    const {
        _id,
        title,
        imageUrl,
        _ownerId,
        content = { sections: [] },
        _createdOn,
        _updatedOn,
    } = post || {};

    const sections = content?.sections ?? [];
    const isOwner = useIsOwner(_ownerId);

    const ArticleWrapper = ({ children }) => (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {children}
                    </div>
                </div>
            </div>
        </article>
    );

    if (loading) {
        return (
            <ArticleWrapper>
                <p className="no-articles">Loading...</p>
            </ArticleWrapper>
        );
    }

    if (error) {
        return (
            <ArticleWrapper>
                <p className="no-articles">{error.message}</p>
            </ArticleWrapper>
        );
    }

    if (!_id) {
        return (
            <ArticleWrapper>
                <p className="no-articles">Post not found.</p>
            </ArticleWrapper>
        );
    }

    const onDeleteHandler = async () => {
        const confirmed = confirm(`Are you sure you want to delete "${title}" post ?`);

        if(!confirmed) {
            return;
        }

        try {
            await request(`/data/clean_blog/${_id}`, 'DELETE');

            navigate('/');
        } catch (e) {
            alert('Unable to delete post: ' + e);
        }

    }

    return (

        <ArticleWrapper>
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

            <PostMeta
                _ownerId={_ownerId}
                _createdOn={_createdOn}
                _updatedOn={_updatedOn}
            />

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

        </ArticleWrapper>
    );
}
