import React from "react";
import ReactDOM from "react-dom";
import AdminPanel from './admin/AdminPanel';

document.title = 'Технополис "ЭРА"';

ReactDOM.render(
    <AdminPanel />,
    document.getElementById("app")
);
