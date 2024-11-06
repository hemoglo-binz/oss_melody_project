import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import "./Comment.css";
// import URLhdl from "../Common/Handler";
const CreateUser_temp = () => {
    // const hanlder = URLhdl();
    // const navigate = useNavigate();
    const createUserApi = Api();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        id: "",
        userID: "",
        title: "",
        body: "",
    });

    const handleInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(name, value);
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user);
        try {
            setIsLoading(true);

            const response2 = await fetch(createUserApi, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            if (response2.ok) {
                console.log("Form submitted successfully!");
                setUser({
                    id: "",
                    userID: "",
                    title: "",
                    body: "",
                });
                // navigate(hanlder["list"]["link"]);
                window.location.replace("/");
            } else {
                console.error("Form submission failed!");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="modal-header">
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div className="user-form">
                <div className="heading">
                    {isLoading && <Loader />}
                    {error && <p>Error: {error}</p>}
                    <p>Add Comment</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="userID" className="form-label">
                            User
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="userID"
                            name="userID"
                            value={user.userID}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3 mt-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={user.title}
                            onChange={handleInput}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="body" className="form-label">
                            Comment
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="body"
                            name="body"
                            value={user.body}
                            onChange={handleInput}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary submit-btn"
                        data-bs-dismiss="modal"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateUser_temp;
