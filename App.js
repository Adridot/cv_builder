import './App.css';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function App() {
    const [cv, setCV] = useState({
        title: "",
        description: "",
        jobs: [
            {
                id: 0,
                value:"",
            }
        ]
    });

    const ajouterJob = () => {
        setCV({
            jobs: [...cv.jobs, {id: cv.jobs.length, value: ""}]
        })
    }

    const api = () => {
        fetch("http://localhost:5000/api/cv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cv),
        }).then(data => data.json()).then(data => console.log(data));
    }
    
    return (
        <div className="App">
            <TextField label="Titre" variant="standard" multiline 
                onChange={(e) => {
                    setCV({
                        ...cv,
                        title: e.target.value
                    })
                }}
            />
            <Button
                onClick={ajouterJob}
            >   
                ajouter un job
            </Button>
            {cv.jobs.map((job, i) => {
                return (
                    <TextField label={`ajouter un job n°${i}`} value={job.value}onChange={(e) => {
                        let cv_tmp = cv
                        cv_tmp.jobs[i].value = e.target.value
                        setCV(cv_tmp)
                    }} />
                )
            })
            }
            <h1>{cv.title}</h1>
            {cv.jobs.map((job, i) => {
                return (
                    <h1>{job.value}</h1>
                )
            })}
            <Button>
                generer le cv
            </Button>
        </div>
    );
}

export default App;
