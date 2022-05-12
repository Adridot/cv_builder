import React, {useEffect, useState} from 'react';
import {Box, Button, TableCell, TableRow, Table, TableBody, TableHead, Backdrop, CircularProgress} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';


function App() {

    const [cv_list, setCvList] = useState([]);

    const api_url = "http://127.0.0.1:8000/";

    const [loading, setLoading] = React.useState(false);


    const get_cv_list = () => {
        fetch(api_url + "list_cvs/",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                setCvList(data);
            })
    }

    const remove_cv = (id) => {
        fetch(api_url + "delete_cv/",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            })
            .then(() => {
                get_cv_list();
            })
    }

    const get_cv_path = async (id) => {
        setLoading(true);
        const res = await fetch(api_url + "create_pdf/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: id
                })
            })
        const data = await res.text()
        await window.open(api_url + data.slice(1), '_blank');
        setLoading(false);
    }

    useEffect(() => {
        get_cv_list();
    }, []);

    return (
        <Box>
            <Button onClick={get_cv_list}>Refresh</Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>CV Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cv_list.map(cv => (
                        <TableRow key={cv.id}>
                            <TableCell>{cv.id}</TableCell>
                            <TableCell>{cv.name}</TableCell>
                            <TableCell><Button
                                startIcon={<DeleteIcon/>}
                                onClick={() => remove_cv(cv.id)}>
                                Remove</Button>
                            </TableCell>
                            <TableCell><Button
                                startIcon={<SaveIcon/>}
                                onClick={() => get_cv_path(cv.id)}>
                                Download</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={loading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Box>

    )
        ;
}

export default App;
