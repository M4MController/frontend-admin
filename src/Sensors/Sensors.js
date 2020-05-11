import React from 'react';
import './Sensors.css';

const baseUrl = `${window.location.protocol}//${window.location.host}`;

let isFetch = false;

export class Sensors extends React.Component {
  constructor() {
    super();

    this.state = {
      sensors: []
    };
  }

  render() {
    const {sensors} = this.state;

    if (!sensors.length && !isFetch) {
      isFetch = true;

      fetch(`${baseUrl}/api/admin/sensors`, {
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
        <tr className="clickable" onClick={() => {onChangePage(sensor.sensor_id, sensor.email)}}>
          <td>{sensor.sensor_id}</td>
          <td>{sensor.email}</td>
          <td>{sensor.name}</td>
        </tr>
    ));

    return (
        <div className="Sensors">
          <table className="table">
            <thead>
            <tr>
              <th>sensor_id</th>
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
