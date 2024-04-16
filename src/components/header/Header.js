import React from "react";
import "./Header.css";
import mainLogo from "/Users/imseunghyeon/Documents/Masters/fe-newsstand-react/src/assets/image/logo.png"

const Header = () => {
    const getCurrentDate = () => {
        const DAYS = ["일", "월", "화", "수", "목", "금", "토"]
        const date = new Date();
        return (
            <div className="date-container AlignCenterY">
                {date.getFullYear()}. {date.getMonth() + 1}. {date.getDate()}. {DAYS[date.getDay()]}요일
            </div>
        );
    };

    const reloadPage = () => window.location.reload();

    return (
        <header>
            <a href="/" className="title-container AlignCenterY" onClick={reloadPage}>
                <img className="title-container_img" src={mainLogo} alt="로고"></img>
                <h1 className="title-container_text AlignCenterY">뉴스스탠드</h1>
            </a>
            {getCurrentDate()}
        </header>
    );
};

export default Header;
