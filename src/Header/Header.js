import React from 'react';
import './Header.css';

export class Header extends React.Component {
    render() {

        return (
            <div className="header">
                <div className="header__logo-wrapper">
                    <img src="https://meter4.me/images/logo.svg" className="header__logo"/>
                </div>

                <div className="header__exit-button" onClick={this.props.onLogout}>
                    Выйти
                </div>
            </div>
        );
    }


}
