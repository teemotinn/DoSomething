import { createContext } from 'react';
import { Activity } from '../features/Activities/model';
import { User } from '../features/User/model';

interface AppContextProps {
    storedUsers: User[];
    loggedUser: User | undefined;
    signUp: (user: User) => void;
    login: (user: User) => void,
    logout: () => void;
    activities: Activity[];
    addActivity: (activity: Activity) => void;
    removeActivity: (key: string) => void;
    cleanActivities: () => void;
}

const initialContext: AppContextProps = {
    storedUsers: [],
    loggedUser: undefined,
    signUp: () => { },
    login: () => { },
    logout: () => { },
    activities: [],
    addActivity: () => { },
    removeActivity: () => { },
    cleanActivities: () => { },
};

export const AppContext = createContext<AppContextProps>(initialContext);