import React from 'react'
import classNames from 'classnames'
import wifiIcon from '../../assets/images/wifi.png'
import noWifiIcon from '../../assets/images/no-wifi.png'
import noVideoIcon from '../../assets/images/no-video.png'
import videoIcon from '../../assets/images/video.png'

import './StatusGroup.scss'

export const StatusGroup = (props) => {

    function setConnectionIssue() {
        props.setConnectionIssue()
    }

    function setWebcamIssue() {
        props.setWebcamIssue()
    }

    const connectionIssueIconPosition = { top: '350px', left: '500px' }
    const webcamIssueIconPosition = { top: '350px', left: '620px' }
    return (
        <div>
            <div className='Root' onClick={ setConnectionIssue }
                 style={ { top: connectionIssueIconPosition.top, left: connectionIssueIconPosition.left } }>
                <text className={ classNames('NotificationIcon', 'Right') }> Connection Issue</text>
                <img className={ classNames('NotificationIcon', 'Left') }
                     src={ props.connectionStatus ? wifiIcon : noWifiIcon }
                     alt="connection-icon"/>
            </div>

            <div className='Root' onClick={ setWebcamIssue }
                 style={ { top: webcamIssueIconPosition.top, left: webcamIssueIconPosition.left } }>
                <text className={ classNames('NotificationIcon', 'Right') }> webCam Issue</text>
                <img className={ classNames('NotificationIcon', 'Left') }
                     src={ props.isCannotConnectCamera ? noVideoIcon : videoIcon }
                     alt="connection-icon"/>
            </div>
        </div>
    )
};

export default StatusGroup
