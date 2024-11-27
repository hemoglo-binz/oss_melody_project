import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Comment.css";
import Api from "../Common/Api";
const EditCC = () => {
    const [_com, setCC] = useState([]);
    const { id } = useParams();
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

    return (
        <div className="_com mt-5">
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th className="showLeft">#{_com.id}</th>
                        <th className="showRight">Info</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>User</td>
                        <td>{_com.userID}</td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>{_com.title}</td>
                    </tr>
                    <tr>
                        <td>Comment</td>
                        <td>{_com.body}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
export default EditCC;
