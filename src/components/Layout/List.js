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
    const [isLoading] = useState(false);
    const [error] = useState(null);
    const [sort, setSort] = useState(0);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getSongs = (sort = 0, search = "") => {
            axios
                .get(ShowSong_tApi)
                .then((res) => {
                    let songs = res.data;
                    if (search !== "") {
                        songs = songs.filter((song) =>
                            song.title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        );
                    }
                    if (sort === 1) {
                        songs = songs.sort((a, b) => b.rank - a.rank);
                    } else if (sort === 2) {
                        songs = songs.sort((a, b) =>
                            a.title.localeCompare(b.title)
                        );
                    } else if (sort === 3) {
                        songs = songs.sort((a, b) =>
                            b.title.localeCompare(a.title)
                        );
                    } else if (sort === 4) {
                        songs = songs.sort((a, b) =>
                            a.artist.localeCompare(b.artist)
                        );
                    } else if (sort === 5) {
                        songs = songs.sort((a, b) =>
                            b.artist.localeCompare(a.artist)
                        );
                    }
                    if (songs.length > 20) {
                        songs = songs.slice(0, 20);
                    }
                    setSong(songs);
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        getSongs(sort, search);
    }, [ShowSong_tApi, sort, search]);

    const handleSort = (sortType) => {
        setSort(sortType);
    };

    const handleSearch = () => {
        setSearch(document.getElementById("searchInput").value);
    };

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
                            <th>
                                Rank
                                <button onClick={() => handleSort(0)}>↑</button>
                                <button onClick={() => handleSort(1)}>↓</button>
                            </th>
                            <th>
                                Title
                                <button onClick={() => handleSort(2)}>↑</button>
                                <button onClick={() => handleSort(3)}>↓</button>
                            </th>
                            <th>
                                Singer
                                <button onClick={() => handleSort(4)}>↑</button>
                                <button onClick={() => handleSort(5)}>↓</button>
                                <input
                                    id="searchInput"
                                    type="text"
                                    placeholder="Search by Title"
                                />
                                <button onClick={handleSearch}>Search</button>
                            </th>
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
