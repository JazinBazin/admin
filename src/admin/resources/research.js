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
    ChipField, ReferenceInput, SelectInput,
    SelectArrayInput, ReferenceArrayInput, ReferenceArrayField
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

const Title = createTitle("Научно-исследовательская работа", "headline");
const Empty = createEmptyPage("Нет доступных научно-исследовательских работ",
    'Для добавления научно-исследовательская работы нажмите кнопку "Создать"')
const ShowActions = getShowActions();
const EditActions = getEditActionsWithoutFile();
const BulkActionButtons = getBulkActionButtons();

const categoryChoices = [
    { id: "1", name: "1" },
    { id: "2", name: "2" },
    { id: "3", name: "3" },
    { id: "ГОЗ", name: "ГОЗ" },
];

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
        <SelectInput
            label="Категория"
            source="category"
            choices={categoryChoices} />
        {/* <ReferenceInput
            perPage={1000}
            label="Подразделение"
            source="subdivisions"
            reference="subdivisions">
            <SelectInput optionText="name" />
        </ReferenceInput> */}
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
        title="Список научно-исследовательских работ"
        filters={<Filters />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<Empty />}
        bulkActionButtons={<BulkActionButtons permissions={permissions} />}
        {...props}>
        <Datagrid
            // rowClick={permissions ? "edit" : "show"}
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
            {/* <ReferenceArrayField label="Подразделения" reference="subdivisions" source="subdivisions">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField> */}
        </Datagrid>
    </List>
);

export const CreateForm = props => (
    <Create
        title="Добавить научно-исследовательская работу"
        successMessage="Научно-исследовательская работа добавлена"
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
            <SelectInput
                label="Категория"
                source="category"
                choices={categoryChoices} />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            {/* <ReferenceArrayInput
                fullWidth
                label="Подразделения"
                reference="subdivisions"
                source="subdivisions"
                perPage={1000}>
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput> */}
            <FileInput
                source="file"
                label="Архив с научно-исследовательской работой"
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
        successMessage="Научно-исследовательская работа обновлена"
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
            <SelectInput
                label="Категория"
                source="category"
                choices={categoryChoices} />
            <DateInput
                label="Дата создания"
                source="creationDate"
                validate={validateCreationDate}
                options={{ format: dateFormat, cancelLabel: cancelLabel }} />
            {/* <ReferenceArrayInput
                fullWidth
                label="Подразделения"
                reference="subdivisions"
                source="subdivisions"
                perPage={1000}>
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput> */}
            <FileField
                source="file.url"
                title="file.title"
                label="Архив с научно-исследовательской работой"
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
                {/* <ReferenceArrayField label="Подразделения" reference="subdivisions" source="subdivisions">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ReferenceArrayField> */}
                <FileField
                    source="file.url"
                    title="file.title"
                    label="Архив с научно-исследовательской работой"
                    target="_blank" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}