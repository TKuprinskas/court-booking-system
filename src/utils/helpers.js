export const getUser = () => {
    const user = window.localStorage.getItem('user');
    if (user) {
        return JSON.parse(user);
    }
    return false;
};

export const TournamentLevel = [
    {
        value: 'Light',
        label: 'Light (NTRP 2.5)',
    },
    {
        value: 'Middle',
        label: 'Middle (NTRP 3.0)',
    },
    {
        value: 'Power',
        label: 'Power (NTRP 3.5)',
    },
    {
        value: 'Hard',
        label: 'Hard (NTRP 4.0)',
    },
];
