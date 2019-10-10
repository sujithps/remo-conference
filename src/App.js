import React, { useState, useEffect } from 'react'
import conferenceImg from './assets/images/conference.svg'
import Table from './components/Table'
import Avatar from './components/Avatar'
import './App.scss';
import UsePushNotifications from "./services/UsePushNotifications";


import NotificationStatus from './components/NotificationStatus'

const leftStartPoint = 600;
const topStartPoint = 720;
const tableWidth = 255;
const tableHeight = 255;
const totalColumns = 5;
const totalRows = 3;

function App() {
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
    const [ avatarPosition, setAvatarPosition ] = useState({ top: '400px', left: '400px' });

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

    function renderHall() {
        const tables = Array.from({ length: totalColumns }, (cItem, cIndex) => {
            return Array.from({ length: totalRows }, (rItem, rIndex) => {
                    return {
                        tableLabel: getNumberWithOrdinal((cIndex * totalRows) + rIndex + 1) + " Table",
                        position: {
                            top: leftStartPoint + (rIndex * tableHeight) + 'px',
                            left: topStartPoint + (cIndex * tableWidth) + 'px',
                        }
                    }
                }
            );
        });

        return tables.flat().map((tableProps, index) => {
            return (
                <Table
                    onClick={ null }
                    key={ index }
                    moveUser={ moveUser }
                    { ...tableProps }
                />
            )
        })
    }

    function moveUser(position) {
        setAvatarPosition(position);

        if (pushServerSubscriptionId) {
            onClickSendNotification()
        } else {
            console.log("Error")
        }
    }

    function getNumberWithOrdinal(n) {
        var s = [ "th", "st", "nd", "rd" ],
            v = n % 100;
        return n + (s[ (v - 20) % 10 ] || s[ v ] || s[ 0 ]);
    }

    return (
        <div className='Root'>
            <NotificationStatus loading={ loading }
                                pushNotificationSupported={ pushNotificationSupported }
                                userConsent={ userConsent }
                                error={ error }/>

            <div className='ConferenceTable'>
                { renderHall() }
                <img className='ConferenceImg' src={ conferenceImg } alt="conference hall"/>
                <Avatar position={ avatarPosition }/>
            </div>
        </div>
    );
}

export default App;
