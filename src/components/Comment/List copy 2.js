import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import URLhdl from "../Common/Handler";

const ShowSong_t = () => {
    const handler = URLhdl();
    const ShowSong_tApi = Api(1);

    const [_song, setSong] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        // console.log("id : -", id);
        setIsLoading(true);
        try {
            const response = await fetch(ShowSong_tApi.concat("/") + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setSong(_song.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
            window.location.replace("/");
        }
    };

    useEffect(() => {
        const getSongs = () => {
            axios
                .get(ShowSong_tApi)
                .then((res) => {
                    setSong(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getSongs();
    }, [ShowSong_tApi]);

    if (_song.length < 0) {
        return <h1>no comment found</h1>;
    } else {
        return (
            <div className="mt-5">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Title</th>
                            <th>Comment</th>
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_song?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{item.userID}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td>
                                        <Link
                                            to={`${handler["edit"]["link"]}${item.id}`}
                                        >
                                            <i
                                                className="fa fa-pencil"
                                                aria-hidden="true"
                                            ></i>
                                        </Link>
                                        <Link
                                            to={`${handler["comment"]["link"]}${item.id}`}
                                        >
                                            <i
                                                className="fa fa-eye"
                                                aria-hidden="true"
                                            ></i>
                                        </Link>

                                        <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                            onClick={() =>
                                                handleDelete(item.id)
                                            }
                                        ></i>

                                        {/* <div
                                            className="modal fade"
                                            id={"editModal" + item.id}
                                            tabIndex="-1"
                                            aria-labelledby={
                                                "editModalLabel" + item.id
                                            }
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    {handler["unblock"](
                                                        handler["edit"][
                                                            "unblock"
                                                        ],
                                                        idProp
                                                    )}
                                                </div>
                                            </div>
                                        </div> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default ShowSong_t;
