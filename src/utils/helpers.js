export const getUser = () => {
    const user = window.localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return false;
};
