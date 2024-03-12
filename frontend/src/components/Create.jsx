import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OPCODES, nameToOpcode } from './Opcodes';
import { Autocomplete, Box, Button, FormControlLabel, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, Switch, TextField, } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';

const label = { inputProps: { 'aria-label': 'Show disabled opcodes' } };

function OpcodeList({showDisabled, scriptOpcodes, setScriptOpcodes}) {
    // use either all opcodes, or only opcodes that are not disabled 
    let opcodes = showDisabled ? OPCODES : OPCODES.filter(op => !op.disabled); 
    
    const addToScript = (opcode) => {
        const newScriptOpcodes = [...scriptOpcodes, opcode];
        setScriptOpcodes(newScriptOpcodes);
    };

    return (
        <Box width='33%'>
            <h2>Opcodes</h2>

            <Autocomplete 
                disablePortal
                id='opcode-autocomplete'
                options={opcodes.map(op => ({...op, label: op.name}))}
                sx={{width: 350}}
                renderInput={(params) => <TextField {...params} label="Search Opcode" />}
            />
            <Stack direction='row'>
                <Button
                    sx={{width: 175}}
                    fullWidth
                    variant='contained' 
                    onClick={() => console.log("adding to first")}    
                >
                    First
                </Button>
                <Button 
                    sx={{width: 175}}
                    variant='contained'
                    onClick={() => console.log("adding to second")}
                >
                    Second
                </Button>
            </Stack>
            <List>
                {opcodes.map(op => (
                    <ListItem 
                        key={`${op.name}`} 
                        style={{backgroundColor: op.disabled && '#ef5350'}}
                        disablePadding
                    >
                        <ListItemText primary={`${op.name}`} secondary={`${op.hex}`}/>
                        <ListItemIcon>
                            <IconButton onClick={() => {console.log("adding to first"); addToScript(op);}}>
                                <LooksOne />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemIcon>
                            <IconButton onClick={() => {console.log("adding to second"); addToScript(op);}}>
                                <LooksTwo />
                            </IconButton>
                        </ListItemIcon>                   
                    </ListItem> 
                ))}
            </List>
        </Box>
    );
}

function ScriptList({title, scriptOpcodes, setScriptOpcodes}) {
    console.log(scriptOpcodes);

    const removeFromScript = (indexToRemove) => {
        const newScriptOpcodes = scriptOpcodes.filter((_, idx) => idx !== indexToRemove);
        setScriptOpcodes(newScriptOpcodes);
    };

    return (
        <Box width='33%'>
            {(scriptOpcodes.length > 0) ? <>
                <h2>{title || "Script"}</h2> 
                <List>
                    {scriptOpcodes.map((op, idx) => (
                        <ListItem 
                            key={idx} 
                            secondaryAction={
                                <IconButton edge='end' aria-label='trash' onClick={() => removeFromScript(idx)}>
                                    <ClearIcon />
                                </IconButton>
                            }
                            disablePadding 
                        >
                            <ListItemText primary={`${op.name}`} secondary={`${op.hex}`}/>
                        </ListItem>
                    ))}
                </List>
            </> : <>
                <h2>{title || "Script"} (empty)</h2>        
            </>}
        </Box>
    );
}

export default function Create() {
    const [showDisabled, setShowDisabled] = React.useState(true);
    const [scriptOpcodes, setScriptOpcodes] = React.useState([]);

    const toggleDisabledDisplay = () => {
        setShowDisabled((prevShowDisabled) => !prevShowDisabled);
    };

    return (
        <>
            <h1 id='create' style={{paddingTop:'45px'}}>Create</h1>

            <FormControlLabel 
                control={<Switch defaultChecked onChange={toggleDisabledDisplay}/>} 
                label="Show disabled Opcodes"
            />
            <Stack direction='row' alignItems='flex-start' justifyContent='center'>
                <ScriptList title={"scriptPubKey"} scriptOpcodes={scriptOpcodes} setScriptOpcodes={setScriptOpcodes}/>
                <ScriptList title={"scriptSig"} scriptOpcodes={scriptOpcodes} setScriptOpcodes={setScriptOpcodes}/>
                <OpcodeList showDisabled={showDisabled} scriptOpcodes={scriptOpcodes} setScriptOpcodes={setScriptOpcodes}/>
            </Stack>
        </>
    );
    
}