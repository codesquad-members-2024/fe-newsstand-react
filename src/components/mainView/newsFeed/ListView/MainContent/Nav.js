import React, { useContext } from "react";
import styled from "styled-components";

import { ViewContext } from "../../../ViewStore";

const Nav = ({ newsInfo}) => {
    const [ViewState] = useContext(ViewContext);

    return (
        <>
            <CategoryNav>
                {newsInfo.length === 0 ? (<div>Loading...</div>) : (
                    newsInfo.map((curCategory, idx) => (
                        <Item key={idx}>
                            <span>{curCategory.category}</span>
                            <TotalPage>
                                {ViewState.isSubscribeView ? `>` : `1/${curCategory.data.length}`}{" "}
                            </TotalPage>
                            <div></div>
                        </Item>
                    ))
                )}
            </CategoryNav>
        </>
    );
};

export default Nav;

const CategoryNav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    border-bottom: 1px solid var(--border-border-default, rgba(210, 218, 224, 1));
    background: var(--surface-surface-alt, rgba(245, 247, 249, 1));
`;

const Item = styled.div`
    display: flex;
    position: relative;
    padding: 9px 10px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    transition: padding 0.5s ease;
    span {
        position: relative;
        z-index: 2;
    }
    &:hover {
        padding-right: 60px;
        background: rgba(196, 211, 255, 0.735);
        span {
            color: #fff;
        }
    }
`;

const TotalPage = styled.div`
    margin-left: 20px;
`;


