import React from "react";
import UsePushNotifications from "../../services/UsePushNotifications";
import './Notification.scss';

const Loading = ({ loading }) => (loading ?
    <div className="AppLoader">Please wait, we are loading something...</div> : null);
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

    const isConsentGranted = userConsent === "granted";

    return (
        <main>
            <Loading loading={ loading }/>

            <p>Push notification are { !pushNotificationSupported && "NOT" } supported by your device.</p>

            <p>
                User consent to receive push notifications is <strong>{ userConsent }</strong>.
            </p>

            <Error error={ error }/>

            <button disabled={ !pushNotificationSupported || isConsentGranted }
                    onClick={ onClickAskUserPermission }>
                { isConsentGranted ? "Consent granted" : " Ask user permission" }
            </button>

            <button disabled={ !pushNotificationSupported || !isConsentGranted || userSubscription }
                    onClick={ onClickSubscribeToPushNotification }>
                { userSubscription ? "Push subscription created" : "Create Notification subscription" }
            </button>

            <button disabled={ !userSubscription || pushServerSubscriptionId }
                    onClick={ onClickSendSubscriptionToPushServer }>
                { pushServerSubscriptionId ? "Subscription sent to the server" : "Send subscription to push server" }
            </button>

            { pushServerSubscriptionId && (
                <div>
                    <p>The server accepted the push subscription!</p>
                    <button onClick={ onClickSendNotification }>Send a notification</button>
                </div>
            ) }

            <section>
                <h4>Your notification subscription details</h4>
                <pre>
          <code>{ JSON.stringify(userSubscription, null, " ") }</code>
        </pre>
            </section>
        </main>
    );
}