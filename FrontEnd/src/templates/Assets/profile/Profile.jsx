import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom';

function Profile(props) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <button onClick={handleGoBack}>Go Back</button>
            <h1>this is profile section</h1>
        </div>
    );
};

Profile.propTypes = {

}

export default Profile

