import React from "react";
import simpleRestProvider from 'ra-data-simple-rest';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import { createBrowserHistory as createHistory } from 'history';
import russianMessages from 'ra-language-russian';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate, PostShow } from './admin/posts';
import DashBoard from './DashBoard';

const history = createHistory();
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');
const dataProvider = simpleRestProvider("http://localhost:3000/api");

const AdminPanel = () => (
    <Admin
        title={<span>Технополис "ЭРА"</span>}
        dashboard={DashBoard}
        history={history}
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}>
        <Resource
            name="posts"
            options={{ label: 'Статьи' }}
            list={PostList}
            edit={PostEdit}
            create={PostCreate}
            show={PostShow} />
    </Admin>
);

export default AdminPanel;