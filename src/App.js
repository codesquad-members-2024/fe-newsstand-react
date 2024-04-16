import React from "react";
import Header from "./components/header/Header";
import LatestNews from "./components/latestNewsView/LatestNews";

const App = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <div className="w-1000 mx-auto">
                <Header />
                <LatestNews />
            </div>
        </div>
    );
};

export default App;
