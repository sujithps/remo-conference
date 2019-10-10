import React from 'react'
import Avatar from './components/Avatar'
import conferenceImg from './assets/images/conference.svg'
import Table from './components/Table'
import './App.scss';

export const renderHall = (tableProps, onClick) => {
    return tableProps.map((tableProps, index) => {
        return (
            <Table
                onClick={ onClick }
                key={ index }
                { ...tableProps }
            />
        )
    })
}

export const App = () => {
    const [ userPosition, setUserPosition ] = React.useState({ top: '330px', left: '415px' })
    const [ connectionStatus, setConnectionStatus ] = React.useState('STRONG')
    const [ isCannotConnectCamera, setIsCannotConnectCamera ] = React.useState(false)
    const [ isSharingScreen, setSharingScreen ] = React.useState(false)

    const tableProps = [
        {
            tableName: 'show join notification',
            position: {
                top: '600px',
                left: '720px',
            }

        },
        {
            tableName: 'show left notification',
            position: {
                top: '863px',
                left: '720px',
            }
        },
        {
            tableName: 'notification when connection low',
            position: {
                top: '1125px',
                left: '720px',
            }

        },
        {
            tableName: 'notification when connection middle',
            position: {
                top: '600px',
                left: '975px',
            }

        },
        {
            tableName: 'When connection strong',
            position: {
                top: '863px',
                left: '975px',
            }

        },
        {
            tableName: 'notification when cannot connect to camera strong',
            position: {
                top: '1125px',
                left: '975px',
            }

        },
        {
            tableName: 'share screen notification',
            position: {
                top: '600px',
                left: '1232px',
            }

        },
        {
            tableName: 'turn off share screen notification',
            position: {
                top: '863px',
                left: '1232px',
            }

        }
    ]

    return (
        <div className='Root'>
            <div className='ConferenceTable'>
                { renderHall(tableProps, setUserPosition) }
                <img className='ConferenceImg' src={ conferenceImg } alt="conference"/>
                <Avatar
                    isCannotConnectCamera={ isCannotConnectCamera }
                    connectionStatus={ connectionStatus }
                    position={ { top: userPosition.top, left: userPosition.left } }
                />
            </div>
            <div>
            </div>
        </div>
    );
}

export default App;
