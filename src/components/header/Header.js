import React from "react";
import "./Header.css";
import mainLogo from "/Users/imseunghyeon/Documents/Masters/fe-newsstand-react/src/assets/image/logo.png"
import { getCurrentDate, reloadPage } from "../../utility/utils";

const Header = () => {
    return (
        <header>
            <a href="/" className="flex items-center" onClick={reloadPage}>
                <img className="w-24px h-24px mr-4" src={mainLogo} alt="logo"></img>
                <h1 className="w-104 h-29 text-xl font-bold">뉴스스탠드</h1>
            </a>
            {getCurrentDate()}
        </header>
    );
};

export default Header;
