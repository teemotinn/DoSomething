import { Button, Card, CardContent, Hidden, IconButton, Typography } from '@mui/material'
import containerStyles from '../../../common/components/container.module.scss'
import ActivityIcon from './ActivityIcon'
import { NOT_AVAILABLE_INFORMATION } from '../../../common/common'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { Activity } from '../structure/model'
import OptionDialog from '../../../common/components/OptionDialog'
import { useState } from 'react'

type Props = {
  activity: Activity
  onDelete?: (key: string) => void
  onAdd?: () => void
}

const ActivityCard = (props: Props) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  return (
    <div>
      <Card className={containerStyles.cardList}>
        <CardContent className={containerStyles.rowSpaceBetween}>
          <div className={containerStyles.row}>
            <ActivityIcon className={containerStyles.leftCardIcon} type={props.activity.type} />
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
                <Button type='button' variant='contained' onClick={() => setIsDialogVisible(true)}>
                  Delete
                </Button>
              </Hidden>
              <Hidden smUp>
                <IconButton onClick={() => setIsDialogVisible(true)}>
                  <DeleteIcon />
                </IconButton>
              </Hidden>
            </div>
          }
        </CardContent>
      </Card>
      <OptionDialog
        isVisible={isDialogVisible}
        title={'Delete Activity'}
        description={'Are you sure you want to delete this activity?'}
        secondaryButtonText={'No, cancel'}
        onSecondaryButtonClick={() => setIsDialogVisible(false)}
        primaryButtonText={'Yes, delete'}
        onPrimaryButtonClick={() => { props.onDelete?.(props.activity.key); setIsDialogVisible(false) }}
      />
    </div>
  )
}

export default ActivityCard
