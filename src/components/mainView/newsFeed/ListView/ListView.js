import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftButtonIMG, RightButtonIMG } from "../../../../utility/ButtonUI";

const ListView = ({ newsData, isSubscribeView }) => {

    return (
        <ListMainView>
          리스트 뷰

        </ListMainView>
    );
};

export default ListView;

const ListMainView = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
`

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
    height: 10%;
    border-bottom: 1px solid
        var(--border-border-default, rgba(210, 218, 224, 1));
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

const MainNewsTemplate = styled.div`
    width: 100%;
    height: 90%;
`;

const TotalPage = styled.div`
    margin-left: 20px;
`;
