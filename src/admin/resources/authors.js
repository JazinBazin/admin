import React from 'react';
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter,
    required, minLength, maxLength,
    TopToolbar, EditButton, ListButton,
    RefreshButton, CreateButton,
    ShowButton, CloneButton
} from 'react-admin';
import { Box, Typography } from "@material-ui/core";
import { AuthorField } from "./fields";

const validateName = [required(), minLength(1), maxLength(100)];

const AuthorTitle = ({ record }) => {
    return <span>{` Автор: ${record.rank} ${record.lastName} ${record.firstName} ${record.middleName}`}</span>;
};

const AuthorEmpty = ({ basePath, resource }) => (
    <Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
            Нет доступных авторов
        </Typography>
        <Typography variant="body1">
            Для добавления автора нажмите кнопку "Создать"
        </Typography>
        <CreateButton basePath={basePath} />
    </Box>
);

const AuthorFilter = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по фамилии"
            source="lastName"
            alwaysOn />
    </Filter>
);

const AuthorShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
        <EditButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

const AuthorEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
        <CreateButton basePath={basePath} record={data} />
        <CloneButton basePath={basePath} record={data} />
        <ShowButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const AuthorList = props => (
    <List
        title="Список авторов"
        filters={<AuthorFilter />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<AuthorEmpty />}
        {...props}>
        <Datagrid
            rowClick="edit"
            expand={<AuthorShow enableActions={false} />}>
            <AuthorField
                label="Автор" />
        </Datagrid>
    </List>
);

export const AuthorCreate = props => (
    <Create
        title="Добавить автора"
        successMessage="Автор добавлен"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Фамилия"
                source="lastName"
                validate={validateName} />
            <TextInput
                fullWidth
                label="Имя"
                source="firstName"
                validate={validateName} />
            <TextInput
                fullWidth
                label="Отчество"
                source="middleName"
                validate={validateName} />
        </SimpleForm>
    </Create>
);

export const AuthorEdit = props => (
    <Edit
        title={<AuthorTitle />}
        successMessage="Статья обновлена"
        undoable={false}
        actions={<AuthorEditActions />}
        {...props}>
        <SimpleForm
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Фамилия"
                source="lastName"
                validate={validateName} />
            <TextInput
                fullWidth
                label="Имя"
                source="firstName"
                validate={validateName} />
            <TextInput
                fullWidth
                label="Отчество"
                source="firstName"
                validate={validateName} />
        </SimpleForm>
    </Edit>
);

export const AuthorShow = ({ enableActions, ...props }) => {
    const actions = enableActions ? <AuthorShowActions /> : false;
    return (
        <Show
            title={<AuthorTitle />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Фамилия"
                    source="lastName" />
                <TextField
                    label="Имя"
                    source="firstName" />
                <TextField
                    label="Отчество"
                    source="middleName" />
            </SimpleShowLayout>
        </Show>
    );
};

AuthorShow.defaultProps = {
    enableActions: true,
}