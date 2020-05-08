import React from 'react';

import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, required, minLength,
    BooleanInput, NullableBooleanInput,
    BooleanField
} from 'react-admin';

import {
    createTitle, createEmptyPage,
    getShowActions, getEditActions
} from "../utils";

const validateLoginExistsOnCreate = (values) => {
    return fetch("/api/users/unique", {
        method: "POST",
        body: JSON.stringify({ login: values.login }),
        headers: { "Content-Type": "application/json" }
    })
        .then(data => data.json())
        .then(data => {
            if (data.exists) return { login: "Логин занят" }
            else return undefined;
        })
        .catch(() => ({ login: "Internal error, please try again" }));
}

const validateLogin = [required(), minLength(1)];
const validatePassword = [required(), minLength(8)];

const Title = createTitle("Пользователи", "login");
const Empty = createEmptyPage("Нет зарегистрированных пользователей",
    'Для добавления пользователя нажмите кнопку "Создать"')
const ShowActions = getShowActions();
// const EditActions = getEditActions();

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по логину"
            source="login"
            alwaysOn />
        <NullableBooleanInput
            label="Администратор"
            source="isAdmin"
            displayNull />
    </Filter>
);

export const ListForm = props => (
    <List
        title="Список пользователей"
        filters={<Filters />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<Empty />}
        {...props}>
        <Datagrid
            rowClick="show"
            expand={<ShowForm enableActions={false} />}>
            <TextField
                label="Логин"
                source="login" />
            {/* <TextField
                label="Пароль"
                source="password" /> */}
            <BooleanField
                label="Администратор"
                source="isAdmin" />
        </Datagrid>
    </List>
);

export const CreateForm = props => (
    <Create
        title="Добавить пользователя"
        successMessage="Пользователь добавлен"
        undoable={false}
        {...props}>
        <SimpleForm
            validate={validateLoginExistsOnCreate}
            redirect="list"
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Логин"
                source="login"
                validate={validateLogin} />
            <TextInput
                fullWidth
                label="Пароль"
                source="password"
                validate={validatePassword} />
            <BooleanInput
                label="Администратор"
                source="isAdmin" />
        </SimpleForm>
    </Create>
);

// export const EditForm = props => (
//     <Edit
//         title={<Title />}
//         successMessage="Пользователь обновлён"
//         undoable={false}
//         actions={<EditActions />}
//         {...props}>
//         <SimpleForm
//             submitOnEnter={false}>
//             <TextField
//                 fullWidth
//                 label="Логин"
//                 source="login" />
//             <TextInput
//                 fullWidth
//                 label="Пароль"
//                 source="password"
//                 validate={validatePassword} />
//             <BooleanInput
//                 label="Администратор"
//                 source="isAdmin" />
//         </SimpleForm>
//     </Edit>
// );

export const ShowForm = ({ enableActions, ...props }) => {
    const actions = enableActions ? <ShowActions /> : false;
    return (
        <Show
            title={<Title />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Логин"
                    source="login" />
                {/* <TextField
                    label="Пароль"
                    source="password" /> */}
                <BooleanField
                    label="Администратор"
                    source="isAdmin" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}