import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Common/Header";
import URLhdl from "./components/Common/Handler";
function App() {
    const hanlder = URLhdl();
    return (
        <div className="App">
            <header className="container">
                <div className="">
                    <Header />
                    <Routes>
                        <Route
                            path={hanlder["home"]["link"]}
                            element={hanlder["home"]["route"]}
                        />
                        <Route
                            path={hanlder["edit"]["link"] + ":id"}
                            element={hanlder["edit"]["route"]}
                        />
                        <Route
                            path={hanlder["comment"]["link"] + ":id"}
                            element={hanlder["comment"]["route"]}
                        />
                        <Route
                            path={hanlder["create"]["link"]}
                            element={hanlder["create"]["route"]}
                        />
                        <Route
                            path={hanlder["list"]["link"]}
                            element={hanlder["list"]["route"]}
                        />
                    </Routes>
                </div>
            </header>
        </div>
    );
}

export default App;
