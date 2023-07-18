import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import { cancelGetActivity, getActivity } from '../Activities/service'
import { Activity } from '../Activities/model'
import { FailureResponse } from '../../connection/FailureResponse'
import ActivityCard from '../Activities/ActivityCard'
import containerStyles from '../../components/container.module.scss'
import { Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import { AppContext } from '../../context/AppContext'

const Home: React.FC = () => {
    const {loggedUser, activities, addActivity } = useContext(AppContext)
    const [isLoadingActivity, setIsLoadingActivity] = useState<boolean>(false)
    const [apiResponse, setApiResponse] = useState<Activity | FailureResponse>()

    const fetchData = async () => {
        setIsLoadingActivity(true)
        await getActivity().then(response => setApiResponse(response))
        setIsLoadingActivity(false)
    }

    useEffect(() => {
        fetchData().catch(console.error)
    }, [activities])

    useEffect(() => {
        fetchData().catch(console.error);

        return () => {
            cancelGetActivity()
        };
    }, []);

    const handleAddActivity = () => {
        apiResponse instanceof Activity && addActivity(apiResponse)
    }

    const showContent = () => {
        return (
            apiResponse instanceof Activity
                ? <ActivityCard activity={apiResponse} onAdd={handleAddActivity} />
                : <p>
                    {apiResponse?.error}
                </p>
        )
    }

    return (
        <div>
            <Header />
            <div className={containerStyles.internalContainer}>
                <Typography variant="h3">
                    Welcome, {loggedUser?.name ?? '-'}!
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Age: {loggedUser?.age ?? '-'}
                </Typography>
                <div className={containerStyles.secondaryTitleContainer}>
                    <div className={containerStyles.rowContainer}>
                        <Typography variant="h4">
                            Activity available
                        </Typography>
                        <IconButton onClick={() => { fetchData().catch(console.error) }}>
                            <RefreshIcon />
                        </IconButton>
                    </div>
                </div>
                {isLoadingActivity
                    ? <p>Loading...</p>
                    : showContent()
                }
            </div>
        </div>
    );
};

export default Home;
