import React, {useState} from 'react';
import {Box, Button, TextField, Stack} from "@mui/material";
import CvContext from "./Components/contexts/cv_context";
import Header from "./Components/header";
import ContactInfo from "./Components/contact_info";
import Section from "./Components/section.js";


function App() {



    const [cv, setCv] = useState({
        header: {},
        left_sections: [],
        right_sections: [],
        contact_info: {}
    });


    const api_url = "http://127.0.0.1:8000/display_cv";

    const handleSubmit = () => {
        fetch(api_url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            mode: "no-cors",
            body: JSON.stringify(cv)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
    };


    return (
        <CvContext.Provider value={[cv, setCv]}>
            <div className="App">
                <h1>CV Builder</h1>
                {/*Global container*/}
                <Box>
                    <Header/>
                    <ContactInfo/>
                    <Section/>
                </Box>
                <Button onClick={handleSubmit}>
                    Preview CV
                </Button>
                <p>
                    {JSON.stringify(cv)}
                </p>
            </div>
        </CvContext.Provider>
    );
}

export default App;
