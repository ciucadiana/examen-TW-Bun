import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Child2 from './Child2';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const SERVER = 'http://localhost:8080'

function ListaBooks(props) {
    const { item } = props;


    const [book, setBook] = useState(null)
    const [titluBook, setTitluBook] = useState('')
    const [genBook, setGenBook] = useState('')
    const [urlBook, setUrlBook] = useState('')

    function updateBooks(titlu, gen, url) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                titluBook: titlu,
                genBook: gen,
                urlBook: url
            })
        };
        console.log(titlu);
        console.log(gen);
        console.log(url);

        fetch(`http://localhost:8080/virtualShelf/${item.virtualShelfIdVirtualShelf}/books/${item.idBook}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ idBook: item.idBook }));
    }
    const [componenta, setComponenta] = useState()
    const parentToChild2 = () => {
        setComponenta(
            <div>
                <label>Titlu Book: </label>
                <input id="titlu" type='text' onChange={(evt) => setTitluBook(evt.target.value)}></input>
                <br></br>

                <label>Gen Book: </label>
                <input id="gen" type='text' onChange={(evt) => setGenBook(evt.target.value)}></input>
                <br></br>

                <label>Url Book: </label>
                <input id="url" type='text' onChange={(evt) => setUrlBook(evt.target.value)}></input>
                <br></br>
                <Button onClick={(e) => {
                    e.preventDefault();
                    var titlu = document.getElementById("titlu").value;
                    var gen = document.getElementById("gen").value;
                    var url = document.getElementById("url").value;

                    console.log(titlu);
                    console.log(gen);
                    console.log(url);

                    updateBooks(titlu, gen, url);
                    window.location.reload()
                }}
                    type='submit' color="primary" fullWidth variant="outlined">Modificare</Button>
            </div>);
    }

    useEffect(async () => {
        const response = await fetch(`${SERVER}/books`)
        const data = await response.json()
        const book = data.find((e) => e.idBooks === item.id)
        setBook(book)
    }, []);

    return (
        <Grid container spacing={3} alignItems="center"
        >
            <Grid item xs={3}>
                <Item>
                    Titlu: {item.titluBook}
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    Gen: {item.genBook}
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    URL: {item.urlBook}
                </Item>
            </Grid>

            <Grid item xs={3}>
                <Button onClick={(e) => {
                    e.preventDefault()
                    fetch(`http://localhost:8080/virtualShelf/${item.virtualShelfIdVirtualShelf}/books/${item.idBook}`, {
                        method: 'DELETE'
                    }).then((response) => {
                        if (response.ok) {
                            window.location.reload()
                        } else {
                            alert('Delete error!')
                        }
                    })
                }}
                    type='submit' color="primary" fullWidth variant="outlined">
                    Delete: {item.virtualShelfIdVirtualShelf}
                </Button>

            </Grid>
            <Grid item xs={3}>
                <Child2 parentToChild2={componenta} />

                <div className="child2">
                    <Button primary onClick={() => parentToChild2()}>Modifica</Button>
                </div>
            </Grid>
        </Grid>
    )


} export default ListaBooks