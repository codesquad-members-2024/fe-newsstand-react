import React, { useReducer } from "react";

export const SubscribeContext = React.createContext();

const initialState = { subscriptions: [] };

function reducer(state, { type, payLoad }) {
    switch (type) {
        case "subscribe":
            return { subscriptions: [...state.subscriptions, payLoad] };
        case "unsubscribe":
            return { subscriptions: state.subscriptions.filter(newsData => newsData.pressName !== payLoad) };
        default:
            throw new Error();
    }
}

export const SubscribeProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <SubscribeContext.Provider value={[state, dispatch]}>
            {props.children}
        </SubscribeContext.Provider>
    );
};
