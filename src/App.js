import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import URLhdl from "./components/Common/Handler";
function App() {
    const handler = URLhdl();
    return (
        <div className="App">
            <header className="container">
                <div className="">
                    <Header />
                    <Routes>
                        <Route
                            path={handler["edit"]["link"] + ":idp"}
                            element={handler["edit"]["route"]}
                        />
                        <Route
                            path={handler["comment"]["link"] + ":id"}
                            element={handler["comment"]["route"]}
                        />
                        <Route
                            path={handler["create"]["link"]}
                            element={handler["create"]["route"]}
                        />
                        <Route
                            path={handler["list"]["link"]}
                            element={handler["list"]["route"]}
                        />
                        <Route
                            path={handler["home"]["link"]}
                            element={handler["home"]["route"]}
                        />
                        <Route
                            path={handler["nopage"]["link"]}
                            element={handler["nopage"]["route"]}
                        />
                    </Routes>
                </div>
            </header>
        </div>
    );
}

export default App;
