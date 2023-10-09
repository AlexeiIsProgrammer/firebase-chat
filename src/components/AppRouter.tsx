import {Navigate, Route, Routes} from "react-router";
import {privateRoutes, publicRoutes} from "../routes";
import AuthRoute from "./auth-route";
import PublicRoute from "./public-route";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../constants";
import {getAuth} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

const AppRouter = () => {
    const [user] = useAuthState(getAuth());
    return (
        <Routes>
            {user ? (
                <>
                    <Route element={<AuthRoute />}>
                        {privateRoutes.map(({path, Component}) => (
                            <Route
                                key={path}
                                path={path}
                                Component={Component}
                            />
                        ))}
                    </Route>
                    <Route
                        path="/*"
                        element={<Navigate to={CHAT_ROUTE} />}
                    />
                </>
            ) : (
                <>
                    <Route element={<PublicRoute />}>
                        {publicRoutes.map(({path, Component}) => (
                            <Route
                                key={path}
                                path={path}
                                Component={Component}
                            />
                        ))}
                    </Route>
                    <Route
                        path="/*"
                        element={<Navigate to={LOGIN_ROUTE} />}
                    />
                </>
            )}
        </Routes>
    );
};

export default AppRouter;
