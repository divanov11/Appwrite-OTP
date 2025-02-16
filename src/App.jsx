import { useState } from "react";
import Routes from "./Routes";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="page-container">
            <div className="content-card">
                <Routes />
            </div>
        </div>
    );
}

export default App;
