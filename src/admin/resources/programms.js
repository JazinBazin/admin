import React from 'react';
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, FileInput, FileField,
    DateField,
    required, minLength, maxLength,
    TopToolbar, EditButton, ListButton,
    RefreshButton, CreateButton,
    ShowButton
} from 'react-admin';

import { Box, Typography } from "@material-ui/core";
import { HeadlineField, DescriptionField } from './fields';
import { DateInput } from 'react-admin-date-inputs2';

const validateHeadline = [required(), minLength(1), maxLength(100)];
const validateDescription = [required(), minLength(1), maxLength(1000)];
const validateCreationDate = [required(),];
const dateFormat = 'dd.MM.yyyy';
const cancelLabel = "Отмена"

const ProgrammTitle = ({ record }) => {
    return <span>{` Программа: "${record.headline}"`}</span>;
};

const ProgrammEmpty = ({ basePath, resource }) => (
    <Box textAlign="center" m={1}>
        <Typography variant="h4" paragraph>
            Нет доступных статей
        </Typography>
        <Typography variant="body1">
            Для создания статьи нажмите кнопку "Создать"
        </Typography>
        <CreateButton basePath={basePath} />
    </Box>
);

const ProgrammFilter = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="headline"
            alwaysOn />
        <TextInput
            label="Описание"
            source="description" />
        <DateInput
            label="Дата создания"
            source="creationDate"
            options={{ format: dateFormat, cancelLabel: cancelLabel }} />
    </Filter>
);

const ProgrammShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <EditButton basePath={basePath} record={data} />
        <ListButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

const ProgrammEditActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
        <CreateButton basePath={basePath} record={data} />
        <ShowButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

export const ProgrammList = props => (
    <List
        title="Список программ"
        filters={<ProgrammFilter />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<ProgrammEmpty />}
        {...props}>
        <Datagrid
            rowClick="edit"
            expand={<ProgrammShow enableActions={false} />}>>
            <HeadlineField
                label="Название"
                source="headline" />
            <DescriptionField
                label="Описание"
                source="description"
                maxchars={250} />
            <DateField
                label="Дата создания"
                source="creationDate"
                locales="ru-RU"
            />
        </Datagrid>
    </List>
);

export const ProgrammCreate = props => (
    <Create
        title="Добавить программу"
        successMessage="Программа добавлена"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Название"
                source="headline"
                validate={validateHeadline} />
            <TextInput
                fullWidth
                label="Описание"
                multiline
                source="description"
                validate={validateDescription} />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <FileInput
                source="file"
                label="Архив с программой"
                accept="application/x-rar-compressed, application/zip"
                validate={required()}>
                <FileField
                    source="file"
                    title="Загруженный файл" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const ProgrammEdit = props => (
    <Edit
        title={<ProgrammTitle />}
        successMessage="Программа обновлена"
        undoable={false}
        actions={<ProgrammEditActions />}
        {...props}>
        <SimpleForm
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Название"
                source="headline"
                validate={validateHeadline} />
            <TextInput
                fullWidth
                label="Описание"
                multiline
                source="description"
                validate={validateDescription} />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <FileField
                source="file.url"
                title="file.title"
                label="Архив с программой"
                target="_blank" />
            <FileInput
                source="newfile"
                label="Новый файл"
                accept="application/x-rar-compressed, application/zip">
                <FileField
                    source="src"
                    title="Загруженный файл" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const ProgrammShow = ({ enableActions, ...props }) => {
    const actions = enableActions ? <ProgrammShowActions /> : false;
    return (
        <Show
            title={<ProgrammTitle />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Название"
                    source="headline" />
                <TextField
                    label="Описание"
                    source="description" />
                <DateField
                    label="Дата создания"
                    source="creationDate"
                    locales="ru-RU" />
                <FileField
                    source="file.url"
                    title="file.title"
                    label="PDF файл"
                    target="_blank" />
            </SimpleShowLayout>
        </Show>
    );
};

ProgrammShow.defaultProps = {
    enableActions: true,
}