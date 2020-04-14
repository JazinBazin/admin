import React from 'react';

import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, required, minLength,
} from 'react-admin';

import {
    createTitle, createEmptyPage,
    getShowActions, getEditActions,
    getBulkActionButtons
} from "../utils";

const validateName = [required(), minLength(1)];

const Title = createTitle("Место публикации", "name");
const Empty = createEmptyPage("Нет доступных мест публикации",
    'Для добавления места публикации нажмите кнопку "Создать"')
const ShowActions = getShowActions();
const EditActions = getEditActions();
const BulkActionButtons = getBulkActionButtons();

const Filters = (props) => (
    <Filter {...props}>
        <TextInput
            label="Поиск по названию"
            source="name"
            alwaysOn />
    </Filter>
);

export const ListForm = ({ permissions, ...props }) => (
    <List
        title="Список мест публикации"
        filters={<Filters />}
        perPage={25}
        exporter={false}
        sort={{ field: 'firstCreationDate', order: 'DESC' }}
        empty={<Empty />}
        bulkActionButtons={<BulkActionButtons permissions={permissions} />}
        {...props}>
        <Datagrid
            rowClick={permissions ? "edit" : "show"}
            expand={<ShowForm enableActions={false} />}>
            <TextField
                label="Место публикации"
                source="name" />
        </Datagrid>
    </List>
);

export const CreateForm = props => (
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
        </SimpleForm>
    </Create>
);

export const EditForm = props => (
    <Edit
        title={<Title />}
        successMessage="Место публикации обновлено"
        undoable={false}
        actions={<EditActions />}
        {...props}>
        <SimpleForm
            submitOnEnter={false}>
            <TextInput
                fullWidth
                label="Место публикации"
                source="name"
                validate={validateName} />
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
                    label="Место публикации"
                    source="name" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}