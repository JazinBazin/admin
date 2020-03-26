import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = "http://localhost:3000/api";
const restProvider = simpleRestProvider(apiUrl);

const dataProvider = {
    ...restProvider,
    create: (resource, params) => {
        if (resource == 'articles' || resource == 'programms') {
            const formData = new FormData();
            for (const key in params.data) {
                if (key == 'creationDate') {
                    let date = new Date(params.data[key]);
                    date.setHours(0, 0, 0, 0);
                    formData.append(key, date.toDateString());
                }
                else if (key == 'file') formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name);
                else formData.append(key, params.data[key]);
            }
            return fetch(`${apiUrl}/${resource}`,
                {
                    method: 'POST',
                    body: formData
                })
                .then(({ json }) => ({
                    data: { ...params.data, id: json.id },
                }));

        }
        return restProvider.create(resource, params);
    },
    update: (resource, params) => {
        if (resource == 'articles' || resource == 'programms') {
            const formData = new FormData();
            for (const key in params.data) {
                if (key == 'creationDate') {
                    let date = new Date(params.data[key]);
                    date.setHours(0, 0, 0, 0);
                    formData.append(key, date.toDateString());
                }
                else if (key == 'file') formData.append(key, params.data[key].url);
                else if (key == 'newfile' && params.data[key]) formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name);
                else formData.append(key, params.data[key]);
            }
            return fetch(`${apiUrl}/${resource}/${params.id}`,
                {
                    method: 'PUT',
                    body: formData
                })
                .then(({ json }) => ({
                    data: json
                }));
        }
        return restProvider.update(resource, params);
    },
    getMany: (resource, params) => {
        const id = params.ids[0];
        return fetch(`${apiUrl}/${resource}/${id}`)
            .then(({ json }) => ({
                data: [json]
            }));
    },
};

export default dataProvider;