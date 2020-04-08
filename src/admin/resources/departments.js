import React from 'react';
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, required, minLength,
    NumberField, NumberInput,
} from 'react-admin';
import {
    createTitle, createEmptyPage,
    getShowActions, getEditActions
} from "./utils";

const validateName = [required(), minLength(1)];;

const Title = createTitle("Отдел");
const Empty = createEmptyPage("Нет доступных отделов",
    'Для добавления отдела нажмите кнопку "Создать"')
const ShowActions = getShowActions();
const EditActions = getEditActions();

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="name"
            alwaysOn />
    </Filter>
);

export const ListForm = props => (
    <List
        title="Список отделов"
        filters={<Filters />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<Empty />}
        {...props}>
        <Datagrid
            rowClick="edit"
            expand={<ShowForm enableActions={false} />}>
            <TextField
                label="Название"
                source="name" />
        </Datagrid>
    </List>
);

export const CreateForm = props => (
    <Create
        title="Добавить отдел"
        successMessage="Отдел добавлен"
        undoable={false}
        {...props}>
        <SimpleForm
            redirect="list"
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Название"
                source="name"
                validate={validateName} />
        </SimpleForm>
    </Create>
);

export const EditForm = props => (
    <Edit
        title={<Title />}
        successMessage="Отдел обновлён"
        undoable={false}
        actions={<EditActions />}
        {...props}>
        <SimpleForm
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Название"
                source="name"
                validate={validateName} />
        </SimpleForm>
    </Edit>
);

export const ShowForm = ({ enableActions, ...props }) => {
    const actions = enableActions ? <ShowActions /> : false;
    return (
        <Show
            title={<Title />}
            actions={actions}
            {...props}>
            <SimpleShowLayout>
                <TextField
                    label="Название"
                    source="name" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}