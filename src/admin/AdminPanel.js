import React from "react";

import { Admin, Resource } from 'react-admin';

import {
    ListForm as ArticleList,
    EditForm as ArticleEdit,
    CreateForm as ArticleCreate,
    ShowForm as ArticleShow,
} from './resources/articles';

import {
    ListForm as ProgrammList,
    EditForm as ProgrammEdit,
    CreateForm as ProgrammCreate,
    ShowForm as ProgrammShow,
} from './resources/programms';

import {
    ListForm as ResearchList,
    EditForm as ResearchEdit,
    CreateForm as ResearchCreate,
    ShowForm as ResearchShow,
} from './resources/research';

import {
    ListForm as RationalizationList,
    EditForm as RationalizationEdit,
    CreateForm as RationalizationCreate,
    ShowForm as RationalizationShow,
} from './resources/rationalization'

import {
    ListForm as PublicationList,
    EditForm as PublicationEdit,
    CreateForm as PublicationCreate,
    ShowForm as PublicationShow,
} from './resources/publication';

import {
    ListForm as DepartmentList,
    EditForm as DepartmentEdit,
    CreateForm as DepartmentCreate,
    ShowForm as DepartmentShow,
} from './resources/departments';

import DashBoard from './DashBoard';
import MyLayout from "./MyLayout";

import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import VisibilityIcon from '@material-ui/icons/Visibility';
import GroupIcon from '@material-ui/icons/Group';

import dataProvider from './DataProvider';

import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from './locale';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ru from 'date-fns/locale/ru';
import format from "date-fns/format";

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, 'LLLL', { locale: this.locale });
    }

    getDatePickerHeaderText(date) {
        return format(date, 'EEEE, d MMMM', { locale: this.locale });
    }
}

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const AdminPanel = () => (
    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ru}>
        <Admin
            layout={MyLayout}
            title={<span>Технополис "ЭРА"</span>}
            dashboard={DashBoard}
            i18nProvider={i18nProvider}
            dataProvider={dataProvider}>
            <Resource
                name="articles"
                icon={TextFieldsIcon}
                options={{ label: 'Статьи' }}
                list={ArticleList}
                edit={ArticleEdit}
                create={ArticleCreate}
                show={ArticleShow} />
            <Resource
                name="programms"
                icon={CodeIcon}
                options={{ label: 'Программы' }}
                list={ProgrammList}
                edit={ProgrammEdit}
                create={ProgrammCreate}
                show={ProgrammShow} />
            <Resource
                name="research"
                icon={MenuBookIcon}
                options={{ label: 'Научные работы' }}
                list={ResearchList}
                edit={ResearchEdit}
                create={ResearchCreate}
                show={ResearchShow} />
            <Resource
                name="rationalization"
                icon={EmojiObjectsIcon}
                options={{ label: 'Рационализаторские\nпредложения' }}
                list={RationalizationList}
                edit={RationalizationEdit}
                create={RationalizationCreate}
                show={RationalizationShow} />
            <Resource
                name="publication"
                icon={VisibilityIcon}
                options={{ label: 'Места публикации' }}
                list={PublicationList}
                edit={PublicationEdit}
                create={PublicationCreate}
                show={PublicationShow} />
            <Resource
                name="departments"
                icon={GroupIcon}
                options={{ label: 'Отделы' }}
                list={DepartmentList}
                edit={DepartmentEdit}
                create={DepartmentCreate}
                show={DepartmentShow} />
        </Admin>
    </MuiPickersUtilsProvider>
);

export default AdminPanel;