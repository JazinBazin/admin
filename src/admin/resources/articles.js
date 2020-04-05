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
    ShowButton, CloneButton,
    ArrayInput, SimpleFormIterator,
    ArrayField, SingleFieldList,
    ChipField,
} from 'react-admin';

import { Box, Typography } from "@material-ui/core";
import { HeadlineField, DescriptionField } from './fields';
import { DateInput } from 'react-admin-date-inputs2';

const validateHeadline = [required(), minLength(1), maxLength(100)];
const validateAnnotation = [required(), minLength(1), maxLength(1000)];
const validateCreationDate = [required(),];
const dateFormat = 'dd.MM.yyyy';
const cancelLabel = "Отмена"

const ArticleTitle = ({ record }) => {
    return <span>{` Статья: "${record.headline}"`}</span>;
};

const ArticleEmpty = ({ basePath, resource }) => (
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

const ArticleFilter = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="headline"
            alwaysOn />
        <TextInput
            label="Аннотация"
            source="text" />
        <DateInput
            label="Дата создания"
            source="creationDate"
            options={{ format: dateFormat, cancelLabel: cancelLabel }} />
    </Filter>
);

const ArticleShowActions = ({ basePath, data, resource }) => (
    <TopToolbar>
        <ListButton basePath={basePath} record={data} />
        <EditButton basePath={basePath} record={data} />
        <RefreshButton basePath={basePath} record={data} />
    </TopToolbar>
);

const ArticleEditActions = ({ basePath, data, resource }) => {
    const dataWithoutFile = { ...data };
    delete dataWithoutFile.file;
    return (
        <TopToolbar>
            <ListButton basePath={basePath} record={data} />
            <CreateButton basePath={basePath} record={data} />
            <CloneButton basePath={basePath} record={dataWithoutFile} />
            <ShowButton basePath={basePath} record={data} />
            <RefreshButton basePath={basePath} record={data} />
        </TopToolbar>
    );
}

export const ArticleList = props => (
    <List
        title="Список статей"
        filters={<ArticleFilter />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<ArticleEmpty />}
        {...props}>
        <Datagrid
            rowClick="edit"
            expand={<ArticleShow enableActions={false} />}>
            <HeadlineField
                label="Название"
                source="headline" />
            <DescriptionField
                label="Аннотация"
                source="text"
                maxchars={250} />
            <ArrayField
                source="authors"
                label="Авторы">
                <SingleFieldList linkType="">
                    <ChipField
                        label="Автор"
                        source="author" />
                </SingleFieldList>
            </ArrayField>
            <DateField
                label="Дата создания"
                source="creationDate"
                locales="ru-RU"
            />
        </Datagrid>
    </List>
);

const optionRenderer = choice => `${choice.lastName} ${choice.firstName} ${choice.middleName}`;
const inputText = choice => `${choice.lastName} ${choice.firstName} ${choice.middleName}`;

export const ArticleCreate = props => (
    <Create
        title="Добавить статью"
        successMessage="Статья добавлена"
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
                label="Аннотация"
                multiline
                source="text"
                validate={validateAnnotation}
                options={{ multiLine: true }} />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <ArrayInput
                validate={required()}
                source="authors"
                label="Авторы">
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author" />
                </SimpleFormIterator>
            </ArrayInput>
            <FileInput
                source="file"
                label="PDF файл"
                accept="application/pdf"
                validate={required()}>
                <FileField
                    source="file"
                    title="Загруженный файл" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const ArticleEdit = props => (
    <Edit
        title={<ArticleTitle />}
        successMessage="Статья обновлена"
        undoable={false}
        actions={<ArticleEditActions />}
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
                label="Аннотация"
                multiline
                source="text"
                validate={validateAnnotation} />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <ArrayInput
                validate={required()}
                label="Авторы"
                source="authors">
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author" />
                </SimpleFormIterator>
            </ArrayInput>
            <FileField
                source="file.url"
                title="file.title"
                label="PDF файл"
                target="_blank" />
            <FileInput
                source="newfile"
                label="Новый файл"
                accept="application/pdf">
                <FileField
                    source="src"
                    title="Загруженный файл" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const ArticleShow = ({ enableActions, ...props }) => {
    const actions = enableActions ? <ArticleShowActions /> : false;
    return (
        <Show
            title={<ArticleTitle />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Название"
                    source="headline" />
                <TextField
                    label="Аннотация"
                    source="text" />
                <DateField
                    label="Дата создания"
                    source="creationDate"
                    locales="ru-RU" />
                <ArrayField
                    label="Авторы"
                    source="authors">
                    <SingleFieldList linkType="">
                        <ChipField
                            label="Автор"
                            source="author" />
                    </SingleFieldList>
                </ArrayField>
                <FileField
                    source="file.url"
                    title="file.title"
                    label="PDF файл"
                    target="_blank" />
            </SimpleShowLayout>
        </Show>
    );
};

ArticleShow.defaultProps = {
    enableActions: true,
}