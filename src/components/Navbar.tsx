import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../constants";

import {getAuth, signOut} from "@firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
export default function NavBar() {
    const [user] = useAuthState(getAuth());
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                color={"secondary"}
                position="static">
                <Toolbar variant={"dense"}>
                    <Grid
                        container
                        justifyContent={"flex-end"}>
                        {user ? (
                            <Button
                                onClick={() => signOut(getAuth())}
                                variant={"outlined"}>
                                Exit
                            </Button>
                        ) : (
                            <NavLink to={LOGIN_ROUTE}>
                                <Button variant={"outlined"}>Login</Button>
                            </NavLink>
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
