import { useContext } from 'react'
import ActivityCard from '../components/ActivityCard'
import { AppContext } from '../../../context/AppContext'
import Header from '../../../common/components/Header'
import { Link, Typography } from '@mui/material'
import containerStyles from '../../../common/components/container.module.scss'
import { PATHS } from '../../../navigation/Paths'

const ActivitiesList = () => {
    const { activities, removeActivity } = useContext(AppContext);

    return (
        <div>
            <Header />
            <div className={containerStyles.internal}>
                <div className={containerStyles.title}>
                    <Typography variant="h3">
                        Activities to do
                    </Typography>
                </div>
                {activities.length < 1 &&
                    <Typography variant="h6" color="text.secondary">
                        This is very empty! <Link href={PATHS.HOME}>Add an activity</Link>
                    </Typography>

                }
                {activities.map((activity) => (
                    <ActivityCard key={activity.key} activity={activity} onDelete={removeActivity} />
                ))}
            </div>
        </div>
    );
};

export default ActivitiesList;
