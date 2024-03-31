import React, { useState, useEffect } from 'react';
import User from './Assets/User';
import YesCookies from './Assets/yesCookies';

function Online() {

    return (
        <div>
            {data === 'empty' ? <User /> : <YesCookies />}
        </div>
    );
}

export default Online;
