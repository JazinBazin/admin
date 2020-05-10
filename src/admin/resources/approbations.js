import React from 'react';

import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, FileInput, FileField,
    DateField,
    required, minLength,
    ArrayInput, SimpleFormIterator,
    ArrayField, SingleFieldList,
    ChipField
} from 'react-admin';

import {
    createTitle, createEmptyPage,
    getShowActions, getEditActionsWithoutFile,
    getBulkActionButtons
} from "../utils";

import { HeadlineField, DescriptionField } from '../CustomFields';
import { DateInput } from 'react-admin-date-inputs2';

const validateHeadline = [required(), minLength(1),];
const validateDescription = [required(), minLength(1),];
const validateCreationDate = [required(),];
const validateAuthors = [required(),];
const validateFile = [required(),];

const dateFormat = 'dd.MM.yyyy';
const cancelLabel = "Отмена"

const Title = createTitle("Апробация", "headline");
const Empty = createEmptyPage("Нет доступных апробаций",
    'Для добавления апробации нажмите кнопку "Создать"')
const ShowActions = getShowActions();
const EditActions = getEditActionsWithoutFile();
const BulkActionButtons = getBulkActionButtons();

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="headline"
            alwaysOn />
        <TextInput
            label="Описание"
            source="description" />
        <TextInput
            label="Головной исполнитель"
            source="headPerformer" />
        <TextInput
            label="Заказчик"
            source="customer" />
        <TextInput
            label="Cоисполнитель"
            source="authors" />
        <DateInput
            label="Дата от"
            source="dateFrom"
            options={{ format: dateFormat, cancelLabel: cancelLabel }} />
        <DateInput
            label="Дата до"
            source="dateTo"
            options={{ format: dateFormat, cancelLabel: cancelLabel }} />
    </Filter>
);

export const ListForm = ({ permissions, ...props }) => (
    <List
        title="Список апробаций"
        filters={<Filters />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<Empty />}
        bulkActionButtons={<BulkActionButtons permissions={permissions} />}
        {...props}>
        <Datagrid
            rowClick="show"
            expand={<ShowForm enableActions={false} />}>>
            <HeadlineField
                label="Название"
                source="headline" />
            <DescriptionField
                label="Описание"
                source="description"
                maxchars={250} />
            <TextField
                label="Головной исполнитель"
                source="headPerformer" />
            <TextField
                label="Заказчик"
                source="customer" />
            <ArrayField
                source="authors"
                label="Соисполнители">
                <SingleFieldList linkType={false}>
                    <ChipField
                        label="Соисполнитель"
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

export const CreateForm = props => (
    <Create
        title="Добавить апробацию"
        successMessage="Апробация добавлена"
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
            <TextInput
                label="Головной исполнитель"
                source="headPerformer" />
            <TextInput
                label="Заказчик"
                source="customer" />
            <ArrayInput
                validate={validateAuthors}
                source="authors"
                label="Соискатели">
                <SimpleFormIterator>
                    <TextInput
                        label="Соискатель"
                        source="author" />
                </SimpleFormIterator>
            </ArrayInput>
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <FileInput
                source="file"
                label="Архив"
                accept="application/x-rar-compressed, application/zip"
                validate={validateFile}>
                <FileField
                    source="file"
                    title="Загруженный файл" />
            </FileInput>
        </SimpleForm>
    </Create>
);

export const EditForm = props => (
    <Edit
        title={<Title />}
        successMessage="Апробация обновлена"
        undoable={false}
        actions={<EditActions />}
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
            <TextInput
                label="Головной исполнитель"
                source="headPerformer" />
            <TextInput
                label="Заказчик"
                source="customer" />
            <ArrayInput
                validate={validateAuthors}
                label="Соискатели"
                source="authors">
                <SimpleFormIterator>
                    <TextInput
                        label="Соискатель"
                        source="author" />
                </SimpleFormIterator>
            </ArrayInput>
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <FileField
                source="file.url"
                title="file.title"
                label="Архив"
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

export const ShowForm = ({ permissions, enableActions, ...props }) => {
    const actions = enableActions ? <ShowActions permissions={permissions} /> : false;
    return (
        <Show
            title={<Title />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Название"
                    source="headline" />
                <TextField
                    label="Описание"
                    source="description" />
                <TextField
                    label="Головной исполнитель"
                    source="headPerformer" />
                <TextField
                    label="Заказчик"
                    source="customer" />
                <ArrayField
                    label="Соискатели"
                    source="authors">
                    <SingleFieldList linkType={false}>
                        <ChipField
                            label="Соискатель"
                            source="author" />
                    </SingleFieldList>
                </ArrayField>
                <TextField
                    label="Категория"
                    source="category" />
                <DateField
                    label="Дата создания"
                    source="creationDate"
                    locales="ru-RU" />
                <FileField
                    source="file.url"
                    title="file.title"
                    label="Архив"
                    target="_blank" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}