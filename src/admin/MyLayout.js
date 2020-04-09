import React from "react";
import { Layout } from 'react-admin';
import Menu from "./Menu";
import MyAppBar from "./MyAppBar";

const MyLayout = (props) => (
    <Layout
        {...props}
        menu={Menu}
        appBar={MyAppBar}
    />);

export default MyLayout;