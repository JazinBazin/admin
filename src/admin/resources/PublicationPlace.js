import React from 'react';
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter,
    required, minLength, minValue,
    TopToolbar, EditButton, ListButton,
    RefreshButton, CreateButton,
    ShowButton, CloneButton,
    NumberField, NumberInput,
} from 'react-admin';
import { Box, Typography } from "@material-ui/core";

const validateName = [required(), minLength(1)];
const validateRating = [required(), minValue(1)];

const PublicationPlaceTitle = ({ record }) => {
    return <span>{` Место публикации: "${record.name}"`}</span>;
};

const PublicationPlaceEmpty = ({ basePath, resource }) => (
    <Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
            Нет доступных мест публикации
        </Typography>
        <Typography variant="body1">
            Для добавления места публикации нажмите кнопку "Создать"
        </Typography>
        <CreateButton basePath={basePath} />
    </Box>
);

const PublicationPlaceFilter = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="name"
            alwaysOn />
    </Filter>
);

// ref

const PublicationPlaceShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
        <EditButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

// ref

const PublicationPlaceEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
        <CreateButton basePath={basePath} record={data} />
        <CloneButton basePath={basePath} record={data} />
        <ShowButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const PublicationPlaceList = props => (
    <List
        title="Список мест публикации"
        filters={<PublicationPlaceFilter />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<PublicationPlaceEmpty />}
        {...props}>
        <Datagrid
            rowClick="edit"
            expand={<PublicationPlaceShow enableActions={false} />}>
            <TextField
                label="Место публикации"
                source="name" />
            <NumberField
                label="Рейтинг"
                source="rating" />
        </Datagrid>
    </List>
);

export const PublicationPlaceCreate = props => (
    <Create
        title="Добавить место публикации"
        successMessage="Место публикации добавлено"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Место публикации"
                source="name"
                validate={validateName} />
            <NumberInput
                fullWidth
                label="Рейтинг"
                source="rating"
                validate={validateRating} />
        </SimpleForm>
    </Create>
);

export const PublicationPlaceEdit = props => (
    <Edit
        title={<PublicationPlaceTitle />}
        successMessage="Место публикации обновлено"
        undoable={false}
        actions={<PublicationPlaceEditActions />}
        {...props}>
        <SimpleForm
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Место публикации"
                source="name"
                validate={validateName} />
            <NumberInput
                fullWidth
                label="Рейтинг"
                source="rating"
                validate={validateRating} />
        </SimpleForm>
    </Edit>
);

export const PublicationPlaceShow = ({ enableActions, ...props }) => {
    const actions = enableActions ? <PublicationPlaceShowActions /> : false;
    return (
        <Show
            title={<PublicationPlaceTitle />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Место публикации"
                    source="name" />
                <NumberField
                    label="Рейтинг"
                    source="rating" />
            </SimpleShowLayout>
        </Show>
    );
};

PublicationPlaceShow.defaultProps = {
    enableActions: true,
}