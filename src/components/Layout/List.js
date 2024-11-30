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
        return <h1>no song found</h1>;
    } else {
        return (
            <div className="mt-5">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Title</th>
                            <th>Singer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {_song?.map((item, i) => {
                            return (
                                <tr key={i + 1}>
                                    <td>{item.rank}</td>
                                    <td>
                                        <Link
                                            to={`${handler["detail"]["link"]}${item.title}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </td>
                                    <td>{item.artist}</td>
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
