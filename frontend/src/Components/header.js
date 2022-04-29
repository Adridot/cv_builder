import React, {useState, useContext} from 'react';
import {Box, TextField} from "@mui/material";
import CvContext from "./contexts/cv_context";


export default function Header() {

    const [cv, setCv] = useContext(CvContext);

    const [header, _setHeader] = useState({
        name: "",
        description: "",
        picture: ""
    });
    const setHeader = (header) => {
        _setHeader(header);
        setCv({...cv, header: header});
    };

    return (
        <Box>
            <TextField label="Name" value={header.name}
                       onChange={(e) => setHeader(
                           {
                               ...header, name: e.target.value
                           })}/>
            <TextField label="Description" multiline value={header.description}
                       onChange={(e) => setHeader(
                           {
                               ...header, description: e.target.value
                           })}/>
            {/*TODO: import image*/}

        </Box>
    );
}
