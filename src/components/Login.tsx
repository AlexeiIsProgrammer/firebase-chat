import {Button, Grid, Box, Container} from "@mui/material";

import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";

const Login = () => {
    const login = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const {user} = await signInWithPopup(auth, provider);
        console.log(user);
    };

    return (
        <Container>
            <Grid
                container
                style={{height: window.innerHeight - 50}}
                alignItems={"center"}
                justifyContent={"center"}>
                <Grid
                    style={{width: 400, background: "lightgray"}}
                    container
                    alignItems={"center"}
                    direction={"column"}>
                    <Box p={5}>
                        <Button
                            variant={"outlined"}
                            onClick={login}>
                            Login with google
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
