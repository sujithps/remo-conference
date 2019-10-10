import React from 'react'
import classNames from 'classnames'
import connectionIcon from '../../assets/images/connectionIcon.svg'
import avatar from '../../assets/images/avatar.svg'
import cameraIcon from '../../assets/images/cameraIcon.svg'
import './Avatar.scss'

export const Avatar = ({ position, connectionStatus, isCannotConnectCamera }) => {
    return (
        <div className='Root' style={ { top: position.top, left: position.left } }>
            <img className='AvatarImg' src={ avatar } alt="avatar"/>
            { connectionStatus === 'LOW' ? (
                <img className={ classNames('NotificationIcon', 'Left') } src={ connectionIcon }
                     alt="connection-icon"/>) : null }
            { isCannotConnectCamera ? (
                <img className={ classNames('NotificationIcon', 'Right') } src={ cameraIcon }
                     alt="camera-icon"/>) : null }
        </div>
    )
}

export default Avatar
