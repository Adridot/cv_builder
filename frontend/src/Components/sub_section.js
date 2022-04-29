import React, {useState, useContext} from 'react';
import {Box, TextField} from "@mui/material";
import CvContext from "./contexts/cv_context";
import SectionContext from "./contexts/section_context";

export default function SubSection() {
    const [cv, setCv] = useContext(CvContext);
    const [section, setSection] = useContext(SectionContext);

    const setSubSection = (sub_section, section) => {
        section.sub_sections = [...section.sub_sections, sub_section];
        setSection(section);
    };
    const addSubSection = (section) => {
        setSubSection({
            title: '',
            sub_title: '',
            side_title: '',
            date: '',
            location: '',
            body: '',
            elements_title: '',
            elements_body: ''
        }, section);
    };
    const removeSubSection = (section, sub_section) => {
        section.sub_sections = section.sub_sections.filter(s => s !== sub_section);
        setSection(section);
    };

    return (
        <Box>
            <Box>
                <TextField
                    label="Title"
                    value={section.title}
                    onChange={(e) => {
                        section.title = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Sub Title"
                    value={section.sub_title}
                    onChange={(e) => {
                        section.sub_title = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Side Title"
                    value={section.side_title}
                    onChange={(e) => {
                        section.side_title = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Date"
                    value={section.date}
                    onChange={(e) => {
                        section.date = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Location"
                    value={section.location}
                    onChange={(e) => {
                        section.location = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Body"
                    value={section.body}
                    onChange={(e) => {
                        section.body = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Elements Title"
                    value={section.elements_title}
                    onChange={(e) => {
                        section.elements_title = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <TextField
                    label="Elements Body"
                    value={section.elements_body}
                    onChange={(e) => {
                        section.elements_body = e.target.value;
                        setSection(section);
                    }}
                />
            </Box>
            <Box>
                <Button
                    onClick={() => {
                        addSubSection(section);
                    }}
                >
                    Add Sub Section
                </Button>
            </Box>
            <Box>
                <Button
                    onClick={() => {
                        addSection(section);
                    }}
                >
                    Add Section
                </Button>
            </Box>
        </Box>
    );
};
