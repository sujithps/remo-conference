import React from 'react'
import './Table.scss'

export const Table = ({ tableName, position, onClick }) => {
    return (
        <div onClick={ onClick } className='Root'
             style={ { top: position.top, left: position.left } }>
            <div onClick={ onClick } className='TableName'>{ tableName }</div>
        </div>
    )
}

export default Table