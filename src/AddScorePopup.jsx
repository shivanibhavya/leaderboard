import React, { useState } from 'react';

const AddScorePopup = ({ addScore }) => {
    const [username, setUsername] = useState('');
    const [score, setScore] = useState('');
    const [error, setError] = useState('');

    const isValidScore = (score) => {
        return /^\d{2}:\d{2}::\d{3}$/.test(score);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValidScore(score)) {
            setError('Invalid score format. Correct format is MM:SS::MSS.');
            return;
        }
        addScore({ username, score });
        setUsername('');
        setScore('');
        setError('');  
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>Score (MM:SS::MSS):
                <input type="text" value={score} onChange={(e) => setScore(e.target.value)} />
            </label>
            <button type="submit">Add Score</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default AddScorePopup;
