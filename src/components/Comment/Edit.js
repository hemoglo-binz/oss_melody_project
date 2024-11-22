import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import "./Comment.css";
// import URLhdl from "../Common/Handler";
const EditCC = () => {
    // const handler = URLhdl();
    const { param } = useParams();
    const [_com, setCC] = useState({
        id: param,
        userID: "",
        title: "",
        body: "",
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const navigate = useNavigate();
    const getCCApi = Api();

    const inputRf = useRef([]);
    const { id, userID, title, body } = _com;

    const isVaildID = id.length >= 1;
    const isVaildUID = userID.length >= 1;
    const isVaildTitle = title.length >= 1;
    const isVaildBody = body.length >= 1;

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

    const handleSubmit = (e) => {
        e.preventDefault();

        var isOk = 1;
        if (!isVaildID) {
        }
        if (!isVaildBody) {
            isOk = 0;
            inputRf.current[2].focus();
            setCC({
                ..._com,
                body: "",
            });
        }
        if (!isVaildTitle) {
            isOk = 0;
            inputRf.current[1].focus();
            setCC({
                ..._com,
                title: "",
            });
        }
        if (!isVaildUID) {
            isOk = 0;
            inputRf.current[0].focus();
            setCC({
                ..._com,
                userID: "",
            });
        }
        if (!isOk) {
            return 0;
        }

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
                // setIsLoading(true);
                // navigate(handler["list"]["link"]);
                // window.location.replace("/");
            })
            .catch((error) => {
                setError(error.message);
                setIsLoading(false);
            });
    };

    const handleInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        // console.log(name, value);
        setCC({ ..._com, [name]: value });
        handleSubmit(e);
    };

    return (
        <div className="_com-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Edit Form</p>
            </div>
            <form className="form_edit">
                <div className="mb-3">
                    <label htmlFor="userID" className="form-label">
                        User ID
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userID"
                        name="userID"
                        value={_com.userID || ""}
                        onChange={handleInput}
                        ref={(e) => (inputRf.current[0] = e)}
                    />
                    {!isVaildUID ? (
                        <span>Please check your User ID.</span>
                    ) : null}
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
                        onChange={handleInput}
                        ref={(e) => (inputRf.current[1] = e)}
                    />
                    {!isVaildTitle ? (
                        <span>Please check your User ID.</span>
                    ) : null}
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
                        onChange={handleInput}
                        ref={(e) => (inputRf.current[2] = e)}
                    />
                    {!isVaildBody ? (
                        <span>Please check your User ID.</span>
                    ) : null}
                </div>
                {/* <button type="submit" className="btn btn-primary submit-btn">
                    EDIT
                </button> */}
            </form>
        </div>
    );
};
export default EditCC;
