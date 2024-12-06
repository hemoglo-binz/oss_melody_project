import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./Comment.scss";
import Api from "../Common/Api";

const SongCommentPage = () => {
    const [songInfo, setSongInfo] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        user: "",
        pw: "",
        star: 0,
        title: "",
        comm: "",
    });
    const { title } = useParams();
    const getSongApi = Api(1);
    const getCommentsApi = Api();
    const ratingRef = useRef(null);

    useEffect(() => {
        const getSongInfo = () => {
            axios
                .get(getSongApi)
                .then((res) => {
                    const song = res.data.find((song) => song.title === title);
                    if (song) {
                        setSongInfo(song);
                    } else {
                        console.log("Song not found");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        const getComments = () => {
            axios
                .get(getCommentsApi)
                .then((res) => {
                    const filteredComments = res.data.filter(
                        (comment) => comment.song === title
                    );
                    setComments(filteredComments);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getSongInfo();
        getComments();
    }, [getSongApi, getCommentsApi, title]);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const newValue = type === "radio" ? parseFloat(value) : value;
        setNewComment({ ...newComment, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const commentData = {
            ...newComment,
            song: title,
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
        };

        axios
            .post(getCommentsApi, commentData)
            .then((res) => {
                setComments([...comments, res.data]);
                setNewComment({
                    user: "",
                    pw: "",
                    star: 0,
                    title: "",
                    comm: "",
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
    }, []);

    return (
        <div className="song-comment-page mt-5">
            {/* 노래 정보 표시 */}
            <div className="song-info">
                <img
                    src={songInfo.image}
                    alt={songInfo.title}
                    className="album-image"
                    style={{ width: "100px", height: "100px" }}
                />
                <h2>{songInfo.title}</h2>
                <h4>by {songInfo.artist}</h4>
                <p>Rank: {songInfo.rank}</p>
            </div>

            {/* 댓글 작성 폼 */}
            <div className="comment-form">
                <h3>Write a Comment</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="user"
                            value={newComment.user}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="pw"
                            value={newComment.pw}
                            onChange={handleInputChange}
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
                                        checked={newComment.star === 0.5}
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
                                        checked={newComment.star === 1}
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
                                        checked={newComment.star === 1.5}
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
                                        checked={newComment.star === 2}
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
                                        checked={newComment.star === 2.5}
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
                                        checked={newComment.star === 3}
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
                                        checked={newComment.star === 3.5}
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
                                        checked={newComment.star === 4}
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
                                        checked={newComment.star === 4.5}
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
                                        checked={newComment.star === 5}
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
                            value={newComment.title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Comment:</label>
                        <textarea
                            name="comm"
                            value={newComment.comm}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit Comment</button>
                </form>
            </div>

            {/* 댓글 목록 표시 */}
            <div className="comments-section">
                <h3>Comments</h3>
                {comments.map((comment) => (
                    <div key={comment.id} className="comment-item">
                        <div className="comment-header">
                            <span className="comment-user">{comment.user}</span>
                            <span className="comment-time">{comment.date}</span>
                        </div>
                        <div className="comment-body">
                            <p className="comment-title">{comment.title}</p>
                            <p className="comment-text">{comment.comm}</p>
                        </div>
                        <div className="comment-footer">
                            <span className="comment-stars">
                                ⭐ {comment.star}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SongCommentPage;
