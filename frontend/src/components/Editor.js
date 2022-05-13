import React, {useRef} from 'react';
import {Box} from "@mui/material";
import {JSONEditor} from "@json-editor/json-editor/src/core";
import {render} from "react-dom";

export default function Editor() {

    const schema = {
        "title": {"type": "string"},
    }

    JSONEditor.defaults.options.theme = 'bootstrap4';
    const element = document.getElementById('editor_holder');
    const editor = new JSONEditor(element, {schema: schema});

    render()
    {
        return (
            <div id={'editor_holder'}>

            </div>
        )
            ;
    }

};