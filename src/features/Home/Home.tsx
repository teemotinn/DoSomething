import React, { useEffect, useState } from 'react';
import { User } from '../User/models';
import Header from '../../components/Header';

const Home: React.FC = () => {
    const [user, setUser] = useState<User | undefined>();
    const [isLoadingActivity, setIsLoadingActivity] = useState(false)
    const [activity, setActivity] = useState('')

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
            const parsedUser = JSON.parse(storedUser) as User;
            setUser(parsedUser);
        }
        getApiData()
    }, []);

    return (
        <div>
            <Header title={'DS!'} />
            <h2>Welcome, {user?.name ?? '-'}!</h2>
            <p>Age: {user?.age ?? '-'}</p>
            <p>Activity to do: {isLoadingActivity ? 'Loading...' : activity}</p>
        </div>
    );
};

export default Home;
