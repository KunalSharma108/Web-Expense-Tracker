import React, { useState, useEffect } from 'react';
import NoCookies from './Assets/noCookies';
import YesCookies from './Assets/yesCookies';

function Online() {
    const [data, setData] = useState('empty');

    useEffect(() => {
        const cookie = document.cookie;
        if (cookie.trim() === '') {
            setData('empty');
        } else {
            const cookieArray = cookie.split(';');
            const cookieObject = {};

            cookieArray.forEach(cookie => {
                const [key, value] = cookie.split('=');
                cookieObject[key.trim()] = value.trim();
            });

            setData(cookieObject);
        }
    }, []);

    return (
        <div>
            {data === 'empty' ? <NoCookies /> : <YesCookies />}
        </div>
    );
}

export default Online;
