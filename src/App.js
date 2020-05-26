import React from 'react';
import './App.css';
import { Data } from "./Data/Data";
import { Sensors } from "./Sensors/Sensors";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {Login} from "./Login/Login";

export const pages =  {
  login: 'login',
  sensors: 'sensors',
  data: 'data'
};

export const baseUrl = `${window.location.protocol}//${window.location.host}`;

export class App extends React.Component {
  constructor() {
    super();

    const campaignName = localStorage.getItem('campaignName');
    const campaignId = localStorage.getItem('campaignId');

    this.state = {
      campaignName: campaignName,
      campaignId: campaignId,
      page: !campaignName ? pages.login : pages.sensors,
      sensorId: null,
      email: null
    };
  }

  render() {
    const { page, sensorId, email, campaignId } = this.state;

    console.log(campaignId);

    return (
        <div className="app">
          <div className="app__content">
            <Header onLogout={this.onLogout.bind(this)}/>
            {page === pages.login && <Login onLogin={this.onLogin.bind(this)}/>}
            {page === pages.sensors && <Sensors campaignId={campaignId} onChangePage={this.onChangePageToData.bind(this)} />}
            {page === pages.data && <Data sensorId={sensorId} email={email} onChangePage={this.onChangePageToSensors.bind(this)} />}
          </div>
          <Footer />
        </div>
    );
  }

  onLogout() {
    localStorage.setItem('login', null);
    localStorage.setItem('login', null);
    this.setState({campaignName: null, campaignId: null, page: pages.login})
  }

  onLogin(campaignName, password) {
    fetch(`${baseUrl}/api/admin/companies`, {
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
        .then((res) => {
          let isLogin = false;

          res.forEach((campaign) => {
            if (campaign.name.toLowerCase() === campaignName.toLowerCase() && password === '123') {
              localStorage.setItem('campaignName', campaignName);
              localStorage.setItem('campaignId', campaign.id);

              this.setState({campaignName: campaignName, campaignId: campaign.id, page: pages.sensors})

              isLogin = true;
            }
          });

          !isLogin && alert('Кампания или пароль неверны');
        });
  }

  onChangePageToData(id, email) {
    this.setState({page: pages.data, sensorId: id, email: email});
  }

  onChangePageToSensors() {
    this.setState({page: pages.sensors, sensorId: null});
  }
}
