import React from 'react';
import './Sensors.css';

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

      fetch('https://9a3fe4dd.ngrok.io/api/admin/sensors', {
        method: 'GET',
        mode: 'cors'
      })
          .then((res) => res.json())
          .then((res) => this.setState({sensors: res}));
    }

    const { onChangePage } = this.props;

    const body = sensors.map((sensor) => (
        <tr className="clickable" onClick={() => {onChangePage(sensor.sensor_id)}}>
          <td>{sensor.sensor_id}</td>
          <td>{sensor.email}</td>
        </tr>
    ));

    return (
        <div className="Sensors">
          <table className="table">
            <thead>
            <tr>
              <th>sensor_id</th>
              <th>email</th>
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
