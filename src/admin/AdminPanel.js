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
} from './resources/rationalization';

import {
    ListForm as AbstractList,
    EditForm as AbstractEdit,
    CreateForm as AbstractCreate,
    ShowForm as AbstractShow,
} from './resources/abstracts';

import {
    ListForm as PatentList,
    EditForm as PatentEdit,
    CreateForm as PatentCreate,
    ShowForm as PatentShow,
} from './resources/patents';

import {
    ListForm as ApprobationList,
    EditForm as ApprobationEdit,
    CreateForm as ApprobationCreate,
    ShowForm as ApprobationShow,
} from './resources/approbations';

import {
    ListForm as DevelopmentList,
    EditForm as DevelopmentEdit,
    CreateForm as DevelopmentCreate,
    ShowForm as DevelopmentShow,
} from './resources/developments';

import {
    ListForm as VerificationList,
    EditForm as VerificationEdit,
    CreateForm as VerificationCreate,
    ShowForm as VerificationShow,
} from './resources/verifications';

import {
    ListForm as ProjectList,
    EditForm as ProjectEdit,
    CreateForm as ProjectCreate,
    ShowForm as ProjectShow,
} from './resources/projects';

import {
    ListForm as PublicationList,
    EditForm as PublicationEdit,
    CreateForm as PublicationCreate,
    ShowForm as PublicationShow,
} from './resources/publication';

import {
    ListForm as SubdivisionList,
    EditForm as SubdivisionEdit,
    CreateForm as SubdivisionCreate,
    ShowForm as SubdivisionShow,
} from './resources/subdivisions';

import {
    ListForm as UserList,
    EditForm as UserEdit,
    CreateForm as UserCreate,
    ShowForm as UserShow,
} from './resources/users';

import Routes from "./routes";

import DashBoard from './DashBoard';
import MyLayout from "./MyLayout";

import CodeIcon from '@material-ui/icons/Code';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PieChartIcon from '@material-ui/icons/PieChart';
import GroupIcon from '@material-ui/icons/Group';
import ListIcon from '@material-ui/icons/List';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import BallotIcon from '@material-ui/icons/Ballot';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CardTravelIcon from '@material-ui/icons/CardTravel';

import dataProvider from './DataProvider';
import authProvider from "./AuthProvider";

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
            customRoutes={Routes}
            title='Технополис "ЭРА"'
            dashboard={DashBoard}
            i18nProvider={i18nProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}>
            {(permissions) => [
                <Resource
                    name="articles"
                    icon={TextFieldsIcon}
                    options={{ label: 'Статьи' }}
                    list={ArticleList}
                    edit={permissions ? ArticleEdit : null}
                    create={permissions ? ArticleCreate : null}
                    show={ArticleShow} />,
                <Resource
                    name="programms"
                    icon={CodeIcon}
                    options={{ label: 'Программы' }}
                    list={ProgrammList}
                    edit={permissions ? ProgrammEdit : null}
                    create={permissions ? ProgrammCreate : null}
                    show={ProgrammShow} />,
                <Resource
                    name="research"
                    icon={MenuBookIcon}
                    options={{ label: 'НИР' }}
                    list={ResearchList}
                    edit={permissions ? ResearchEdit : null}
                    create={permissions ? ResearchCreate : null}
                    show={ResearchShow} />,
                // <Resource
                //     name="developments"
                //     icon={DashboardIcon}
                //     options={{ label: 'ОКР' }}
                //     list={DevelopmentList}
                //     edit={permissions ? DevelopmentEdit : null}
                //     create={permissions ? DevelopmentCreate : null}
                //     show={DevelopmentShow} />,
                <Resource
                    name="rationalization"
                    icon={EmojiObjectsIcon}
                    options={{ label: 'Рационализаторские\nпредложения' }}
                    list={RationalizationList}
                    edit={permissions ? RationalizationEdit : null}
                    create={permissions ? RationalizationCreate : null}
                    show={RationalizationShow} />,
                // <Resource
                //     name="projects"
                //     icon={CardTravelIcon}
                //     options={{ label: 'Проекты' }}
                //     list={ProjectList}
                //     edit={permissions ? ProjectEdit : null}
                //     create={permissions ? ProjectCreate : null}
                //     show={ProjectShow} />,
                <Resource
                    name="abstracts"
                    icon={ListIcon}
                    options={{ label: 'Тезисы докладов' }}
                    list={AbstractList}
                    edit={permissions ? AbstractEdit : null}
                    create={permissions ? AbstractCreate : null}
                    show={AbstractShow} />,
                // <Resource
                //     name="approbations"
                //     icon={CheckCircleOutlineIcon}
                //     options={{ label: 'Апробации' }}
                //     list={ApprobationList}
                //     edit={permissions ? ApprobationEdit : null}
                //     create={permissions ? ApprobationCreate : null}
                //     show={ApprobationShow} />,
                <Resource
                    name="patents"
                    icon={CardMembershipIcon}
                    options={{ label: 'Патенты' }}
                    list={PatentList}
                    edit={permissions ? PatentEdit : null}
                    create={permissions ? PatentCreate : null}
                    show={PatentShow} />,
                // <Resource
                //     name="verifications"
                //     icon={BallotIcon}
                //     options={{ label: 'Испытания' }}
                //     list={VerificationList}
                //     edit={permissions ? VerificationEdit : null}
                //     create={permissions ? VerificationCreate : null}
                //     show={VerificationShow} />,
                <Resource
                    name="publication"
                    icon={VisibilityIcon}
                    options={{ label: 'Места публикации' }}
                    list={PublicationList}
                    edit={PublicationEdit}
                    create={PublicationCreate}
                    show={PublicationShow} />,
                <Resource
                    name="subdivisions"
                    icon={PieChartIcon}
                    options={{ label: 'Подразделения' }}
                    list={SubdivisionList}
                    edit={SubdivisionEdit}
                    create={SubdivisionCreate}
                    show={SubdivisionShow} />,
                <Resource
                    name="users"
                    icon={GroupIcon}
                    options={{ label: 'Пользователи' }}
                    list={UserList}
                    // edit={UserEdit}
                    create={UserCreate}
                    show={UserShow} />,
            ]}
        </Admin>
    </MuiPickersUtilsProvider>
);

export default AdminPanel;