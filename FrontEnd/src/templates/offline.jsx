import React from 'react';

function Online() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    };

    const contentStyle = {
        textAlign: 'center',
        fontSize : '20px',
        fontWeight : 'bolder'
    };

    const textStyle = {
        padding:'10px 12px'
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <div className='text-light bg-danger'>
                    <p style={textStyle}>Server is Offline, Please try again later :(</p>
                </div>
            </div>
        </div>
    );
}

export default Online;
