import { useState, useEffect } from "react";
import http from "./Http";

import {
    isPushNotificationSupported,
    askUserPermission,
    registerServiceWorker,
    createNotificationSubscription,
    getUserSubscription
} from "./PushNotifications";

const pushNotificationSupported = isPushNotificationSupported();
//first thing to do: check if the push notifications are supported by the browser

export default function UsePushNotifications() {
    const [ userConsent, setUserConsent ] = useState(Notification.permission);
    //to manage the user consent: NotificationStatus.permission is a JavaScript native function that return the current state of the permission
    //We initialize the userConsent with that value
    const [ userSubscription, setUserSubscription ] = useState(null);
    //to manage the use push notification subscription
    const [ pushServerSubscriptionId, setPushServerSubscriptionId ] = useState();
    //to manage the push server subscription
    const [ error, setError ] = useState(null);
    //to manage errors
    const [ loading, setLoading ] = useState(true);
    //to manage async actions

    useEffect(() => {
        if (pushNotificationSupported) {
            setLoading(true);
            setError(false);

            registerServiceWorker().then(function (registration) {
                console.log('Service worker registration succeeded:', registration);
                setLoading(false);
            }, function (error) {
                console.error(error)
                console.log('Service worker registration failed:', error);
            });

        }
    }, []);
    //if the push notifications are supported, registers the service worker
    //this effect runs only the first render

    useEffect(() => {
        setLoading(true);
        setError(false);
        const getExistingSubscription = async () => {
            const existingSubscription = await getUserSubscription();
            setUserSubscription(existingSubscription);
            setLoading(false);
        };
        getExistingSubscription();
    }, []);
    //Retrieve if there is any push notification subscription for the registered service worker
    // this use effect runs only in the first render

    /**
     * define a click handler that asks the user permission,
     * it uses the setUserConsent state, to set the consent of the user
     * If the user denies the consent, an error is created with the setError hook
     */
    async function onClickAskUserPermission() {
        setLoading(true);
        setError(false);
        askUserPermission().then(consent => {
            setUserConsent(consent);
            if (consent !== "granted") {
                setError({
                    name: "Consent denied",
                    message: "You denied the consent to receive notifications",
                    code: 0
                });
            }
            setLoading(false);
        });
    };

    //

    /**
     * define a click handler that creates a push notification subscription.
     * Once the subscription is created, it uses the setUserSubscription hook
     */
    async function onClickSubscribeToPushNotification() {
        setLoading(true);
        setError(false);
        createNotificationSubscription()
            .then(function (subscription) {
                setUserSubscription(subscription);
                setLoading(false);
            })
            .catch(err => {
                console.error("Couldn't create the notification subscription", err, "name:", err.name, "message:", err.message, "code:", err.code);
                setError(err);
                setLoading(false);
            });
    };

    /**
     * define a click handler that sends the push susbcribtion to the push server.
     * Once the subscription ics created on the server, it saves the id using the hook setPushServerSubscriptionId
     */
    async function onClickSendSubscriptionToPushServer() {
        setLoading(true);
        setError(false);
        http
            .post("/subscription", userSubscription)
            .then(function (response) {
                setPushServerSubscriptionId(response.id);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                setError(err);
            });
    };

    /**
     * define a click handler that requests the push server to send a notification, passing the id of the saved subscription
     */
    const onClickSendNotification = async ({ title }) => {
        setLoading(true);
        setError(false);
        await http.get(`/subscription/${pushServerSubscriptionId}?title=${title}&url=url`).catch(err => {
            setLoading(false);
            setError(err);
        });
        setLoading(false);
    };

    /**
     * returns all the stuff needed by a Component
     */
    return {
        onClickAskUserPermission,
        onClickSubscribeToPushNotification,
        onClickSendSubscriptionToPushServer,
        pushServerSubscriptionId,
        onClickSendNotification,
        userConsent,
        pushNotificationSupported,
        userSubscription,
        error,
        loading
    };
}