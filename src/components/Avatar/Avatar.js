import React from 'react'
import classNames from 'classnames'
import wifiIcon from '../../assets/images/wifi.png'
import avatar from '../../assets/images/avatar.svg'
import cameraIcon from '../../assets/images/no-video.png'
import './Avatar.scss'

export const Avatar = ({ position, connectionStatus, isCannotConnectCamera }) => {
    return (
        <div className='Root' style={ { top: position.top, left: position.left } }>
            <img className='AvatarImg' src={ avatar } alt="avatar"/>
            { !connectionStatus ? (
                <img className={ classNames('NotificationIcon', 'Left') } src={ wifiIcon }
                     alt="connection-icon"/>) : null }
            { isCannotConnectCamera ? (
                <img className={ classNames('NotificationIcon', 'Right') } src={ cameraIcon }
                     alt="camera-icon"/>) : null }
        </div>
    )
};

export default Avatar
