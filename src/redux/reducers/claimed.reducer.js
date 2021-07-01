const claimed = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLAIM':
            return action.payload
        default:
            return state;
    }
};

export default claimed;