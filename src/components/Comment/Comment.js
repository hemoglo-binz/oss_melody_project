import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Comment.css";
import Api from "../Common/Api";
const EditUser = () => {
    const [user, setUser] = useState([]);
    const { id } = useParams();
    const getUserApi = Api();

    // const getUser = () => {
    //     axios
    //         .get(getUserApi.concat("/") + id)
    //         .then((item) => {
    //             setUser(item.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    // useEffect(() => {
    //     getUser();
    // }, []);

    useEffect(() => {
        const getUser = () => {
            axios
                .get(getUserApi.concat("/") + id)
                .then((item) => {
                    setUser(item.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getUser();
    }, [getUserApi, id]);

    return (
        <div className="user mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="showLeft">#{user.id}</th>
                        <th className="showRight">Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>User</td>
                        <td>{user.userID}</td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>{user.title}</td>
                    </tr>
                    <tr>
                        <td>Comment</td>
                        <td>{user.body}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default EditUser;
