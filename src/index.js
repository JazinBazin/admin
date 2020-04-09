import React from "react";
import ReactDOM from "react-dom";
import AdminPanel from './admin/AdminPanel';

// document.title = 'Технополис "ЭРА"';

// let link = document.createElement('link');
// link.type = 'image/x-icon';
// link.rel = 'shortcut icon';
// link.href = 'logo_era.ico';
// document.head.appendChild(link);

ReactDOM.render(
    <AdminPanel />,
    document.getElementById("app")
);
