import React, {useState, useContext} from 'react';
import {Box, TextField} from "@mui/material";
import CvContext from "./contexts/cv_context";
import SectionContext from "./contexts/section_context";

export default function Section() {
    const [cv, setCv] = useContext(CvContext);

    const [section, _setSection] = useState({
        title: '',
        sub_sections: [],
    });

    const setSection = (section) => {
        _setSection(section);
        setCv({...cv, sections: [...cv.sections, section]});

    };


    return (
        <Box>
            <h3>Left sections</h3>
            {cv.left_sections.map((section, index) => (
                <Box key={index}>
                    <p>{`Section ${index + 1}`}</p>
                    <TextField
                        label={'Title'} value={section.title}
                        onChange={(e) => setSection(
                            {...section, title: e.target.value}
                        )}
                    />
                </Box>
            ))}
        </Box>
    )
}