import React from 'react';
import './Header.css';

export class Header extends React.Component {
    render() {
        const { campaignName, onChangePageToKey, onLogout } = this.props;

        return (
            <div className="header">
                <a target={'_self'} href={`https://meter4.me/about`} className="header__logo-wrapper">
                    <img src="https://meter4.me/images/logo.svg" className="header__logo"/>
                </a>

                <div className="header__buttons">
                    <div className="header__button" onClick={onChangePageToKey}>
                        Проверить ключ
                    </div>

                    {campaignName && (
                        <div className="header__button" onClick={onLogout}>
                            {`Выйти (${campaignName})`}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
