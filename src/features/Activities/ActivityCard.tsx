import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Activity } from './model';
import containerStyles from '../../components/container.module.scss'
import iconStyles from '../../components/icon.module.scss'
import ActivityIcon from './ActivityIcon';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <Card >
      <CardContent className={containerStyles.rowContainer}>
        <ActivityIcon className={iconStyles.leftCardIcon} type={activity.type}/>
        <div>
          <Typography variant="h5" component="div">
            {activity.activity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {activity.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Participants: {activity.participants}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
