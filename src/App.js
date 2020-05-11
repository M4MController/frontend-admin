import React from 'react';
import './App.css';
import { Data } from "./Data/Data";
import { Sensors } from "./Sensors/Sensors";

export const pages =  {
  sensors: 'sensors',
  data: 'data'
};

export class App extends React.Component {
  constructor() {
    super();

    this.state = {
      page: pages.sensors,
      sensorId: null,
      email: null
    };
  }

  render() {
    const { page, sensorId, email } = this.state;

    return (
        <div className="App">
          {page === pages.sensors && <Sensors onChangePage={this.onChangePageToData.bind(this)} />}
          {page === pages.data && <Data sensorId={sensorId} email={email} onChangePage={this.onChangePageToSensors.bind(this)} />}
        </div>
    );
  }

  onChangePageToData(id, email) {
    this.setState({page: pages.data, sensorId: id, email: email});
  }

  onChangePageToSensors() {
    this.setState({page: pages.sensors, sensorId: null});
  }
}
