import React from 'react';
import './Header.css';

export class Header extends React.Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="header">
                <div className="header__logo-wrapper">
                    <img src="https://meter4.me/images/logo.svg" className="header__logo"/>
                </div>

                <div className="header__exit-button">
                    Выйти
                </div>
            </div>
        );
    }


}
