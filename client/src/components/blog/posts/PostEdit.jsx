import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import useRequest from "../../../hooks/useRequest.js";
import useForm from "../../../hooks/useForm.js";
import useIsOwner from "../../../hooks/useIsOwner.js";

const SECTIONS_COUNT = 3;

const SECTIONS_CONFIG = Array.from({ length: SECTIONS_COUNT }, (_, i) => {
    const n = i + 1;
    return { id: n, titleKey: `section${n}Title`, textKey: `section${n}Text` };
});

export default function PostEdit() {
    const { postId } = useParams();
    const navigate = useNavigate();

    const { data: post, loading, error, request } = useRequest(
        `/data/clean_blog/${postId}`,
        {}
    );

    const {
        _id,
        title,
        subtitle,
        imageUrl,
        _ownerId,
        content = { sections: [] },
    } = post || {};

    const isOwner = useIsOwner(_ownerId);

    const initialValues = useMemo(() => ({
        title: "",
        subtitle: "",
        imageUrl: "",
        ...SECTIONS_CONFIG.reduce((acc, s) => {
            acc[s.titleKey] = "";
            acc[s.textKey] = "";
            return acc;
        }, {}),
    }), []);

    const editPostHandler = async (values) => {
        const now = Date.now();

        const sections = SECTIONS_CONFIG
            .map((s) => ({
                title: (values[s.titleKey] ?? "").trim(),
                text: (values[s.textKey] ?? "").trim(),
            }))
            .filter((s) => s.title || s.text);

        const postData = {
            title: (values.title ?? "").trim(),
            subtitle: (values.subtitle ?? "").trim(),
            imageUrl: (values.imageUrl ?? "").trim(),
            content: { sections },
            _updatedOn: now,
        };

        try {
            await request(`/data/clean_blog/${postId}`, "PUT", postData);
            navigate(`/posts/${postId}/details`);
        } catch (err) {
            console.error(err);
            alert("Failed to update post!");
        }
    };

    const { register, formAction, setValues } = useForm(editPostHandler, initialValues);

    useEffect(() => {
        if (!_id) return;

        const values = {
            title: title || "",
            subtitle: subtitle || "",
            imageUrl: imageUrl || "",
        };

        (content?.sections ?? []).forEach((s, i) => {
            const cfg = SECTIONS_CONFIG[i];
            if (!cfg) return;
            values[cfg.titleKey] = s.title ?? "";
            values[cfg.textKey] = s.text ?? "";
        });

        SECTIONS_CONFIG.forEach((cfg) => {
            values[cfg.titleKey] = values[cfg.titleKey] ?? "";
            values[cfg.textKey] = values[cfg.textKey] ?? "";
        });

        setValues(values);
    }, [_id, title, subtitle, imageUrl, content, setValues]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;
    if (!_id) return <p>Post not found.</p>;

    return (
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <p>Edit blog post.</p>

                        {!isOwner && <p className="no-articles">You are not allowed to edit this post.</p>}

                        {isOwner && (
                            <div className="my-5">
                                <form action={formAction}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" {...register("title")} placeholder="Title" />
                                        <label>Title</label>
                                    </div>

                                    <div className="form-floating mb-3">
                                        <input className="form-control" {...register("subtitle")} placeholder="Subtitle" />
                                        <label>Subtitle</label>
                                    </div>

                                    <div className="form-floating mb-4">
                                        <input className="form-control" {...register("imageUrl")} placeholder="Image URL" />
                                        <label>Image URL</label>
                                    </div>

                                    <h2 className="section-heading mb-3">Content</h2>

                                    {SECTIONS_CONFIG.map((s) => (
                                        <div key={s.id} className="mb-4">
                                            <strong>Section {s.id}</strong>

                                            <div className="form-floating mb-2">
                                                <input className="form-control" {...register(s.titleKey)} placeholder="Section title" />
                                                <label>Section title</label>
                                            </div>

                                            <div className="form-floating">
                                                <textarea
                                                    className="form-control"
                                                    {...register(s.textKey)}
                                                    placeholder="Section text"
                                                    style={{ height: "8rem" }}
                                                />
                                                <label>Section text</label>
                                            </div>
                                        </div>
                                    ))}

                                    <button className="btn btn-outline-secondary text-uppercase" type="submit">
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
