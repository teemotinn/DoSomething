import { useCallback, useEffect, useMemo, useState } from 'react'
import { Activity } from './features/Activities/model'
import Navigation from './navigation/Navigation'
import { AppContext } from './context/AppContext'
import { User } from './features/User/model'

function App() {
  const [storedUsers, setStoredUsers] = useState<User[]>([])
  const [loggedUser, setLoggedUser] = useState<User>()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const storedUsers = localStorage.getItem('storedUsers');
    const loggedUser = localStorage.getItem('loggedUser');

    if (loggedUser && loggedUser !== 'undefined') {
      setLoggedUser(JSON.parse(loggedUser) as User);
    }

    if (storedUsers && storedUsers !== '[]') {
      setStoredUsers(JSON.parse(storedUsers) as User[]);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('storedUsers', JSON.stringify(storedUsers))
  }, [storedUsers])

  useEffect(() => {
    localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
  }, [loggedUser])

  const signUp = useCallback((user: User) => {
    setStoredUsers((prevUsers) => [...prevUsers, user])
  }, [])

  const login = useCallback((user: User) => {
    setLoggedUser(user)
  }, [])

  const logout = useCallback(() => {
    setLoggedUser(undefined)
  }, [])

  useEffect(() => {
    const storedActivities = localStorage.getItem('activities')
    if (storedActivities && storedActivities !== '[]') {
      setActivities((prevActivities) => [...prevActivities, ...JSON.parse(storedActivities) as Activity[]])
    }
  }, [])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'activities' && typeof event.newValue === 'string') {
        const updatedActivities: Activity[] = event.newValue ? JSON.parse(event.newValue) as Activity[] : []
        setActivities(updatedActivities)
      }
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(activities))
  }, [activities])

  const addActivity = useCallback((activity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, activity])
  }, [])


  const removeActivity = useCallback((key: string) => {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity.key !== key))
  }, [])

  const cleanActivities = useCallback(() => {
    setActivities([])
  }, [])

  const contextValue = useMemo(() => (
    { storedUsers, loggedUser, signUp, login, logout, activities, addActivity, removeActivity, cleanActivities }),
    [storedUsers, loggedUser, signUp, login, logout, activities, addActivity, removeActivity, cleanActivities])

  return (
    <>
      <div>
        <AppContext.Provider value={contextValue}>
          <Navigation />
        </AppContext.Provider>
      </div>
    </>
  )
}

export default App
