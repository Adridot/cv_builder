import './App.css';
import React, {useState} from 'react';
import {Box, Button, TextField, Stack} from "@mui/material";

function App() {


    const [web_site, setWebSite] = useState({
        name: "",
        text: "",
        url: ""
    });
    const addWebSite = () => {
        setContactInfo({
            ...contact_info, websites:
                [
                    ...contact_info.websites,
                    web_site
                ]
        });
        setWebSite({
            name: "", text: "", url: ""
        });
    };
    const removeLastWebSite = () => {
        setContactInfo({
            ...contact_info,
            websites: contact_info.websites.slice(0, -1)
        });
    };
    const clearWebSites = () => {
        setContactInfo({
            ...contact_info,
            websites: []
        });
    };

    const [contact_info, _setContactInfo] = useState({
        email: "",
        phone: "",
        address: "",
        websites: []
    });
    const setContactInfo = (contact_info) => {
        _setContactInfo(contact_info);
        setCV({...cv, contact_info: contact_info})
    };

    const [header, setHeader] = useState({
        name: "",
        description: "",
        picture: ""
    });

    const [cv, setCV] = useState({
        header: {},
        left_sections: [],
        right_sections: [],
        contact_info: contact_info
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


    return (<div className="App">
        <h1>CV Builder</h1>
        <Box>
            <TextField label="Address" multiline value={contact_info.address}
                       onChange={(e) => setContactInfo({
                           ...contact_info, address: e.target.value
                       })}
            />
            <TextField label="Phone" value={contact_info.phone}
                       onChange={(e) => setContactInfo({
                           ...contact_info, phone: e.target.value
                       })}
            />
            <TextField label="Email" value={contact_info.email}
                       onChange={(e) => setContactInfo({
                           ...contact_info, email: e.target.value
                       })}
            />
            <h3>Websites</h3>
            <Box>
                {contact_info.websites.map((web_site, index) => {
                    return (<Box key={index}>
                        <p>{`Website ${index + 1}`}</p>
                        <TextField label={"Name"} value={web_site.name}
                                   onChange={(e) => {
                                       let ci_tmp = contact_info
                                       ci_tmp.websites[index].name = e.target.value
                                       setContactInfo(ci_tmp)
                                   }}/>
                        <TextField label={"Text"} value={web_site.text}
                                   onChange={(e) => {
                                       let ci_tmp = contact_info
                                       ci_tmp.websites[index].text = e.target.value
                                       setContactInfo(ci_tmp)
                                   }}/>
                        <TextField label={"Url"} value={web_site.url}
                                   onChange={(e) => {
                                       let ci_tmp = contact_info
                                       ci_tmp.websites[index].url = e.target.value
                                       setContactInfo(ci_tmp)
                                   }}/>
                    </Box>)
                })}
                <Button onClick={addWebSite}>Add Website</Button>
                <Button onClick={removeLastWebSite}>Remove Last Website</Button>
                <Button onClick={clearWebSites}>Clear Websites</Button>
            </Box>
        </Box>
        <Button onClick={handleSubmit}>
            Preview CV
        </Button>
        <p>
            {JSON.stringify(cv)}
        </p>
    </div>);
}

export default App;
