import React from 'react';
;
import {
    List, Datagrid, TextField,
    Edit, SimpleForm, TextInput,
    Create, Show, SimpleShowLayout,
    Filter, required, minLength, minValue,
    NumberField, NumberInput,
} from 'react-admin';

import {
    createTitle, createEmptyPage,
    getShowActions, getEditActions
} from "../utils";

const validateName = [required(), minLength(1)];
const validateRating = [required(), minValue(1)];

const Title = createTitle("Место публикации", "name");
const Empty = createEmptyPage("Нет доступных мест публикации",
    'Для добавления места публикации нажмите кнопку "Создать"')
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
        title="Список мест публикации"
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
                label="Место публикации"
                source="name" />
            <NumberField
                label="Рейтинг"
                source="rating" />
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
            <NumberInput
                fullWidth
                label="Рейтинг"
                source="rating"
                validate={validateRating} />
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
            <NumberInput
                fullWidth
                label="Рейтинг"
                source="rating"
                validate={validateRating} />
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
                    label="Место публикации"
                    source="name" />
                <NumberField
                    label="Рейтинг"
                    source="rating" />
            </SimpleShowLayout>
        </Show>
    );
};

ShowForm.defaultProps = {
    enableActions: true,
}