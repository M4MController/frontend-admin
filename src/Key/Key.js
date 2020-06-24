import React from 'react';
import './Key.css';
import {baseUrl} from "../App";

export class Key extends React.Component {
    constructor() {
        super();

        this.state = {
            key: ''
        };
    }

    render() {
        const { key } = this.state;

        return (
            <div className="key">
                <div className="key__elem">
                    <div className="key__title">
                        Публичный ключ
                    </div>
                    <input value={key} onChange={this.onKeyChange.bind(this)} className="key__input"/>
                </div>
                <div className="key__elem">
                    <button
                        className="key__button"
                        onClick={this.onClickButton.bind(this)}
                    >
                        Проверить
                    </button>
                </div>
            </div>
        );
    }

    onKeyChange(e) {
        this.setState({key: e.target.value});
    }

    onClickButton() {
        const { key } = this.state;

        fetch(`${baseUrl}/api/public_keys/check?public_key=${key}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => {
                if (res.status === 200) {
                    alert(`Ключ действителен`);
                } else if (res.status === 404) {
                    alert(`Ключ не действителен`);
                } else {
                    alert(`Ошибка, код ответа от севера: ${res.status}`);
                }
            })
    }
}
