import React from "react";
import dataProvider from './DataProvider';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
import { Admin, Resource } from 'react-admin';
import { ArticleList, ArticleEdit, ArticleCreate, ArticleShow } from './resources/articles';
import { ProgrammList, ProgrammEdit, ProgrammCreate, ProgrammShow } from './resources/programms';
import { AuthorList, AuthorEdit, AuthorCreate, AuthorShow } from './resources/authors';
import DashBoard from './DashBoard';
import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import GroupIcon from '@material-ui/icons/Group';

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
                name="authors"
                icon={GroupIcon}
                options={{ label: 'Авторы' }}
                list={AuthorList}
                edit={AuthorEdit}
                create={AuthorCreate}
                show={AuthorShow} />
        </Admin>
    </MuiPickersUtilsProvider>
);

export default AdminPanel;