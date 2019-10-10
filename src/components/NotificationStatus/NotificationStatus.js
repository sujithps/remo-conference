import React from "react";
import './Notification.scss';
import Loading from '../Loading'
import Error from '../Error'

export default function NotificationStatus({ loading, pushNotificationSupported, userConsent, error }) {
    function renderStatus() {
        return <div>
            <p>Push notification are NOT supported by your device.</p>
            <p>User consent to receive push notifications is <strong>{ userConsent }</strong>.</p>
        </div>
    }

    return (
        <div>
            <Loading loading={ loading }/>

            { !pushNotificationSupported && renderStatus() }

            <Error error={ error }/>

        </div>
    );
}