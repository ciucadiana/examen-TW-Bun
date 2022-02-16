import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from "@mui/material";
import AfisareBooks from "./AfisareBooks";
import Child from './Child';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const SERVER = 'http://localhost:8080'

function ListaVirtualShelf(props) {
    const { item } = props;
    const [virtualShelves, setVirtualShelf] = useState(null)

    const [descriereVS, setDescriereVS] = useState('')
    const [dataVS, setDataVS] = useState('')

    function updateVirtualShelf(descriere, data) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                descriereVS: descriere,
                dataVS: data
            })
        };
        console.log(descriere);
        console.log(data);

        fetch(`http://localhost:8080/virtualShelves/${item.idVirtualShelf}`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ idVirtualShelf: item.idVirtualShelf }));
    }
    const [componenta, setComponenta] = useState()
    const parentToChild = () => {
        setComponenta(<div>
            <label>Descriere VirtualShelf: </label>
            <input id="descriere" type='text' onChange={(evt) => setDescriereVS(evt.target.value)}></input>
            <br></br>

            <label>Data VirtualShelf: </label>
            <input id="data" type='text' onChange={(evt) => setDataVS(evt.target.value)}></input>
            <br></br>
            <Button onClick={(e) => {
                e.preventDefault();
                var descriere = document.getElementById("descriere").value;
                var data = document.getElementById("data").value;

                console.log(descriere);
                console.log(data);

                updateVirtualShelf(descriere, data);
                window.location.reload()
            }}
                type='submit' color="primary" fullWidth variant="outlined">Modificare</Button>
        </div>);
    }

    useEffect(async () => {
        const response = await fetch(`${SERVER}/virtualShelves`)
        const data = await response.json()
        const virtualShelf = data.find((e) => e.idVirtualShelf === item.id)
        setVirtualShelf(virtualShelf)
    }, []);
    return (

        <Grid container spacing={3} alignItems="center"
        >
            <Grid item xs={3}>
                <Item>
                    descriereVS: {item.descriereVS}
                </Item>
            </Grid>
            <Grid item xs={3}>
                <Item>
                    dataVS: {item.dataVS}
                </Item>
            </Grid>

            <Grid item xs={3}>
                <Button onClick={(e) => {
                    e.preventDefault()
                    fetch(`http://localhost:8080/virtualShelves/${item.idVirtualShelf}`, {
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
                    Delete: {item.idVirtualShelf}
                </Button>

            </Grid>

            <Grid item xs={3}>
                <Child parentToChild={componenta} />

                <div className="child">
                    <Button primary onClick={() => parentToChild()}>Modifica</Button>
                </div>
            </Grid>
        </Grid>

    )
} export default ListaVirtualShelf