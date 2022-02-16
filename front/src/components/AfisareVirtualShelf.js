import React, { useEffect, useState } from "react";
import '../css/ListaVirtualShelf.css'
import ListaVirtualShelf from "./ListaVirtualShelf";

import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}))
function AfisareVirtualShelf() {

    const [virtualShelves, setVirtualShelf] = useState([])
    const [descriereVS, setDescriereVS] = useState('')
    const [dataVS, setDataVS] = useState('')

    const aduceListaVirtualShelfDinBazaDeDate = () => {
        fetch(`http://localhost:8080/virtualShelves`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setVirtualShelf(data)
            })
    }

    const aduceListaSortataVirtualShelfDinBazaDeDate = () => {
        fetch(`http://localhost:8080/virtualShelves/sortare`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setVirtualShelf(data)
            })
    }

    const filtreazaCu2Param = () => {
        fetch(`http://localhost:8080/virtualShelves/filter?dataVS=${dataVS}&descriereVS=${descriereVS}`)
            .then((response) => {
                console.log(dataVS  + " " + descriereVS);
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setVirtualShelf(data)
            })
    }

    useEffect(aduceListaVirtualShelfDinBazaDeDate, [])


    return (
        <>
            <Grid item xs={8} justifyContent="center">
                <Item>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        aduceListaSortataVirtualShelfDinBazaDeDate();
                    }}
                        type='submit' color="primary" fullWidth variant="outlined">Sortare</Button>


                    <br></br>
                    <br></br>
                    <div>

                        <label>Lista cu VirtualShelves cu data mai mare sau egala cu ... care contin urmatoarele caractere ... in descriere: </label>

                        <input type='date' placeholder='dataVS' onChange={(evt) => setDataVS(evt.target.value)}></input>
                        <input type='text' placeholder='descriereVS' onChange={(evt) => setDescriereVS(evt.target.value)}></input>

                        <Button onClick={(e) => {
                            e.preventDefault()
                            filtreazaCu2Param();
                        }}
                            type='submit' color="primary" fullWidth variant="outlined">Filtreaza</Button>
                    </div>
                    <br></br>
                    <br></br>
                </Item></Grid>
            <ul className='virtualShelves'>

                {virtualShelves.map((virtualShelf, index) => (
                    <ListaVirtualShelf key={index} item={virtualShelf} />
                ))}
            </ul>

        </>
    )
}

export default AfisareVirtualShelf