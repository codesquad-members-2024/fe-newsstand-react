import React, { useReducer } from "react";
import { showSubscribeModal } from "../../utility/SnackbarUI";

export const SubscribeContext = React.createContext();

const initialState = { subscriptions: [] };

function reducer(state, { type, payLoad }) {
    switch (type) {
        case "SUBSCRIBE":
            showSubscribeModal(payLoad.pressName)
            return { subscriptions: [...state.subscriptions, payLoad] };
        case "UNSUBSCRIBE":
            return { subscriptions: state.subscriptions.filter(newsData => newsData.pressName !== payLoad) };
        default:
            throw new Error();
    }
}

export const SubscribeProvider = (props) => {
    const [SubState, SubDispatch] = useReducer(reducer, initialState);

    return (
        <SubscribeContext.Provider value={[SubState, SubDispatch]}>
            {props.children}
        </SubscribeContext.Provider>
    );
};
