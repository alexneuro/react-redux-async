import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import photoReducer from "./reducers/photo-reducer";
import searchReducer from "./reducers/search-reducer";

//Определяем какие редьюсеры в store будут обрабатываться
let reducers = combineReducers({
    photoStore: photoReducer,
    searchStore: searchReducer

});
export default createStore(reducers, applyMiddleware(thunk));