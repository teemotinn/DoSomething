import { Button, Card, CardContent, Hidden, IconButton, Typography } from '@mui/material'
import { Activity } from './model'
import containerStyles from '../../components/container.module.scss'
import iconStyles from '../../components/icon.module.scss'
import ActivityIcon from './ActivityIcon'
import { NOT_AVAILABLE_INFORMATION } from '../../common/common'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add';

type Props = {
  activity: Activity;
  onDelete?: (key: string) => void;
  onAdd?: () => void
}

const ActivityCard = (props: Props) => {
  return (
    <Card className={containerStyles.cardListContainer}>
      <CardContent className={containerStyles.rowSpaceBetweenContainer}>
        <div className={containerStyles.rowContainer}>
          <ActivityIcon className={iconStyles.leftCardIcon} type={props.activity.type} />
          <div>
            <Typography variant="h5" component="div">
              {props.activity.activity ?? NOT_AVAILABLE_INFORMATION}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Type: {props.activity.type ?? NOT_AVAILABLE_INFORMATION}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Participants: {props.activity.participants ?? NOT_AVAILABLE_INFORMATION}
            </Typography>
          </div>
        </div>
        {props.onAdd &&
          <div>
            <Hidden smDown>
              <Button type='button' variant='contained' onClick={() => props.onAdd?.()}>
                Add to list
              </Button>
            </Hidden>
            <Hidden smUp>
              <IconButton onClick={() => props.onAdd?.()}>
                <AddIcon />
              </IconButton>
            </Hidden>
          </div>
        }
        {props.onDelete &&
          <div>
            <Hidden smDown>
              <Button type='button' variant='contained' onClick={() => props.onDelete?.(props.activity.key)}>
                Delete
              </Button>
            </Hidden>
            <Hidden smUp>
              <IconButton onClick={() => { props.onDelete?.(props.activity.key) }}>
                <DeleteIcon />
              </IconButton>
            </Hidden>
          </div>
        }
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
