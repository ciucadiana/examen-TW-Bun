import React from 'react'
import { useState } from "react";
import '../css/FormularAdaugareVirtualShelf.css'
import { Button } from '@material-ui/core'

export default function Child({ parentToChild }) {

    return (
        <div>
            {parentToChild}
        </div>
    )
}