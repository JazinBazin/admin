import simpleRestProvider from 'ra-data-simple-rest';

const apiUrl = "http://localhost:3000/api";
const restProvider = simpleRestProvider(apiUrl);

const dataProvider = {
    ...restProvider,
    create: (resource, params) => {
        if (resource == 'articles') {
            const formData = new FormData();
            for (const key in params.data) {
                if (key == 'file') formData.append(key, params.data[key].rawFile, params.data[key].rawFile.name);
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
        if (resource == 'articles') {
            const formData = new FormData();
            for (const key in params.data) {
                if (key == 'file') formData.append(key, params.data[key].url);
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
    }
};

export default dataProvider;