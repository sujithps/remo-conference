import React from 'react';
import classNames from 'classnames'
import loadingIcon from '../../assets/images/refreshing.png'
import './Loading.scss'


export default function Loading({ loading }) {
    return <div className="AppLoader" style={ { top: '200px', left: '250px' } }>
        { loading ?
            (<div>
                    <text className={ classNames('NotificationIcon', 'Right') }>Loading</text>
                    <img className={ classNames('NotificationIcon', 'Left') } src={ loadingIcon }
                         alt="Loading-icon"/>
                </div>
            ) : null }
    </div>;
}