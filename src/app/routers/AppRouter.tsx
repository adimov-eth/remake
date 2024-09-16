import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { initNavigator } from '@telegram-apps/sdk-react';
import { useIntegration } from '@telegram-apps/react-router-integration';

import {
    Accelerators,
    Friends,
    Home,
    Missions,
    Profile,
    Settings,
    Swap,
} from '@/pages';

export const AppRouter = () => {
    const navigator = initNavigator('app-navigation-state');
    const [location, reactNavigator] = useIntegration(navigator);

    return (
        <Router location={location} navigator={reactNavigator}>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="friends" Component={Friends} />
                <Route path="/accelerators" Component={Accelerators} />
                <Route path="/missions" Component={Missions} />
                <Route path="/swap" Component={Swap} />
                <Route path="/profile" Component={Profile} />
                <Route path="/settings" Component={Settings} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
};
