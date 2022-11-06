import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import App from "./App";
import { HashRouter /*BrowserRouter*/, Route, Routes } from 'react-router-dom';
const Root = ({ store }) => {

    return (
        <Provider store={store}>
            <HashRouter basename="/">
           {/*<BrowserRouter basename="">*/}
                <Routes>
                    <Route path="/" element={<App />} />
                    {/*<Route path="/:wallet" element={<App />} />*/}
                </Routes>
           {/*</BrowserRouter>*/}
           </HashRouter>
        </Provider >
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;