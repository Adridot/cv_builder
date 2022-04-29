import React, {useState, useContext} from 'react';
import {Box, Button, TextField} from "@mui/material";
import CvContext from "./contexts/cv_context";


export default function ContactInfo() {

    const [cv, setCv] = useContext(CvContext);

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
        websites: [],
        other: ""
    });
    const setContactInfo = (contact_info) => {
        _setContactInfo(contact_info);
        setCv({...cv, contact_info: contact_info})
    };

    return (
        <Box>
            {/*Contact info*/}
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
            </Box>
            {/*Websites*/}
            <Box>
                <h3>Websites</h3>
                {contact_info.websites.map((web_site, index) => (
                    <Box key={index}>
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
                    </Box>
                ))}
                <Button onClick={addWebSite}>Add Website</Button>
                <Button onClick={removeLastWebSite}>Remove Last Website</Button>
                <Button onClick={clearWebSites}>Clear Websites</Button>
            </Box>
            {/*Other info*/}
            <Box>
                <TextField label="Other info" multiline value={contact_info.other}
                           onChange={(e) => setContactInfo({
                               ...contact_info, other: e.target.value
                           })}
                />
            </Box>
        </Box>
    );
}