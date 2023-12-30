import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import App from "./App";
import { HashRouter, Route, Routes } from 'react-router-dom';
const Root = ({ store }) => {

    return (
        <Provider store={store}>
            <HashRouter basename="/">
                <Routes>
                    <Route path="/" element={<App />} />
                </Routes>
           </HashRouter>
        </Provider >
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;