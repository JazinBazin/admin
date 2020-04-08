import React from 'react';
import {
    TopToolbar, EditButton, ListButton,
    RefreshButton, CreateButton,
    ShowButton, CloneButton,
} from 'react-admin';
import { Box, Typography } from "@material-ui/core";

export function createTitle(title) {
    return ({ record }) => {
        return <span>{` ${title}: "${record.name}"`}</span>;
    };
}

export function createEmptyPage(noPlacesMessage, addDataMessage) {
    return ({ basePath, resource }) => (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {noPlacesMessage}
            </Typography>
            <Typography variant="body1">
                {addDataMessage}
            </Typography>
            <CreateButton basePath={basePath} />
        </Box>
    );
}

export function getShowActions() {
    return ({ basePath, data, resource }) => (
        <TopToolbar>
            <ListButton basePath={basePath} record={data} />
            <EditButton basePath={basePath} record={data} />
            <RefreshButton basePath={basePath} record={data} />
        </TopToolbar>
    );
}

export function getEditActions() {
    return ({ basePath, data, resource }) => (
        <TopToolbar>
            <ListButton basePath={basePath} record={data} />
            <CreateButton basePath={basePath} record={data} />
            <CloneButton basePath={basePath} record={data} />
            <ShowButton basePath={basePath} record={data} />
            <RefreshButton basePath={basePath} record={data} />
        </TopToolbar>
    );
}