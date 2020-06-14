import React from 'react';
import './Data.css';
import {baseUrl} from "../App";

function downloadAsFile(data, name) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}

export class Data extends React.Component {
    constructor() {
        super();

        this.state = {
            date: '',
            key: ''
        };
    }

    render() {
        const { sensor, user } = this.props;
        const { date, key } = this.state;
        const userName = `${user.last_name} ${user.first_name}`;

        return (
            <div className="Data">
                <div className="user">{userName}</div>
                <div className="sensorName">{sensor.name}</div>
                <div className="elems">
                    <div className="elem">
                        <div>
                            Запрашиваемая дата
                        </div>
                        <input value={date} onChange={this.onDateChange.bind(this)} className="input"/>
                    </div>
                    <div className="elem">
                        <div>
                            Ключ шифрования
                        </div>
                        <input value={key} onChange={this.onKeyChange.bind(this)} className="input"/>
                    </div>
                    <div className="elem">
                        <button
                            className="button"
                            onClick={this.onClickButton.bind(this)}
                        >
                            Скачать
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    onDateChange(e) {
        this.setState({date: e.target.value});
    }

    onKeyChange(e) {
        this.setState({key: e.target.value});
    }

    onClickButton() {
        const { sensor } = this.props;
        const { date, key } = this.state;
        const [ day, month, year ] = date.split('.');
        const name = `${sensor.email}-${sensor.sensor_id}-${date}.tsv`;

        fetch(`${baseUrl}/api/admin/sensors/${sensor.sensor_id}/${year}/${month}/${day}?key=${key}`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => {
                if (res.status >= 300 || res.status < 200) {
                    alert(`Ошибка, код ответа от севера: ${res.status}`);
                    throw res;
                }

                return res.text();
            })
            .then((res) => downloadAsFile(res, name));

    }
}
