import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [user, setUser] = useState(null);
    const [isLoadingActivity, setIsLoadingActivity] = useState(false)
    const [activity, setActivity] = useState('')
    const navigate = useNavigate();

    const getApiData = async () => {
        setIsLoadingActivity(true)
        await fetch("http://www.boredapi.com/api/activity/")
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                setActivity(response.activity)
            });
        setIsLoadingActivity(false)
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
        }
        getApiData()
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login');
    };

    return (
        <div>
            <h2>Welcome, {user?.name}!</h2>
            <p>Age: {user?.age}</p>
            <p>Activity to do: {isLoadingActivity ? 'Cargando...' : activity}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
