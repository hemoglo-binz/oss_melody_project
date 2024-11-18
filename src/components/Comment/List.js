import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import URLhdl from "../Common/Handler";

const ShowCC_temp = () => {
    const handler = URLhdl();
    const ShowCC_tempApi = Api();

    const [_com, setCC] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        console.log("id : -", id);
        setIsLoading(true);
        try {
            const response = await fetch(ShowCC_tempApi.concat("/") + id, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete item");
            }
            setCC(_com.filter((item) => item.id !== id));
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
            window.location.replace("/");
        }
    };

    useEffect(() => {
        const getCCs = () => {
            axios
                .get(ShowCC_tempApi)
                .then((res) => {
                    setCC(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getCCs();
    }, [ShowCC_tempApi]);

    if (_com.length < 0) {
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
                        {_com?.map((item, i) => {
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

export default ShowCC_temp;
