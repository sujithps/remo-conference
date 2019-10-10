import React from 'react';

export default function Error({ error }) {
    return error ? (
        <section className="app-error">
            <h2>{ error.name }</h2>
            <p>Error message : { error.message }</p>
            <p>Error code : { error.code }</p>
        </section>
    ) : null;
}