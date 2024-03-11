import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OPCODES, nameToOpcode } from './Opcodes';
import { Box, FormControlLabel, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack, Switch } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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
            <List>
                {opcodes.map(op => (
                    <ListItem 
                        key={`${op.name}`} 
                        style={{backgroundColor: op.disabled && '#ef5350'}}
                        disablePadding
                    >
                        <ListItemButton onClick={() => addToScript(op)}>
                            <ListItemText primary={`${op.name}`} secondary={`${op.hex}`}/>
                        </ListItemButton>
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
                                    <DeleteIcon />
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