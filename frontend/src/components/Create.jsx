import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OPCODES, P2MS, P2PK, P2PKH, RETURN } from './Opcodes';
import { Autocomplete, Box, Button, ButtonGroup, FormControl, FormControlLabel, IconButton, InputLabel, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, Stack, Switch, TextField, } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import LooksOne from '@mui/icons-material/LooksOne';
import LooksTwo from '@mui/icons-material/LooksTwo';


function Settings({setShowDisabled, setShowPrefix, setShowHex}) {
    
    const toggleDisabledDisplay = () => {
        setShowDisabled((prevShowDisabled) => !prevShowDisabled);
    };

    const togglePrefixDisplay = () => {
        setShowPrefix((prevShowPrefix) => !prevShowPrefix);
    };

    const toggleHexDisplay = () => {
        setShowHex((prevShowHex) => !prevShowHex);
    };

    return (
        <>
            <h3>Settings</h3>

            <FormControlLabel 
                control={<Switch defaultChecked onChange={toggleDisabledDisplay}/>} 
                label="Show disabled opcodes"
            />

            <FormControlLabel 
                control={<Switch defaultChecked onChange={togglePrefixDisplay}/>} 
                label="Show 'OP' prefix in script"
            />
            <FormControlLabel 
                control={<Switch defaultChecked onChange={toggleHexDisplay}/>} 
                label="Show hex equivalent"
            />

        </>
    )

}

function OpcodeList({showDisabled, showHex, scriptOpcodes1, setScriptOpcodes1, scriptOpcodes2, setScriptOpcodes2}) {    
    const [selectedOpcode, setSelectedOpcode] = React.useState(null);

    // use either all opcodes, or only opcodes that are not disabled 
    let opcodes = showDisabled ? OPCODES : OPCODES.filter(op => !op.disabled); 
    
    const addToScript1 = (opcode) => {
        const newScriptOpcodes = [...scriptOpcodes1, opcode];
        setScriptOpcodes1(newScriptOpcodes);
    };

    const addToScript2 = (opcode) => {
        const newScriptOpcodes = [...scriptOpcodes2, opcode];
        setScriptOpcodes2(newScriptOpcodes);
    };

    return (
        <Box width='33%'>
            <h2>Opcodes</h2>
            
            <Autocomplete 
                disablePortal
                id='opcode-autocomplete'
                options={opcodes}
                sx={{width: 350}}
                renderInput={(params) => <TextField {...params} label="Search Opcode" />}
                onChange={(event, value) => setSelectedOpcode(value)}
            />
            <ButtonGroup>
                <Button
                    sx={{width: 175}}
                    fullWidth
                    variant='contained' 
                    onClick={() => addToScript1(selectedOpcode)}
                    disabled={selectedOpcode === null}  
                >
                    First
                </Button>
                <Button 
                    sx={{width: 175}}
                    variant='contained'
                    onClick={() => addToScript2(selectedOpcode)}
                    disabled={selectedOpcode === null}  
                >
                    Second
                </Button>
            </ButtonGroup>
            <List>
                {opcodes.map(op => (
                    <ListItem 
                        key={`${op.label}`} 
                        style={{backgroundColor: op.disabled && '#ef5350'}}
                        disablePadding
                    >
                        <ListItemText primary={`${op.label}`} secondary={showHex && `${op.hex}`} />
                        <ListItemIcon>
                            <IconButton onClick={() => addToScript1(op)}>
                                <LooksOne />
                            </IconButton>
                        </ListItemIcon>
                        <ListItemIcon>
                            <IconButton onClick={() => addToScript2(op)}>
                                <LooksTwo />
                            </IconButton>
                        </ListItemIcon>                   
                    </ListItem> 
                ))}
            </List>
        </Box>
    );
}

function ScriptList({showPrefix, showHex, title, scriptOpcodes, setScriptOpcodes}) {
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
                            <ListItemText 
                                primary={showPrefix ? `${op.label}` : `${op.label.slice(3)}`} 
                                secondary={showHex && `${op.hex}`}/>
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
    const [showPrefix, setShowPrefix] = React.useState(true);
    const [showHex, setShowHex] = React.useState(true);

    const [scriptOpcodes1, setScriptOpcodes1] = React.useState([]);
    const [scriptOpcodes2, setScriptOpcodes2] = React.useState([]);

    const chooseScriptType = (e) => {
        e.preventDefault();
        let scriptType = e.target.value;

        let scriptPubkey;
        let scriptSig;
        
        switch (scriptType) {
            case "P2PK":
                [scriptPubkey, scriptSig] = P2PK("<SIGNATURE>", "<PUBKEY>");
                break;
            case "P2PKH":
                [scriptPubkey, scriptSig] = P2PKH("<SIGNATURE>", "<PUBKEY>");
                break;
            case "P2MS":
                [scriptPubkey, scriptSig] = P2MS(
                    ["<SIGNATURE1>", "<SIGNATURE3>"],
                    ["<PUBKEY1>", "<PUBKEY2>", "<PUBKEY3>"],
                    2);
                break;
            case "P2SH":
                [scriptPubkey, scriptSig] = P2SH([],[]);
                break;
            case "RETURN":
                [scriptPubkey, scriptSig] = RETURN("<DATA>");
                break; 
            case "1S":
            case "2S":
            default:
                scriptPubkey = [];
                scriptSig = [];
                break;
        }
        setScriptOpcodes1(scriptPubkey);
        setScriptOpcodes2(scriptSig);
    };

    return (
        <>
            <h1 id='create' style={{paddingTop:'45px'}}>Create</h1>

            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="script-select">Script Type</InputLabel>
                <Select defaultValue="2S" id="script-select" label="Script Type" onChange={chooseScriptType}>
                    <ListSubheader>Standard Scripts</ListSubheader>
                    <MenuItem value="P2PK">Pay to PubKey (P2PK)</MenuItem>
                    <MenuItem value="P2PKH">Pay to Pubkey Hash (P2PKH)</MenuItem>
                    <MenuItem value="P2MS">Multisig (P2MS)</MenuItem>
                    <MenuItem value="P2SH">Pay to Script Hash (P2SH)</MenuItem>

                    <ListSubheader>Non-standard Scripts</ListSubheader>
                    <MenuItem value="2S">Double Script</MenuItem>
                    <MenuItem value="1S">Single Script</MenuItem>
                </Select>
            </FormControl>

            <Settings 
                setShowDisabled={setShowDisabled}
                setShowPrefix={setShowPrefix}
                setShowHex={setShowHex}
            />

            <Stack direction='row' alignItems='flex-start' justifyContent='center'>
                <ScriptList
                    showPrefix={showPrefix}
                    showHex={showHex}

                    title={"scriptPubKey"} 
                    scriptOpcodes={scriptOpcodes1} 
                    setScriptOpcodes={setScriptOpcodes1}
                />
                <ScriptList 
                    showPrefix={showPrefix}
                    showHex={showHex}

                    title={"scriptSig"} 
                    scriptOpcodes={scriptOpcodes2} 
                    setScriptOpcodes={setScriptOpcodes2}
                />
                <OpcodeList 
                    showDisabled={showDisabled}
                    showPrefix={showPrefix}
                    showHex={showHex}

                    scriptOpcodes1={scriptOpcodes1} 
                    setScriptOpcodes1={setScriptOpcodes1}
                    scriptOpcodes2={scriptOpcodes2} 
                    setScriptOpcodes2={setScriptOpcodes2}
                />
            </Stack>
        </>
    );
    
}