import { useNavigate } from "react-router";
import useRequest from "../../../hooks/useRequest.js";
import useForm from "../../../hooks/useForm.js";

const SECTIONS_COUNT = 3;

const SECTIONS_CONFIG = Array.from({ length: SECTIONS_COUNT }, (_, i) => {
    const n = i + 1;

    return {
        id: n,
        titleKey: `section${n}Title`,
        textKey: `section${n}Text`,
    };
});

export default function PostCreate() {
    const navigate = useNavigate();
    const { request } = useRequest();

    const createPostHandler = async (values) => {
        const now = Date.now();

        const sections = SECTIONS_CONFIG
            .map((s) => {
                const title = (values[s.titleKey] ?? "").trim();
                const text = (values[s.textKey] ?? "").trim();
                return { title, text };
            })
            .filter((s) => s.title || s.text);

        const postData = {
            title: values.title,
            subtitle: values.subtitle,
            imageUrl: values.imageUrl,
            content: { sections },
            _createdOn: now,
            _updatedOn: now,
        };

        try {
            await request("/data/clean_blog", "POST", postData);
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Failed to create post!");
        }
    };

    const initialValues = {
        title: "",
        subtitle: "",
        imageUrl: "",
        ...SECTIONS_CONFIG.reduce((acc, s) => {
            acc[s.titleKey] = "";
            acc[s.textKey] = "";
            return acc;
        }, {}),
    };

    const { register, formAction } = useForm(createPostHandler, initialValues);

    return (
        <main className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">

                        <p>Create a new blog post.</p>

                        <div className="my-5">
                            <form action={formAction}>

                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        {...register("title")}
                                        placeholder="Title"
                                    />
                                    <label>Title</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        {...register("subtitle")}
                                        placeholder="Subtitle"
                                    />
                                    <label>Subtitle</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <input
                                        className="form-control"
                                        {...register("imageUrl")}
                                        placeholder="Image URL"
                                    />
                                    <label>Image URL</label>
                                </div>

                                <h2 className="section-heading mb-3">Content</h2>

                                {SECTIONS_CONFIG.map((s) => (
                                    <div key={s.id} className="mb-4">
                                        <strong>Section {s.id}</strong>

                                        <div className="form-floating mb-2">
                                            <input
                                                className="form-control"
                                                {...register(s.titleKey)}
                                                placeholder="Section title"
                                            />
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
                                    Create Post
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
