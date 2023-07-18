import { createContext } from 'react';
import { User } from '../features/User/structure/model';
import { Activity } from '../features/Activities/structure/model';

interface AppContextProps {
    storedUsers: User[];
    loggedUser: User | undefined;
    signUp: (user: User) => void;
    login: (user: User) => void,
    logout: () => void;
    activities: Activity[];
    addActivity: (activity: Activity) => void;
    removeActivity: (key: string) => void;
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
};

export const AppContext = createContext<AppContextProps>(initialContext);