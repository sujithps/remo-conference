import React from 'react'
import conferenceImg from './assets/images/conference.svg'
import Table from './components/Table'
import Avatar from './components/Avatar'
import './App.scss';

export const renderHall = () => {
    const leftStartPoint = 600;
    const topStartPoint = 720;
    const tableWidth = 255;
    const tableHeight = 255;
    const totalColumns = 5;
    const totalRows = 3;

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
                { ...tableProps }
            />
        )
    })
}


function getNumberWithOrdinal(n) {
    var s = [ "th", "st", "nd", "rd" ],
        v = n % 100;
    return n + (s[ (v - 20) % 10 ] || s[ v ] || s[ 0 ]);
}

export const App = () => {
    const [ userPosition, setUserPosition ] = React.useState({ top: '330px', left: '415px' })

    return (
        <div className='Root'>
            <div className='ConferenceTable'>
                { renderHall() }
                <img className='ConferenceImg' src={ conferenceImg } alt="conference hall"/>
                <Avatar
                    position={ { top: userPosition.top, left: userPosition.left } }
                />
            </div>
            <div>
            </div>
        </div>
    );
}

export default App;
