import React, {useEffect} from "react";
import unsplashContext from "../../helpers/unsplash-helper";
import {toJson} from "unsplash-js";
import styles from "./index.module.css";


const PhotoList = (props) => {
    const {
        searchText,
        oldSearch,
        photos,
        loadPhotos
    } = props;


    //Данный хук выполняется при отрисовке компоненты, и как раз позволяет выполнить асинхронную операцию
    // то есть пока, хук выполняется мы все равно можем отрисовать что-то, например сообщение: "Идет загрузка"
    useEffect(() => {
        //Проверяем что текст поиска изменился, чтобы начать новый поиск
        //Если этого не сделать, то будет зацикление:
        // отрисовка -> хук -> запрос к unsplash -> изменение state -> отрисовка -> хук -> запрос к unsplash -> изменение state........
        if (searchText !== oldSearch) {
            unsplashContext.search.photos(searchText)
                .then(toJson)
                .then(json => {
                    //Здесь мы вызываем action, который вызовет редьюсер, который поменяет state и в конечном итоге
                    //вызовет перерисовку всех компонентов, которые зависят от этого state
                    loadPhotos(json.results, searchText);
                });
        }
    });

    if (photos)
        return (
            <div className={styles.photoBox}>
                {
                    photos.map(photo => {
                        return (
                            <div>
                                <img src={photo.urls.small}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    else return (<div>Фотографии не найдены!</div>)
};

export default PhotoList;