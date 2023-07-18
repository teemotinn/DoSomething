import { useContext } from 'react'
import ActivityCard from '../components/ActivityCard'
import { AppContext } from '../../../context/AppContext'
import Header from '../../../common/components/Header'
import { Typography } from '@mui/material'
import containerStyles from '../../../common/components/container.module.scss'

const ActivitiesList = () => {
    const { activities, removeActivity } = useContext(AppContext);

    return (
        <div>
            <Header />
            <div className={containerStyles.internal}>
                <div className={containerStyles.title}>
                    <Typography variant="h3">
                        List of activities
                    </Typography>
                </div>
                {activities.map((activity) => (
                    <ActivityCard key={activity.key} activity={activity} onDelete={removeActivity} />
                ))}
            </div>
        </div>
    );
};

export default ActivitiesList;
