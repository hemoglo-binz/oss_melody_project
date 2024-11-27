import Add from "../Comment/Add";
import List from "../Comment/List";
import Edit from "../Comment/Edit";
import Detail from "../Comment/Detail";
import Home from "../Layout/Home";
import NoPage from "../Common/NoPage";

const unblocker = (Block, prop) => {
    return <Block {...prop} />;
};

const URLs = {
    home: { link: "/", route: <Home />, unblock: Home },
    nopage: { link: "*", route: <NoPage />, unblock: NoPage },
    edit: { link: "/edit/", route: <Edit />, unblock: Edit },
    create: { link: "/write", route: <Add />, unblock: Add },
    list: { link: "/chart", route: <List />, unblock: List },
    detail: { link: "/detail/", route: <Detail />, unblock: Detail },
    unblock: unblocker,
};

export default function URLhandler() {
    return URLs;
}
