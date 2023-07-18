import React, { useContext, useEffect, useState } from 'react'
import Header from '../../common/components/Header'
import { FailureResponse } from '../../connection/FailureResponse'
import ActivityCard from '../Activities/components/ActivityCard'
import containerStyles from '../../common/components/container.module.scss'
import { Alert, Snackbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import RefreshIcon from '@mui/icons-material/Refresh'
import { AppContext } from '../../context/AppContext'
import { Activity, ActivityFilter } from '../Activities/structure/model'
import ActivityFilterForm from '../Activities/components/ActivityFilterForm'
import { ActivityService } from '../Activities/structure/service'

const Home: React.FC = () => {
    const { loggedUser, activities, addActivity } = useContext(AppContext)
    const [isLoadingActivity, setIsLoadingActivity] = useState<boolean>(false)
    const [apiResponse, setApiResponse] = useState<Activity | FailureResponse>()
    const [openToast, setOpenToast] = useState(false)
    const [filter, setFilter] = useState<ActivityFilter>()

    const fetchData = async (filter?: ActivityFilter) => {
        setIsLoadingActivity(true)
        await ActivityService.getActivity(filter).then((response: Activity | FailureResponse) => setApiResponse(response))
        setIsLoadingActivity(false)
    }

    useEffect(() => {
        fetchData(filter).catch(console.error)
    }, [activities, filter])

    useEffect(() => {
        fetchData().catch(console.error)

        return () => {
            ActivityService.cancelGetActivity()
        }
    }, [])

    const handleAddActivity = () => {
        if (apiResponse instanceof Activity) {
            addActivity(apiResponse)
            setOpenToast(true)
        }
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

    const handleCloseToast = () => {
        setOpenToast(false)
    }

    return (
        <div>
            <Header />
            <div className={containerStyles.internal}>
                <Typography variant="h3">
                    Welcome, {loggedUser?.name ?? '-'}!
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    Age: {loggedUser?.age ?? '-'}
                </Typography>
                <div className={containerStyles.secondaryTitle}>
                    <div className={containerStyles.row}>
                        <Typography variant="h4">
                            Activity available
                        </Typography>
                        <IconButton onClick={() => { fetchData().catch(console.error) }}>
                            <RefreshIcon />
                        </IconButton>
                    </div>
                </div>
                <ActivityFilterForm
                    onFilter={setFilter} />
                {isLoadingActivity
                    ? <p>Loading...</p>
                    : showContent()
                }
                <Snackbar
                    open={openToast}
                    autoHideDuration={1000}
                    onClose={handleCloseToast}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert severity="success" onClose={handleCloseToast}>
                        Activity has been added!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}

export default Home
