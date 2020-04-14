import React from 'react';

import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, FileInput, FileField,
    DateField, minValue,
    required, minLength,
    ArrayInput, SimpleFormIterator,
    ArrayField, SingleFieldList,
    ChipField, ReferenceInput, SelectInput,
    ReferenceField, NumberInput,
} from 'react-admin';

import {
    createTitle, createEmptyPage,
    getShowActions, getEditActionsWithoutFile,
    getBulkActionButtons
} from "../utils";

import { HeadlineField, DescriptionField, RotaField } from '../CustomFields';
import { DateInput } from 'react-admin-date-inputs2';

const validateHeadline = [required(), minLength(1),];
const validateDescription = [required(), minLength(1),];
const validateCreationDate = [required(),];
const validateAuthors = [required(),];
const validateRota = [minValue(1),];
const validateFile = [required(),];

const dateFormat = 'dd.MM.yyyy';
const cancelLabel = "Отмена"

const Title = createTitle("Научная работа", "headline");
const Empty = createEmptyPage("Нет доступных научных работ",
    'Для добавления научной работы нажмите кнопку "Создать"')
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
            label="Автор"
            source="authors" />
        <ReferenceInput
            label="Отдел"
            source="department"
            reference="departments">
            <SelectInput optionText="name" />
        </ReferenceInput>
        <NumberInput
            label="Рота"
            source="rota"
            validate={validateRota} />
        <DateInput
            label="Дата создания"
            source="creationDate"
            options={{ format: dateFormat, cancelLabel: cancelLabel }} />
    </Filter>
);

export const ListForm = ({ permissions, ...props }) => (
    <List
        title="Список научных работ"
        filters={<Filters />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<Empty />}
        bulkActionButtons={<BulkActionButtons permissions={permissions} />}
        {...props}>
        <Datagrid
            rowClick={permissions ? "edit" : "show"}
            expand={<ShowForm enableActions={false} />}>>
            <HeadlineField
                label="Название"
                source="headline" />
            <DescriptionField
                label="Описание"
                source="description"
                maxchars={250} />
            <ReferenceField
                label="Отдел"
                source="department"
                reference="departments"
                link="">
                <TextField source="name" />
            </ReferenceField>
            <RotaField
                label="Рота"
                source="rota" />
            <ArrayField
                source="authors"
                label="Авторы">
                <SingleFieldList link="">
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

export const CreateForm = props => (
    <Create
        title="Добавить научную работу"
        successMessage="Научная работа добавлена"
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
            <ArrayInput
                validate={validateAuthors}
                source="authors"
                label="Авторы">
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author" />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput
                label="Рота"
                source="rota"
                validate={validateRota} />
            <ReferenceInput
                label="Отдел"
                source="department"
                reference="departments">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <FileInput
                source="file"
                label="PDF файл"
                accept="application/pdf"
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
        successMessage="Научная работа обновлена"
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
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            <ArrayInput
                validate={validateAuthors}
                label="Авторы"
                source="authors">
                <SimpleFormIterator>
                    <TextInput
                        label="Автор"
                        source="author" />
                </SimpleFormIterator>
            </ArrayInput>
            <NumberInput
                label="Рота"
                source="rota"
                validate={validateRota} />
            <ReferenceInput
                label="Отдел"
                source="department"
                reference="departments">
                <SelectInput optionText="name" />
            </ReferenceInput>
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
                <DateField
                    label="Дата создания"
                    source="creationDate"
                    locales="ru-RU" />
                <ArrayField
                    label="Авторы"
                    source="authors">
                    <SingleFieldList link="">
                        <ChipField
                            label="Автор"
                            source="author" />
                    </SingleFieldList>
                </ArrayField>
                <TextField
                    label="Рота"
                    source="rota" />
                <ReferenceField
                    label="Отдел"
                    source="department"
                    reference="departments"
                    link="">
                    <TextField source="name" />
                </ReferenceField>
                <FileField
                    source="file.url"
                    title="file.title"
                    label="PDF файл"
                    target="_blank" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}