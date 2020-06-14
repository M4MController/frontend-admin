import React from 'react';
import './Header.css';

export class Header extends React.Component {
    render() {
        const { campaignName } = this.props;

        return (
            <div className="header">
                <a target={'_self'} href={`https://meter4.me/about`} className="header__logo-wrapper">
                    <img src="https://meter4.me/images/logo.svg" className="header__logo"/>
                </a>

                {campaignName && (
                    <div className="header__exit-button" onClick={this.props.onLogout}>
                        {`Выйти (${campaignName})`}
                    </div>
                )}
            </div>
        );
    }
}
