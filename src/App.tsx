import { useCallback, useEffect, useMemo, useState } from 'react'
import Navigation from './navigation/Navigation'
import { AppContext } from './context/AppContext'
import { User } from './features/User/structure/model'
import { Activity } from './features/Activities/structure/model'

function App() {
  const [storedUsers, setStoredUsers] = useState<User[]>([])
  const [loggedUser, setLoggedUser] = useState<User>()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const storedUsers = localStorage.getItem('storedUsers')
    const loggedUser = localStorage.getItem('loggedUser')

    if (loggedUser && loggedUser !== 'undefined') {
      setLoggedUser(JSON.parse(loggedUser) as User)
    }

    if (storedUsers && storedUsers !== '[]') {
      setStoredUsers(JSON.parse(storedUsers) as User[])
    }
  }, [])

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
    setActivities([])
  }, [])

  useEffect(() => {
    if (loggedUser?.email) {
      const storedActivities = localStorage.getItem('activities' + loggedUser.email)
      if (storedActivities !== null && storedActivities !== '[]') {
        setActivities((prevActivities) => [...prevActivities, ...JSON.parse(storedActivities) as Activity[]])
      }
    }
  }, [loggedUser?.email])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (loggedUser?.email) {
        if (event.key === ('activities' + loggedUser.email)) {
          const updatedActivities: Activity[] = (event.newValue && event.newValue !== '[]') ? JSON.parse(event.newValue) as Activity[] : []
          setActivities(updatedActivities)
        }
      }
      if (event.key === 'loggedUser') {
        const updatedUser: User | undefined = (event.newValue && event.newValue !== 'undefined') ? JSON.parse(event.newValue) as User : undefined
        setLoggedUser(updatedUser)
        !updatedUser && logout()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [loggedUser, loggedUser?.email, logout])

  useEffect(() => {
    if (loggedUser?.email) {
      localStorage.setItem('activities' + loggedUser?.email, JSON.stringify(activities))
    }
  }, [activities, loggedUser?.email])

  const addActivity = useCallback((activity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, activity])
  }, [])

  const removeActivity = useCallback((key: string) => {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity.key !== key))
  }, [])

  const contextValue = useMemo(() => (
    { storedUsers, loggedUser, signUp, login, logout, activities, addActivity, removeActivity }),
    [storedUsers, loggedUser, signUp, login, logout, activities, addActivity, removeActivity])

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
