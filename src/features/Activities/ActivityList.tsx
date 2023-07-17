import { useContext } from 'react'
import ActivityCard from './ActivityCard'
import { ActivityContext } from '../../context/ActivityContext'
import Header from '../../components/Header'
import { Typography } from '@mui/material'
import containerStyles from '../../components/container.module.scss'

const ActivitiesList = () => {
    const { activities, removeActivity } = useContext(ActivityContext);

    return (
        <div>
            <Header />
            <div className={containerStyles.internalContainer}>
                <div className={containerStyles.titleContainer}>
                    <Typography variant="h3">
                        List of activities
                    </Typography>
                </div>
                {activities.map((activity) => (
                    <ActivityCard key={activity.key} activity={activity} onDelete={removeActivity}/>
                ))}
            </div>
        </div>
    );
};

export default ActivitiesList;