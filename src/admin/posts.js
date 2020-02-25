import React from 'react';
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter
} from 'react-admin';

const PostFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Поиск по названию" source="headline" alwaysOn/>
        <TextInput label="Аннотация" source="text" />
    </Filter>
);

export const PostList = props => (
    <List
        title="Список статей"
        filters={<PostFilter />}
        perPage={25}
        // exporter={false}
        {...props}>
        <Datagrid rowClick="edit">
            <TextField label="Название" source="headline" />
            <TextField label="Аннотация" source="text" />
        </Datagrid>
    </List>
);

const PostTitle = ({ record }) => {
    return <span>{`Статья: "${record.headline}"`}</span>;
};

export const PostEdit = props => (
    <Edit
        title={<PostTitle />}
        undoable={false}
        {...props}>
        <SimpleForm>
            <TextInput type="text" fullWidth label="Название" source="headline" />
            <TextInput type="text" fullWidth label="Аннотация" multiline source="text" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = props => (
    <Create
        title="Добавить статью"
        undoable={false}
        {...props}>
        <SimpleForm redirect="list">
            <TextInput type="text" fullWidth label="Название" source="headline" />
            <TextInput type="text" fullWidth label="Аннотация" multiline source="text" />
        </SimpleForm>
    </Create>
);

export const PostShow = props => (
    <Show
        title={<PostTitle />}
        {...props}>
        <SimpleShowLayout>
            <TextField label="Название" source="headline" />
            <TextField label="Аннотация" source="text" />
        </SimpleShowLayout>
    </Show>
);