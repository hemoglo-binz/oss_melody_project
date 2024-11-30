import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import Api from "../Common/Api";
import URLhdl from "../Common/Handler";
import "./Layout.css";

const ShowSong_t = () => {
    const handler = URLhdl();
    const ShowSong_tApi = Api(1);

    const [_song, setSong] = useState([]);
    const [isLoading] = useState(false);
    const [error] = useState(null);

    useEffect(() => {
        const getSongs = () => {
            axios
                .get(ShowSong_tApi)
                .then((res) => {
                    setSong(res.data.slice(0, 10));
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
                <div class="container">
                    <div class="grid">
                        {_song?.map((item, i) => {
                            return (
                                <div class="grid-item">
                                    <Link
                                        to={`${handler["detail"]["link"]}${item.title}`}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                        />
                                    </Link>
                                    <p>
                                        <Link
                                            to={`${handler["detail"]["link"]}${item.title}`}
                                        >
                                            {item.title}
                                        </Link>
                                    </p>
                                    <span>{item.artist}</span>
                                </div>
                            );
                        })}
                    </div>
                    <Link to={handler["list"]["link"]}>
                        <button
                            style={{
                                "margin-top": "20px",
                                padding: "10px 20px",
                                "font-size": "16px",
                            }}
                        >
                            More
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
};

export default ShowSong_t;
