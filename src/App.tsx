import { useCallback, useMemo, useState } from 'react';
import { Activity } from './features/Activities/model';
import Navigation from './navigation/Navigation'
import { ActivityContext } from './context/ActivityContext';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = useCallback((activity: Activity) => {
    setActivities((prevActivities) => [...prevActivities, activity]);
  }, []);

  const removeActivity = useCallback((key: string) => {
    setActivities((prevActivities) => prevActivities.filter((activity) => activity.key !== key));
  }, []);

  const cleanActivities = useCallback(() => {
    setActivities([]);
  }, []);

  const contextValue = useMemo(() => ({ activities, addActivity, removeActivity, cleanActivities }),
    [activities, addActivity, removeActivity, cleanActivities]);

  return (
    <>
      <div>
        <ActivityContext.Provider value={contextValue}>
          <Navigation />
        </ActivityContext.Provider>
      </div>
    </>
  )
}

export default App
