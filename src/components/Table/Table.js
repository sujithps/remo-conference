import React from 'react'
import './Table.scss'

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableLabel: props.tableLabel,
            position: props.position,
        }
    }

    moveUserToThisTable = () => {
        this.props.moveUser(this.props.position, this.state.tableLabel)
    }

    render = () => {
        return (
            <div onClick={ this.moveUserToThisTable } className='Root'
                 style={ { top: this.state.position.top, left: this.state.position.left } }>
                <div className='TableLabel'>{ this.state.tableLabel }</div>
            </div>
        )
    }
}

export default Table