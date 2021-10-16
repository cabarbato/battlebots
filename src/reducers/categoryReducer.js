const SET_CATEGORY = 'SET_CATEGORY';
const initialState = {
    category: 'Vertical Bar',
};

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return Object.assign({}, state, { category: action.payload });
        default:
            return state;
    }
};

export default navReducer;
