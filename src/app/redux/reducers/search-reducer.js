import {SEARCH} from "../actions";


let initialState = {
    searchText: 'cats'
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH:
            return {...state, searchText: action.searchText};

        default:
            return state;
    }
};
export default searchReducer;
