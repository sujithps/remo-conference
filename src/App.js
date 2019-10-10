import React from 'react'
import conferenceImg from './assets/images/conference.svg'
import Table from './components/Table'
import Avatar from './components/Avatar'
import './App.scss';

const leftStartPoint = 600;
const topStartPoint = 720;
const tableWidth = 255;
const tableHeight = 255;
const totalColumns = 5;
const totalRows = 3;

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            avatarPosition: { top: '330px', left: '415px' }
        };
    }

    renderHall = () => {
        const tables = Array.from({ length: totalColumns }, (cItem, cIndex) => {
            return Array.from({ length: totalRows }, (rItem, rIndex) => {
                    return {
                        tableLabel: this.getNumberWithOrdinal((cIndex * totalRows) + rIndex + 1) + " Table",
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
                    moveUser={ this.moveUser }
                    { ...tableProps }
                />
            )
        })
    }

    moveUser = (position) => {
        this.setState({ avatarPosition: position })
    }


    getNumberWithOrdinal = (n) => {
        var s = [ "th", "st", "nd", "rd" ],
            v = n % 100;
        return n + (s[ (v - 20) % 10 ] || s[ v ] || s[ 0 ]);
    }

    render() {
        return (
            <div className='Root'>
                <div className='ConferenceTable'>
                    { this.renderHall() }
                    <img className='ConferenceImg' src={ conferenceImg } alt="conference hall"/>
                    <Avatar
                        position={ this.state.avatarPosition }
                    />
                </div>
                <div>
                </div>
            </div>
        );
    }
}

export default App;
