import React, {useState} from 'react';
import {Box, Button, TextField, Stack} from "@mui/material";
import CvContext from "./Components/contexts/cv_context";
import Header from "./Components/header";
import ContactInfo from "./Components/contact_info";
import Section from "./Components/section.js";


//The main app component, which contains the CV JSON file, and which contains the base of the code to ask for the sections
function App() {

    //The state of the CV
    const [cv, setCv] = useState({
        header: {},
        left_sections: [],
        right_sections: [],
        contact_info: {}
    });

    //The API url, which will be used to fetch the CV JSON file later.
    const api_url = "http://127.0.0.1:8000/display_cv";

    //Calling the API (test)
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
