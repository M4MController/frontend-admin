import React from 'react';
import './Data.css';

function downloadAsFile(data) {
    let a = document.createElement("a");
    let file = new Blob([data], {type: 'application/json'});
    a.href = URL.createObjectURL(file);
    a.download = "example.txt";
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
                <input value={date} onChange={this.onDateChange.bind(this)} placeholder={'5.9.2020'}/>
                <input value={key} onChange={this.onKeyChange.bind(this)} placeholder={'lol'}/>
                <button
                    onClick={this.onClickButton.bind(this)}
                >
                    Скачать
                </button>
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
        const { sensorId } = this.props;
        const { date, key } = this.state;
        const [ day, month, year ] = date.split('.');

        // fetch(`https://9a3fe4dd.ngrok.io/api/admin/sensors/${sensorId}/${year}/${month}/${day}&key=&{key}`, {
        fetch(`https://9a3fe4dd.ngrok.io/api/admin/sensors/13a1648fe824494d8cee524d9ba1fe44/2020/5/9?key=lol`, {
            method: 'GET',
            mode: 'cors'
        })
            .then((res) => res.text())
            .then((res) => downloadAsFile(res));

    }
}
