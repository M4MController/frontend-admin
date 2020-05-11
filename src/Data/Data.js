import React from 'react';
import './Data.css';

const baseUrl = `${window.location.protocol}//${window.location.host}`;

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
        const { sensorId } = this.props;
        const { date, key } = this.state;

        return (
            <div className="Data">
                <div className="sensorId">{sensorId}</div>
                <div className="elems">
                    <input value={date} onChange={this.onDateChange.bind(this)} placeholder={'5.9.2020'} className="elem"/>
                    <input value={key} onChange={this.onKeyChange.bind(this)} placeholder={'lol'} className="elem"/>
                    <button
                        className="elem"
                        onClick={this.onClickButton.bind(this)}
                    >
                        Скачать
                    </button>
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
        const { sensorId, email } = this.props;
        const { date, key } = this.state;
        const [ day, month, year ] = date.split('.');
        const name = `${email}-${sensorId}-${date}.tsv`;

        fetch(`${baseUrl}/api/admin/sensors/${sensorId}/${year}/${month}/${day}&key=${key}`, {
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
