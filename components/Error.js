import React from 'react';

const Error = ({ message }) => {
    return (
        <div className="error-message">
            {message || 'An error occurred'}
        </div>
    );
};

export default Error;
