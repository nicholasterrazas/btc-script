import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OPCODES } from './Opcodes';
import { Box, IconButton, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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

function ScriptList({scriptOpcodes, setScriptOpcodes}) {
    console.log(scriptOpcodes);

    const removeFromScript = (indexToRemove) => {
        const newScriptOpcodes = scriptOpcodes.filter((_, idx) => idx !== indexToRemove);
        setScriptOpcodes(newScriptOpcodes);
    };

    return (
        <Box width='33%'>
            {(scriptOpcodes.length > 0) ? <>
                <h2>Script</h2> 
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
                <h2>Script (empty)</h2>        
            </>}
        </Box>
    );
}

export default function Create() {
    const [showDisabled, setShowDisabled] = React.useState(true);
    const [scriptOpcodes, setScriptOpcodes] = React.useState([]);

    return (
        <>
            <h1 id='create' style={{paddingTop:'45px'}}>Create</h1>
            <Stack direction='row'>
                <ScriptList scriptOpcodes={scriptOpcodes} setScriptOpcodes={setScriptOpcodes}/>
                <ScriptList scriptOpcodes={scriptOpcodes} setScriptOpcodes={setScriptOpcodes}/>
                <OpcodeList showDisabled={showDisabled} scriptOpcodes={scriptOpcodes} setScriptOpcodes={setScriptOpcodes}/>
            </Stack>
        </>
    );
    
}