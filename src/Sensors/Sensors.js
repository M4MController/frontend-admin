import React from 'react';
import './Sensors.css';
import {baseUrl} from "../App";

export class Sensors extends React.Component {
  constructor() {
    super();

    this.state = {
      sensors: []
    };
  }

  render() {
    const {sensors} = this.state;
    const {campaignId, userId} = this.props;

    if (!sensors.length) {
      fetch(`${baseUrl}/api/admin/${campaignId}/sensors/${userId}`, {
        method: 'GET',
        mode: 'cors'
      })
          .then((res) => {
            if (res.status >= 300 || res.status < 200) {
              alert(`Ошибка, код ответа от севера: ${res.status}`);
              throw res;
            }

            return res.json();
          })
          .then((res) => this.setState({sensors: res}));
    }

    const { onChangePage } = this.props;

    const body = sensors.map((sensor) => (
        <tr className="clickable" onClick={() => {onChangePage(sensor)}}>
          <td>{sensor.email}</td>
          <td>{sensor.name}</td>
        </tr>
    ));

    return (
        <div className="Sensors">
          <table className="table">
            <thead>
            <tr>
              <th>email</th>
              <th>name</th>
            </tr>
            </thead>
            <tbody className="clickable">
            {body}
            </tbody>
          </table>
        </div>
    );
  }
}
