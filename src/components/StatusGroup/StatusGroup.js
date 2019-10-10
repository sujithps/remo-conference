import React from 'react'
import classNames from 'classnames'
import connectionIcon from '../../assets/images/connectionIcon.svg'
import cameraIcon from '../../assets/images/cameraIcon.svg'

import './StatusGroup.scss'

export const StatusGroup = (props) => {

    function setConnectionIssue() {
        props.setConnectionIssue()
    }

    function setWebcamIssue() {
        props.setWebcamIssue()
    }


    const connectionIssueIconPosition = { top: '350px', left: '500px' }
    const webcamIssueIconPosition = { top: '350px', left: '650px' }
    return (
        <div>
            <div className='Root' onClick={ setConnectionIssue }
                 style={ { top: connectionIssueIconPosition.top, left: connectionIssueIconPosition.left } }>
                <text> Connection Issue</text>
                <img className={ classNames('NotificationIcon', 'Left') } src={ connectionIcon }
                     alt="connection-icon"/>
            </div>

            <div className='Root' onClick={ setWebcamIssue }
                 style={ { top: webcamIssueIconPosition.top, left: webcamIssueIconPosition.left } }>
                <text> webCam Issue</text>
                <img className={ classNames('NotificationIcon', 'Left') } src={ cameraIcon }
                     alt="connection-icon"/>
            </div>
        </div>
    )
};

export default StatusGroup
