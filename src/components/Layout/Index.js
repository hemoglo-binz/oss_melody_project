import React from "react";
import URLhdl from "../Common/Handler";
const Home = () => {
    const handler = URLhdl();
    return <div>{handler["list"]["route"]}</div>;
};

export default Home;
