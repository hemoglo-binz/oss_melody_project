import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import "./Comment.css";
// import URLhdl from "../Common/Handler";
const EditCC = ({ id }) => {
    // const handler = URLhdl();
    const [_com, setCC] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const { id } = useParams();
    // const navigate = useNavigate();
    const getCCApi = Api();

    useEffect(() => {
        const getCC = () => {
            axios
                .get(getCCApi.concat("/") + id)
                .then((item) => {
                    setCC(item.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getCC();
    }, [getCCApi, id]);

    const handelInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        console.log(name, value);
        setCC({ ..._com, [name]: value });
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        fetch(getCCApi.concat("/") + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(_com),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setIsLoading(true);
                // navigate(handler["list"]["link"]);
                window.location.replace("/");
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    return (
        <div className="_com-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Edit Form</p>
            </div>
            <form onSubmit={handelSubmit}>
                <div className="mb-3">
                    <label htmlFor="userID" className="form-label">
                        User
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userID"
                        name="userID"
                        value={_com.userID || ""}
                        onChange={handelInput}
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
                        value={_com.title || ""}
                        onChange={handelInput}
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
                        value={_com.body || ""}
                        onChange={handelInput}
                    />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                    EDIT
                </button>
            </form>
        </div>
    );
};
export default EditCC;
