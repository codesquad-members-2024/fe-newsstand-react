import React from 'react'
import styled from 'styled-components'
import listOnIcon from "../../../assets/img/grid-view-on.png"
import listOffIcon from "../../../assets/img/list-view-off.png"
import gridOnIcon from "../../../assets/img/grid-view-on.png"
import gridOffIcon from "../../../assets/img/grid-view-off.png"

const PressViewSelector = ({isSubscribeView, setIsSubscribeView, isListView, setIsListView}) => {
    return (
        <div>
            <MainNav>
                <SubscribePressView>
                    <Button className={` ${isSubscribeView ? ``: `active`}`} >전체 언론사</Button>
                    <Button className={` ${isSubscribeView ? `active`: ``} `}>구독한 언론사</Button>
                </SubscribePressView>
                <SortView>
                    <img src={isListView ? listOnIcon : listOffIcon} alt="List View"></img>
                    <img src={isListView ? gridOffIcon : gridOnIcon} alt="grid View"></img>
                </SortView>
            </MainNav>
        </div>
    )
}

export default PressViewSelector

const MainNav = styled.nav`
    display: flex;
    justify-content: space-between;
`

const SubscribePressView = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
`

const SortView = styled.div`
    display: flex;
    width: 60px;
    display: flex;
    justify-content: space-between;
`

const Button = styled.button`
    &.active {
        font-weight: bold;
        font-size: large;
    }
`