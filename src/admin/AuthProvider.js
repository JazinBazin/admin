
const authProvider = {

    login: ({ username, password }) => {
        return fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ login: username, password }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                return response.status == 200
                    ? Promise.resolve()
                    : Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    logout: () => {
        return fetch("/api/logout")
            .then(response => {
                return response.status == 200
                    ? Promise.resolve()
                    : Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    checkAuth: () => {
        return fetch("/api/authenticate")
            .then(response => {
                return response.status == 200
                    ? Promise.resolve()
                    : Promise.reject();
            })
            .catch(() => Promise.reject());
    },


    getPermissions: () => {
        return fetch("/api/permissions")
            .then(response => response.json())
            .then(data => Promise.resolve(data.isAdmin))
            .catch(() => Promise.reject());
    },

    checkError: (error) => {
        alert(error);
    },
};

export default authProvider;