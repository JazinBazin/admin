import React from "react";
import dataProvider from './admin/DataProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import { Admin, Resource } from 'react-admin';
import { ArticleList, ArticleEdit, ArticleCreate, ArticleShow } from './admin/articles';
import DashBoard from './admin/DashBoard';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPanel = () => (
    <Admin
        title={<span>Технополис "ЭРА"</span>}
        dashboard={DashBoard}
        i18nProvider={i18nProvider}
        dataProvider={dataProvider}>
        <Resource
            name="articles"
            options={{ label: 'Статьи' }}
            list={ArticleList}
            edit={ArticleEdit}
            create={ArticleCreate}
            show={ArticleShow} />
    </Admin>
);

export default AdminPanel;