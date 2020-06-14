import React from 'react';
import './App.css';
import { Data } from "./Data/Data";
import { Sensors } from "./Sensors/Sensors";
import {Header} from "./Header/Header";
import {Footer} from "./Footer/Footer";
import {Login} from "./Login/Login";
import {Users} from "./Users/Users";

export const pages =  {
  login: 'login',
  sensors: 'sensors',
  data: 'data',
  users: 'users'
};

export const baseUrl = `https://meter4.me`;

export class App extends React.Component {
  constructor() {
    super();

    const campaignName = localStorage.getItem('campaignName');
    const campaignId = localStorage.getItem('campaignId');

    this.state = {
      campaignName: campaignName,
      campaignId: campaignId,
      page: !campaignName ? pages.login : pages.users,
      sensorId: null,
      email: null,
      user: null
    };
  }

  render() {
    const { page, sensorId, email, campaignId, campaignName, user } = this.state;

    return (
        <div className="app">
          <div className="app__content">
            <Header onLogout={this.onLogout.bind(this)} campaignName={campaignName}/>
            {page === pages.login && <Login onLogin={this.onLogin.bind(this)}/>}
            {page === pages.users && <Users campaignId={campaignId} onChangePage={this.onChangePageToSensors.bind(this)} />}
            {page === pages.sensors && <Sensors userId={user.id} campaignId={campaignId} onChangePage={this.onChangePageToData.bind(this)} />}
            {page === pages.data && <Data user={user} sensorId={sensorId} email={email} onBackPage={this.onChangePageToSensors.bind(this)} />}
          </div>
          <Footer />
        </div>
    );
  }

  onLogout() {
    localStorage.setItem('campaignName', '');
    localStorage.setItem('campaignId', '');
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

              this.setState({campaignName: campaignName, campaignId: campaign.id, page: pages.users})

              isLogin = true;
            }
          });

          !isLogin && alert('Кампания или пароль неверны');
        });
  }

  onChangePageToData(id, email) {
    this.setState({page: pages.data, sensorId: id, email: email});
  }

  onChangePageToSensors(user) {
    this.setState({user, page: pages.sensors, sensorId: null});
  }
}
