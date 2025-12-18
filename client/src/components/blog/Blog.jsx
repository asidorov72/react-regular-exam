import React from "react";
import { useState } from "react";
import PostPreview from "./posts/PostPreview.jsx";
import useRequest from "../../hooks/useRequest.js";

const PAGE_SIZE = 4;

export default function Blog() {
    const [page, setPage] = useState(0);
    const offset = page * PAGE_SIZE;
    const url = `/data/clean_blog?sortBy=_createdOn%20desc&offset=${offset}&pageSize=${PAGE_SIZE}`;
    const { data: clean_blog, loading, error } = useRequest(url, [page]);

    const BlogWrapper = ({ children }) => (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {children}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <BlogWrapper>
                <p className="no-articles">Loading...</p>
            </BlogWrapper>
        );
    }

    if (error) {
        return (
            <BlogWrapper>
                <p className="no-articles">{error.message}</p>
            </BlogWrapper>
        );
    }

    const isLastPost = (idx) => {
        if (idx === clean_blog?.length - 1) return true;
        return false;
    }

    return (
        <BlogWrapper>
            {clean_blog.length === 0 && (<p className="no-articles">No posts yet!</p>)}
            {clean_blog.map((post) => (
                <React.Fragment key={post._id}>
                    <PostPreview {...post} />
                    {!isLastPost(clean_blog.indexOf(post)) && <hr className="my-4" />}
                </React.Fragment>))
            }

            {/* Pager*/}
            <div className="d-flex justify-content-between mb-4">
                <button
                    className="btn btn-primary text-uppercase"
                    disabled={page === 0}
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                >
                    ← Newer Posts
                </button>

                <button
                    className="btn btn-primary text-uppercase"
                    disabled={clean_blog.length < PAGE_SIZE}
                    onClick={() => setPage(p => p + 1)}
                >
                    Older Posts →
                </button>
            </div>
        </BlogWrapper>
    );
}