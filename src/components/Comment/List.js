import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import URLhdl from "../Common/Handler";

const ShowUser_temp = () => {
    const hanlder = URLhdl();
    const ShowUser_tempApi = Api();

    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handelDelete = async (id) => {
        console.log("id : -", id);
        setIsLoading(true);
        try {
            const response = await fetch(ShowUser_tempApi.concat("/") + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setUser(user.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
            window.location.replace("/");
        }
    };

    // const getUsers = () => {
    //     axios
    //         .get(ShowUser_tempApi)
    //         .then((res) => {
    //             setUser(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    // useEffect(() => {
    //     getUsers();
    // }, []);

    useEffect(() => {
        const getUsers = () => {
            axios
                .get(ShowUser_tempApi)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getUsers();
    }, [ShowUser_tempApi]);

    if (user.length < 0) {
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
                        {user?.map((item, i) => {
                            const idProp = {
                                id: item.id,
                            };
                            return (
                                <tr key={i + 1}>
                                    <td>{i + 1}</td>
                                    <td>{item.userID}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td>
                                        <Link
                                            to="#"
                                            data-bs-toggle="modal"
                                            data-bs-target={
                                                "#editModal" + item.id
                                            }
                                        >
                                            <i
                                                className="fa fa-pencil"
                                                aria-hidden="true"
                                            ></i>
                                        </Link>
                                        {/* <Link
                                            to={`${hanlder["comment"]["link"]}${item.id}`}
                                        >
                                            <i
                                                className="fa fa-eye"
                                                aria-hidden="true"
                                            ></i>
                                        </Link> */}

                                        <i
                                            className="fa fa-trash-o"
                                            aria-hidden="true"
                                            onClick={() =>
                                                handelDelete(item.id)
                                            }
                                        ></i>

                                        <div
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
                                                    {hanlder["unblock"](
                                                        hanlder["edit"][
                                                            "unblock"
                                                        ],
                                                        idProp
                                                    )}
                                                </div>
                                            </div>
                                        </div>
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

export default ShowUser_temp;
