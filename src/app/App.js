import React from 'react';
import {loadPhotosActionCreator, searchActionCreator} from "./redux/actions";
import {connect} from "react-redux";
import PhotoList from "./components/PhotoList";
import SearchInput from "./components/SearchBox";

let App = (props) => {
    //Присваиваем переменным значения из props
    const {
        photos,
        oldSearch,
        searchText,

        search,
        loadPhotos
    } = props;

    return (
        <div className="App">
            <SearchInput
                searchText={searchText}
                search={search}
            />
            <PhotoList
                photos={photos}
                oldSearch={oldSearch}
                searchText={searchText}
                loadPhotos={loadPhotos}
            />
        </div>
    );
};

//Связываем переменные из State с переменными из Store
const mapStateToProps = state => {
    return {
        searchText: state.searchStore.searchText,
        oldSearch: state.photoStore.oldSearch,
        photos: state.photoStore.photos,
    }
};
//Связываем функции из State с функциями из Store
const mapDispatchToProps = (dispatch) => {
    return {
        search: (searchtext) => dispatch(searchActionCreator(searchtext)),
        loadPhotos: (photos, searchText) => dispatch(loadPhotosActionCreator(photos, searchText)),
    }
};

//Создаем объект App со всеми связями state и store
App = connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
