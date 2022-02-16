import React, { useEffect, useState } from "react";
import '../css/ListaBooks.css'
import ListaBooks from "./ListaBooks";

import { Button } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function AfisareBooks() {

    const [books, setBook] = useState([])
    const [idVirtualShelf, setIdVirtualShelf] = useState('')

    const aduceListaBooksDinBazaDeDate = () => {
        fetch(`http://localhost:8080/books`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setBook(data)
            })
    }

    const aduceListaSortataBooksDinBazaDeDate = () => {
        fetch(`http://localhost:8080/virtualShelf/${idVirtualShelf}/books`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Error')
                }
            })
            .then((data) => {
                setBook(data)
            })
    }

    useEffect(aduceListaBooksDinBazaDeDate, [])

    return (
        <>


            <Grid item xs={8} justifyContent="center">
                <Item>

                    <br></br>
                    <br></br>
                    <div>
                        <input type='number' placeholder='idVirtualShelf' onChange={(evt) => setIdVirtualShelf(evt.target.value)}></input>

                        <Button onClick={(e) => {
                            e.preventDefault()
                            aduceListaSortataBooksDinBazaDeDate();
                        }}
                            type='submit' color="primary" fullWidth variant="outlined">cauta</Button>
                    </div>
                </Item></Grid>
            <ul className='books'>
                {books.map((book, index) => (
                    <ListaBooks key={index} item={book} />
                ))}
            </ul>

        </>
    )
}

export default AfisareBooks