import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from "./HomePage";

export default [
    <Route exact path="/home" component={MainPage} noLayout/>,
];