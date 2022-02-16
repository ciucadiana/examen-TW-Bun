import { useState } from "react";
import '../css/FormularAdaugareBooks.css'
import { Button } from '@material-ui/core'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid } from '@material-ui/core'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
function FormularAdaugareBooks(props) {
    const [virtualShelfIdVirtualShelf, setVirtualShelfIdVirtualShelf] = useState('')
    const [titluBook, setTitluBook] = useState('')
    const [genBook, setGenBook] = useState('')
    const [urlBook, setUrlBook] = useState('')

    const handleChange = (event) => {
        setGenBook(event.target.value);
    };

    const addBook = () => {
        fetch(`http://localhost:8080/virtualShelf/${virtualShelfIdVirtualShelf}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                titluBook: titluBook,
                genBook: genBook,
                urlBook: urlBook,
                virtualShelfIdVirtualShelf: virtualShelfIdVirtualShelf
            })
        }).then((response) => {
            console.log(titluBook);
            console.log(genBook);
            console.log(urlBook);

            console.log(virtualShelfIdVirtualShelf);

            if (response.ok) {
                return response.json()
            } else {
                alert('Error')
            }
        })

    }


    return (
        <div >

            < Grid item xs={8}  >
                <h1>Adauga Books:</h1>
                <br></br>
                <Item>
                    <label>Id VirtualShelf: </label>
                    <input type='number' placeholder='id virtualShelf' onChange={(evt) => setVirtualShelfIdVirtualShelf(evt.target.value)}></input>
                    <br></br>

                    <label>Titlu Book: </label>
                    <input type='text' placeholder='titlu Book' onChange={(evt) => setTitluBook(evt.target.value)}></input>
                    <br></br>

                    <label>Url Book: </label>
                    <input type='text' placeholder='url Book' onChange={(evt) => setUrlBook(evt.target.value)}></input>
                    <br></br>


                    <FormControl>
                        <FormLabel id="demo-controlled-radio-buttons-group">Gen</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"

                            onChange={handleChange}

                        >
                            <FormControlLabel value="COMEDY" control={<Radio />} label="COMEDY" />
                            <FormControlLabel value="TRAGEDY" control={<Radio />} label="TRAGEDY" />
                            <FormControlLabel value="ROMANCE" control={<Radio />} label="ROMANCE" />
                            <FormControlLabel value="THRILLER" control={<Radio />} label="THRILLER" />
                            <FormControlLabel value="HORROR" control={<Radio />} label="HORROR" />
                        </RadioGroup>
                    </FormControl>



                    <Button onClick={(e) => {
                        e.preventDefault()
                        addBook();
                       // window.location.reload();
                    }}
                        type='submit' color="primary" fullWidth variant="outlined">Adaugare</Button>
                </Item>
            </Grid>
        </div>
    )
}
export default FormularAdaugareBooks