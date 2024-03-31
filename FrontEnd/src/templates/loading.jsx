import React from 'react';
import { useState } from 'react';

function Online(props) {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    };

    const contentStyle = {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bolder'
    };

    const textStyle = {
        padding: '10px 12px',
        fontSize:'30px'
    }

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div className='text-light'>
                    <p style={textStyle}> Loading... </p>
                    <div className="parent-load">
                        <div
                            className={`bg-warning-loading ${props.class}`}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Online;
