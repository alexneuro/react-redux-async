import React from "react";
//Удобный способ подключения стилей, чтобы использовать их как переменные
import styles from "./index.module.css";

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {input: props.searchText}
    }

    componentDidMount() {
        this.handleSearchPhotos();
    }

    updateInput = input => {
        this.setState({input});
    };

    handleSearchPhotos = () => {
        this.props.search(this.state.input);
    };


    render() {
        return (
            <div>
                <p className={styles.text}>Введи поисковый запрос и нажми Enter</p>
                <input
                    className={styles.searchInput}
                    value={this.state.input}
                    type="text"
                    onChange={e => this.updateInput(e.target.value)}
                    onKeyUp={e => {
                        if (e.keyCode === 13)
                            this.handleSearchPhotos();
                    }}
                />
            </div>
        )
    }
}

export default SearchInput;