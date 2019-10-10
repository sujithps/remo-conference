import React, { useEffect } from "react";
import UsePushNotifications from "../../services/UsePushNotifications";
import './Notification.scss';

const Loading = ({ loading }) => (loading ?
    <div className="AppLoader">Please wait, checking for notification support...</div> : null);
const Error = ({ error }) =>
    error ? (
        <section className="app-error">
            <h2>{ error.name }</h2>
            <p>Error message : { error.message }</p>
            <p>Error code : { error.code }</p>
        </section>
    ) : null;

export default function Notification() {
    const {
        userConsent,
        pushNotificationSupported,
        userSubscription,
        onClickAskUserPermission,
        onClickSubscribeToPushNotification,
        onClickSendSubscriptionToPushServer,
        pushServerSubscriptionId,
        onClickSendNotification,
        error,
        loading
    } = UsePushNotifications();

    useEffect(() => {
        async function askForPermission() {
            if (!isConsentGranted) {
                await onClickAskUserPermission();
            }

            if (pushNotificationSupported && isConsentGranted && !userSubscription) {
                await onClickSubscribeToPushNotification()
            }

            if (userSubscription && !pushServerSubscriptionId) {
                await onClickSendSubscriptionToPushServer()
            }
        }

        askForPermission();
    });

    const isConsentGranted = userConsent === "granted";

    return (
        <div>
            <Loading loading={ loading }/>

            <p>Push notification are { !pushNotificationSupported && "NOT" } supported by your device.</p>

            <p>
                User consent to receive push notifications is <strong>{ userConsent }</strong>.
            </p>

            <Error error={ error }/>

            { pushServerSubscriptionId && (
                <div>
                    <p>The server accepted the push subscription!</p>
                    <button onClick={ onClickSendNotification }>Send a notification</button>
                </div>
            ) }

        </div>
    );
}