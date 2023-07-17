import { createContext } from 'react';
import { Activity } from '../features/Activities/model';

interface ActivityContextProps {
    activities: Activity[];
    addActivity: (activity: Activity) => void;
    removeActivity: (key: string) => void;
    cleanActivities: () => void;
}

const initialContext: ActivityContextProps = {
    activities: [],
    addActivity: () => {},
    removeActivity: () => {},
    cleanActivities: () => {},
};

export const ActivityContext = createContext<ActivityContextProps>(initialContext);