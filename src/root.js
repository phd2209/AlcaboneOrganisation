import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const Root = ({ store }) => {

    return (
        <Provider store={store}>
            <BrowserRouter basename="/AlcaboneOrganisation">
                <Routes>
                    <Route path="/AlcaboneOrganisation" element={<App />} />
                    {/*<Route path="/:wallet" element={<App />} />*/}
                </Routes>
            </BrowserRouter>
        </Provider >
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;