import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import useForm from "../../../hooks/useForm.js";
import useRequest from "../../../hooks/useRequest.js";

export default function PostEdit() {
    const editGameHandler = async (values) => {
        try {
            await request(`/data/clean_blog/${postId}`, 'PUT', values);

            navigate(`/clean_blog/${postId}/details`);
        }catch (e) {
            alert(e.message);
        }
    }

    const {
        register,
        formAction,
        setValues,
    } = useForm(editGameHandler, {
        title: '',
        genre: '',
        players: '',
        date: '',
        imageUrl: '',
        summary: '',
    });

    const navigate = useNavigate();
    const {postId} = useParams();
    const { request } = useRequest();



    useEffect(() => {
        request(`/data/clean_blog/${postId}`)
            .then(result => setValues(result))
            .catch(err => alert(err.message))
    }, [gameId, setValues])





    return (
        <section id="edit-page">
            <form id="add-new-game" action={formAction} method="post">
                <div className="container">
                    <h1>Edit Game</h1>
                    <div className="form-group-half">
                        <label htmlFor="title">Game Name:</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter game title..."
                            { ...register('title') }
                        />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            placeholder="Enter game genre..."
                            { ...register('genre') }
                        />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="players">Active Players:</label>
                        <input
                            type="number"
                            id="players"
                            min={0}
                            placeholder={0}
                            { ...register('players') }
                        />
                    </div>
                    <div className="form-group-half">
                        <label htmlFor="date">Release Date:</label>
                        <input
                            type="date"
                            id="date"
                            { ...register('date') }
                        />
                    </div>
                    <div className="form-group-full">
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            placeholder="Enter image URL..."
                            { ...register('imageUrl') }
                        />
                    </div>
                    <div className="form-group-full">
                        <label htmlFor="summary">Summary:</label>
                        <textarea
                            id="summary"
                            rows={5}
                            placeholder="Write a brief summary..."
                            { ...register('summary')}
                        />
                    </div>
                    <input className="btn submit" type="submit" defaultValue="EDIT GAME" />
                </div>
            </form>
        </section>
    );
}