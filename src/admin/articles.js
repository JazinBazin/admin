import React from 'react';
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, FileInput, FileField,
    required, minLength, maxLength
} from 'react-admin';

const validateHeadline = [required(), minLength(1), maxLength(100)];
const validateAnnotation = [required(), minLength(1), maxLength(1000)];

export const ArticleCreate = props => (
    <Create
        title="Добавить статью"
        undoable={false}
        {...props}>
        <SimpleForm redirect="list">
            <TextInput type="text" fullWidth label="Название" source="headline" validate={validateHeadline} />
            <TextInput type="text" fullWidth label="Аннотация" multiline source="text" validate={validateAnnotation} />
            <FileInput source="file" label="PDF файл" accept="application/pdf" validate={required()}>
                <FileField source="file" title="Загруженный файл" target="_blank" />
            </FileInput>
        </SimpleForm>
    </Create>
);

const ArticleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск по названию" source="headline" alwaysOn />
        <TextInput label="Аннотация" source="text" />
    </Filter>
);

export const ArticleList = props => (
    <List
        title="Список статей"
        filters={<ArticleFilter />}
        perPage={25}
        {...props}>
        <Datagrid rowClick="edit">
            <TextField label="Название" source="headline" />
            <TextField label="Аннотация" source="text" />
        </Datagrid>
    </List>
);

const ArticleTitle = ({ record }) => {
    return <span>{`Статья: "${record.headline}"`}</span>;
};

export const ArticleEdit = props => (
    <Edit
        title={<ArticleTitle />}
        undoable={false}
        {...props}>
        <SimpleForm>
            <TextInput type="headline" fullWidth label="Название" source="headline" validate={validateHeadline} />
            <TextInput type="text" fullWidth label="Аннотация" multiline source="text" validate={validateAnnotation} />
            <FileField source="file.url" title="file.title" label="PDF файл" target="_blank" />
            <FileInput source="newfile" label="Новый файл" accept="application/pdf">
                <FileField source="src" title="Загруженный файл" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

export const ArticleShow = props => (
    <Show
        title={<ArticleTitle />}
        {...props}>
        <SimpleShowLayout>
            <TextField label="Название" source="headline" />
            <TextField label="Аннотация" source="text" />
            <FileField source="file.url" title="file.title" label="PDF файл" target="_blank" />
        </SimpleShowLayout>
    </Show>
);