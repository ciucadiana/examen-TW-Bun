import { useState } from "react";
import '../css/FormularAdaugareVirtualShelf.css'
import { Button, Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function FormularAdaugareVirtualShelf(props) {

    const [descriereVS, setDescriereVS] = useState('')
    const [dataVS, setDataVS] = useState('')

    const addVirtualShelf = () => {
        fetch(`http://localhost:8080/virtualShelves`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                descriereVS: descriereVS,
                dataVS: dataVS
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert('Adaugare gresita de virtual shelf!')
            }
        })

    }


    return (
        <div >

            <Grid item xs={8} justifyContent="center">
                <h1>Adauga VirtualShelf:</h1>
                <br></br>
                <Item>

                    <label>Descriere VirtualShelf: </label>
                    <input type='text' placeholder='descriere virtualshelf' onChange={(evt) => setDescriereVS(evt.target.value)}></input>
                    <br></br>

                    <label>Data VirtualShelf: </label>
                    <input type='date' placeholder='data virtualshelf' onChange={(evt) => setDataVS(evt.target.value)}></input>
                    <br></br>
                </Item>
                <Button onClick={(e) => {
                    e.preventDefault()
                    addVirtualShelf();
                    window.location.reload()
                }}
                    type='submit' color="primary" fullWidth variant="outlined">Adaugare</Button>
            </Grid>


        </div>
    )
}
export default FormularAdaugareVirtualShelf