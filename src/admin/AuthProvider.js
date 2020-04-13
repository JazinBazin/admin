
const authProvider = {

    login: ({ username, password }) => {
        return fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ login: username, password }),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if (response.status == 200) return Promise.resolve();
                else return Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    logout: () => {
        return fetch("/api/logout")
            .then(response => {
                if (response.status == 200) return Promise.resolve();
                else return Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    checkAuth: () => {
        return fetch("/api/authenticate")
            .then(response => {
                if (response.status == 200) return Promise.resolve();
                else return Promise.reject();
            })
            .catch(() => Promise.reject());
    },

    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),

    checkError: ({ status }) => {
        alert("Internal error, please try again");
    },
};

export default authProvider;