import React from 'react';
import './Loading.scss'

export default function Loading({ loading }) {
    return <div className="AppLoader">
        { loading ? "Please wait, checking for notification support..." : "" }
    </div>;
}