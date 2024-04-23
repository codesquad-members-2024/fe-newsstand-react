import React, { useReducer } from "react";
import { showSubscribeModal } from "../../utility/SnackbarUI";

export const SubscribeContext = React.createContext();

const initialState = { subscriptions: [] };

function SubReducer(state, { type, payLoad }) {
    switch (type) {
        case "SUBSCRIBE_PRESS":
            showSubscribeModal(payLoad.pressName)
            return { subscriptions: [...state.subscriptions, payLoad] };
        case "UNSUBSCRIBE_PRESS":
            return { subscriptions: state.subscriptions.filter(newsData => newsData.pressName !== payLoad) };
        default:
            throw new Error();
    }
}

export const SubscribeProvider = (props) => {
    const [SubState, SubDispatch] = useReducer(SubReducer, initialState);

    return (
        <SubscribeContext.Provider value={[SubState, SubDispatch]}>
            {props.children}
        </SubscribeContext.Provider>
    );
};
