import React from 'react';
import './Users.css';
import {baseUrl} from "../App";

export class Users extends React.Component {
  constructor() {
    super();

    this.state = {
      users: []
    };
  }

  render() {
    const {users} = this.state;
    const {campaignId} = this.props;

    if (!users.length) {
      fetch(`${baseUrl}/api/admin/${campaignId}/users`, {
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
          .then((res) => this.setState({users: res}));
    }

    const { onChangePage } = this.props;

    const body = users.map((user) => (
        <tr className="clickable" onClick={() => {onChangePage(user)}}>
          <td>{user.last_name}</td>
          <td>{user.first_name}</td>
        </tr>
    ));

    return (
        <div className="Users">
          <table className="table">
            <thead>
            <tr>
              <th>Имя</th>
              <th>Фамилия</th>
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
