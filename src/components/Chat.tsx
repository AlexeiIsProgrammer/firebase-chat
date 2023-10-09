import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import React, {useState} from "react";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, query, orderBy, addDoc, Timestamp, DocumentData, getDocs} from "firebase/firestore";
import Loader from "./Loader";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "@firebase/auth";
import {db} from "..";
import {Box} from "@mui/system";

const Chat = () => {
    const [value, setValue] = useState("");
    const [user] = useAuthState(getAuth());
    const collectionMessages = collection(db, "messages");
    const [messages, loading] = useCollectionData(query(collectionMessages, orderBy("createdAt")));

    const sendMessage = async () => {
        await addDoc(collectionMessages, {
            uid: user?.uid || "",
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
            text: value || "",
            createdAt: Timestamp.now(),
        });

        setValue("");
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <Grid
                container
                style={{height: window.innerHeight - 50, marginTop: 20}}
                justifyContent={"center"}>
                <div style={{width: "80%", height: "60vh", border: "1px solid gray", overflowY: "auto"}}>
                    {messages &&
                        messages.map((message: DocumentData) => (
                            <div
                                key={message.createdAt}
                                style={{
                                    margin: 10,
                                    border: user?.uid === message.uid ? "2px solid green" : "2px dashed red",
                                    width: "fit-content",
                                    padding: "5px",
                                    marginLeft: user?.uid === message.uid ? "auto" : "10px",
                                }}>
                                <Grid
                                    container
                                    gap={2}>
                                    <Avatar src={message.photoURL} />
                                    <div>{message.displayName}</div>
                                </Grid>
                                <div style={{marginTop: "20px"}}>{message.text}</div>
                            </div>
                        ))}
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"flex-end"}
                    style={{width: "80%"}}>
                    <TextField
                        fullWidth
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                        maxRows={2}
                        variant={"outlined"}></TextField>
                    <Button
                        onClick={sendMessage}
                        variant={"outlined"}>
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
