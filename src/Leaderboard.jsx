import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const apiUrl = 'https://jsonplaceholder.typicode.com/users';

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        if (value) {
            const match = users.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
            setSuggestions(match.map(user => user.name));
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = () => {
        if (search) {
            const filtered = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
            setFilteredUsers(filtered);
        } else {
            setFilteredUsers([]);
        }
        setSuggestions([]); // Clear suggestions after search
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="leaderboard">
            <h1>Leaderboard</h1>
            <input 
                type="text" 
                value={search}
                onChange={handleSearchChange}
                placeholder="Search by name"
            />
            <button onClick={handleSearch}>Search</button>
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} onClick={() => {
                            setSearch(suggestion);
                            handleSearch();
                        }}>
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
            {filteredUsers.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Leaderboard;
