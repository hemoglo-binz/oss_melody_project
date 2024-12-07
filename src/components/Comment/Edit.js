import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Comment.scss";
import Api from "../Common/Api";

const EditCommentPage = () => {
    const { idp } = useParams();
    const [comment, setComment] = useState({
        user: "",
        pw: "",
        star: 0,
        title: "",
        comm: "",
    });
    const [inputPw, setInputPw] = useState("");
    const getCommentApi = `${Api()}/${idp}`;
    const ratingRef = useRef(null);

    useEffect(() => {
        const rateWrap = ratingRef.current;
        const stars = rateWrap.querySelectorAll(".star-icon");
        let label = rateWrap.querySelectorAll(".rating__label"),
            labelLength = label.length,
            opacityHover = "0.5";

        checkedRate();

        rateWrap.addEventListener("mouseenter", () => {
            label.forEach((label, idx) => {
                label.addEventListener("mouseenter", () => {
                    initStars();
                    filledRate(idx, labelLength);

                    for (let i = 0; i < stars.length; i++) {
                        if (stars[i].classList.contains("filled")) {
                            stars[i].style.opacity = opacityHover;
                        }
                    }
                });

                label.addEventListener("mouseleave", () => {
                    stars.forEach((star) => (star.style.opacity = "1"));
                    checkedRate();
                });

                rateWrap.addEventListener("mouseleave", () => {
                    stars.forEach((star) => (star.style.opacity = "1"));
                });
            });
        });

        function filledRate(index, length) {
            if (index <= length) {
                for (let i = 0; i <= index; i++) {
                    stars[i].classList.add("filled");
                }
            }
        }

        function checkedRate() {
            if (comment.star) {
                const value = comment.star;
                const stars = rateWrap.querySelectorAll(".rating__input");
                stars.forEach((star) => {
                    if (parseFloat(star.value) === value) {
                        star.checked = true;
                    }
                });
            }
            let checkedRadio = rateWrap.querySelectorAll(
                '.rating input[type="radio"]:checked'
            );

            initStars();
            checkedRadio.forEach((radio) => {
                let previousSiblings = prevAll(radio);

                for (let i = 0; i < previousSiblings.length; i++) {
                    previousSiblings[i]
                        .querySelector(".star-icon")
                        .classList.add("filled");
                }

                radio.nextElementSibling.classList.add("filled");

                function prevAll() {
                    let radioSiblings = [],
                        prevSibling =
                            radio.parentElement.previousElementSibling;

                    while (prevSibling) {
                        radioSiblings.push(prevSibling);
                        prevSibling = prevSibling.previousElementSibling;
                    }
                    return radioSiblings;
                }
            });
        }

        function initStars() {
            for (let i = 0; i < stars.length; i++) {
                stars[i].classList.remove("filled");
            }
        }
        axios
            .get(getCommentApi)
            .then((res) => {
                setComment(res.data);
                setTimeout(() => checkedRate(), 0);
                setComment(res.data);
            })
            .catch((err) => {
                console.error("Error fetching comment:", err);
            });
    }, [getCommentApi]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "radio" ? parseFloat(value) : value;
        setComment({ ...comment, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (comment.pw !== inputPw) {
            alert("Passwords do not match!");
            return;
        }

        fetch(getCommentApi, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...comment,
                date: new Date()
                    .toLocaleString("en-GB", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })
                    .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3/$2/$1")
                    .replace(",", ""),
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                alert("Comment updated successfully!");
                window.history.back();
            })
            .catch((error) => {
                console.error("Error updating comment:", error);
            });
    };

    const handleDelete = async () => {
        if (comment.pw !== inputPw) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await fetch(getCommentApi, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete comment");
            }
            alert("Comment deleted successfully!");
            window.history.back();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <div className="edit-comment-page">
            <h3>Edit Comment</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="user"
                        value={comment.user}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="pw"
                        value={inputPw}
                        onChange={(e) => setInputPw(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <div className="wrap" ref={ratingRef}>
                        <div className="rating">
                            <label
                                className="rating__label rating__label--half"
                                htmlFor="starhalf"
                            >
                                <input
                                    type="radio"
                                    id="starhalf"
                                    className="rating__input"
                                    name="star"
                                    value="0.5"
                                    checked={comment.star === 0.5}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--full"
                                htmlFor="star1"
                            >
                                <input
                                    type="radio"
                                    id="star1"
                                    className="rating__input"
                                    name="star"
                                    value="1"
                                    checked={comment.star === 1}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--half"
                                htmlFor="star1half"
                            >
                                <input
                                    type="radio"
                                    id="star1half"
                                    className="rating__input"
                                    name="star"
                                    value="1.5"
                                    checked={comment.star === 1.5}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--full"
                                htmlFor="star2"
                            >
                                <input
                                    type="radio"
                                    id="star2"
                                    className="rating__input"
                                    name="star"
                                    value="2"
                                    checked={comment.star === 2}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--half"
                                htmlFor="star2half"
                            >
                                <input
                                    type="radio"
                                    id="star2half"
                                    className="rating__input"
                                    name="star"
                                    value="2.5"
                                    checked={comment.star === 2.5}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--full"
                                htmlFor="star3"
                            >
                                <input
                                    type="radio"
                                    id="star3"
                                    className="rating__input"
                                    name="star"
                                    value="3"
                                    checked={comment.star === 3}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--half"
                                htmlFor="star3half"
                            >
                                <input
                                    type="radio"
                                    id="star3half"
                                    className="rating__input"
                                    name="star"
                                    value="3.5"
                                    checked={comment.star === 3.5}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--full"
                                htmlFor="star4"
                            >
                                <input
                                    type="radio"
                                    id="star4"
                                    className="rating__input"
                                    name="star"
                                    value="4"
                                    checked={comment.star === 4}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--half"
                                htmlFor="star4half"
                            >
                                <input
                                    type="radio"
                                    id="star4half"
                                    className="rating__input"
                                    name="star"
                                    value="4.5"
                                    checked={comment.star === 4.5}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                            <label
                                className="rating__label rating__label--full"
                                htmlFor="star5"
                            >
                                <input
                                    type="radio"
                                    id="star5"
                                    className="rating__input"
                                    name="star"
                                    value="5"
                                    checked={comment.star === 5}
                                    onChange={handleInputChange}
                                />
                                <span className="star-icon"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={comment.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Comment:</label>
                    <textarea
                        name="comm"
                        value={comment.comm}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Update Comment</button>
                <button type="button" onClick={handleDelete}>
                    Delete Comment
                </button>
            </form>
        </div>
    );
};

export default EditCommentPage;
