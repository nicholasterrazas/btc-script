import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OPCODES, P2MS, P2PK, P2PKH, RETURN, value } from './Opcodes';
import { Autocomplete, Box, Button, ButtonGroup, Collapse, Divider, FormControl, FormControlLabel, IconButton, InputLabel, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, } from '@mui/material';
import {Abc, AccountTree, Calculate, Clear, ExpandLess, ExpandMore, FormatQuote, Key, Layers, Lock, LockClock, LooksOne, LooksTwo, Password, Timer10, Timer10SelectSharp} from '@mui/icons-material/';


function Settings({setShowDisabled, setShowPrefix, setShowHex, scriptOpcodes1, setScriptOpcodes1, scriptOpcodes2, setScriptOpcodes2}) {
    
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
        <Box>
            <h3>Settings</h3>
            <Stack direction='row' alignItems='center'>
                <SelectScriptType 
                    scriptOpcodes1={scriptOpcodes1} 
                    setScriptOpcodes1={setScriptOpcodes1}
                    scriptOpcodes2={scriptOpcodes2} 
                    setScriptOpcodes2={setScriptOpcodes2}
                />

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
            </Stack>
        </Box>
    )

}

function CategoryList({category, icon, opcodes, showHex, addToScript}) {
    const [open, setOpen] = React.useState(false);
    
    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
        <>
            <ListItemButton onClick={handleClick} >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={`${category}`} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
        
            <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List>
                {opcodes.map(op => (
                    <ListItemButton
                        key={`${op.label}`} 
                        style={{color: op.disabled && '#ef5350'}}
                        onClick={() => addToScript(op)}
                    >
                        <ListItemText primary={`${op.label}`} secondary={showHex && `${op.hex}`} />
                    </ListItemButton> 
                ))}
            </List>
            <Divider />
        </Collapse>
      </>
    );
}


function OpcodeList({showDisabled, showHex, script, setScript}) {    
    const [selectedOpcode, setSelectedOpcode] = React.useState(null);

    // use either all opcodes, or only opcodes that are not disabled 
    let ops = showDisabled ? OPCODES : OPCODES.filter(op => !op.disabled);

    let categoryAttributes = [
        {name: 'Constants', icon: <Abc />},
        {name: 'Flow Control', icon: <AccountTree />}, 
        {name: 'Stack', icon: <Layers />}, 
        {name: 'Splice', icon: <FormatQuote />}, 
        {name: 'Bitwise Logic', icon: <Timer10SelectSharp />}, 
        {name: 'Arithmetic', icon:<Calculate /> }, 
        {name: 'Crypto', icon: <Password />}, 
        {name: 'Locktime', icon: <LockClock />}
    ];
    let categories = categoryAttributes.map(category => (
        {
            title: category.name,
            icon: category.icon,
            opcodes: ops.filter(op => op.category === category.name.toLowerCase()),
        }
    ));

    const addToScript = (opcode) => {
        const newScript = [...script, opcode];
        setScript(newScript);
    };

    return (
        <Box>
            <h3>Opcodes</h3>
            
            <Autocomplete 
                disablePortal
                id='opcode-autocomplete'
                options={ops}
                renderInput={(params) => <TextField {...params} label="Search Opcode" />}
                onChange={(event, value) => setSelectedOpcode(value)}
            />
            <Button
                fullWidth
                variant='contained' 
                onClick={() => addToScript(selectedOpcode)}
                disabled={selectedOpcode === null}  
            >
                Add to Script
            </Button>
            <List sx={{width: '100%'}}>
                {categories.map(category => 
                    <CategoryList 
                        category={category.title}
                        icon={category.icon}
                        opcodes={category.opcodes}
                        showHex={showHex}
                        addToScript={addToScript}
                    />
                )}
            </List>
        </Box>
    );
}


function ValueList({script, setScript}) {
    const [valueInput, setValueInput] = React.useState('');
    
    const addToScript = (opcode) => {
        const newScript = [...script, opcode];
        setScript(newScript);
    };
    
    return (
        <Box>
            <h3>Values</h3>
            <TextField 
                fullWidth
                value={valueInput}
                onChange={(event) => setValueInput(event.target.value)}
            />
            <Button
                fullWidth
                variant='contained' 
                onClick={() => addToScript(value(valueInput))}
                disabled={ valueInput === '' }  
            >
                Add to Script
            </Button>
        </Box>
    );
}


function SelectInputScript({inputScriptLabel, setInputScriptLabel}) {
    
    const handleChange = (event, newInputScriptLabel) => {
        if (newInputScriptLabel !== null) {
            setInputScriptLabel(newInputScriptLabel);
        }        
    };

    return (
        <Box>
            <h3>Add to {inputScriptLabel} Script</h3>
            <ToggleButtonGroup
                color='primary'
                value={inputScriptLabel}
                exclusive
                onChange={handleChange}
                aria-label='Input Script'
            >
                <ToggleButton value='Lock'>
                    <Lock />
                </ToggleButton>
                <ToggleButton value='Key'>
                    <Key />
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}


function DataEntry({showDisabled, showHex, scriptOpcodes1, setScriptOpcodes1, scriptOpcodes2, setScriptOpcodes2}) {
    const [inputScriptLabel, setInputScriptLabel] = React.useState("Lock");

    let script;
    let setScript;
    if (inputScriptLabel == "Lock") {
        script = scriptOpcodes1;
        setScript = setScriptOpcodes1;
    } else if (inputScriptLabel == "Key") {
        script = scriptOpcodes2;
        setScript = setScriptOpcodes2
    } else {
        console.log('Invalid Script Input: ' + inputScriptLabel);
    }

    return (
        <Box width='33%'>
            <h2>Script Data Entry</h2>
            <SelectInputScript inputScriptLabel={inputScriptLabel} setInputScriptLabel={setInputScriptLabel} />
            <ValueList script={script} setScript={setScript} />
            <OpcodeList 
                showDisabled={showDisabled}
                showHex={showHex}

                script={script}
                setScript={setScript}
            />
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
                                    <Clear />
                                </IconButton>
                            }
                            disablePadding 
                        >
                            <ListItemText 
                                primary={showPrefix || op.label.slice(0,3) !== 'OP_' ? `${op.label}` : `${op.label.slice(3)}`} 
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


function SelectScriptType({scriptOpcodes1, setScriptOpcodes1, scriptOpcodes2, setScriptOpcodes2}) {

    function setScripts(e) {
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
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="script-select">Script Type</InputLabel>
            <Select defaultValue="2S" id="script-select" label="Script Type" onChange={(e) => setScripts(e)}>
                <ListSubheader>Standard Scripts</ListSubheader>
                <MenuItem value="P2PK">Pay to PubKey (P2PK)</MenuItem>
                <MenuItem value="P2PKH">Pay to Pubkey Hash (P2PKH)</MenuItem>
                <MenuItem value="P2MS">Multisig (P2MS)</MenuItem>
                <MenuItem value="P2SH">Pay to Script Hash (P2SH)</MenuItem>

                <ListSubheader>Non-standard Scripts</ListSubheader>
                <MenuItem value="2S">Double Script</MenuItem>
                <MenuItem disabled value="1S">Single Script</MenuItem>
            </Select>
        </FormControl>
    );
}


export default function Create() {
    const [showDisabled, setShowDisabled] = React.useState(true);
    const [showPrefix, setShowPrefix] = React.useState(true);
    const [showHex, setShowHex] = React.useState(true);

    const [scriptOpcodes1, setScriptOpcodes1] = React.useState([]);
    const [scriptOpcodes2, setScriptOpcodes2] = React.useState([]);

    return (
        <>
            <h1 id='create' style={{paddingTop:'45px'}}>Create</h1>
            <Settings 
                setShowDisabled={setShowDisabled}
                setShowPrefix={setShowPrefix}
                setShowHex={setShowHex}

                scriptOpcodes1={scriptOpcodes1} 
                setScriptOpcodes1={setScriptOpcodes1}
                scriptOpcodes2={scriptOpcodes2}
                setScriptOpcodes2={setScriptOpcodes2}
            />

            <Stack direction='row' alignItems='flex-start' justifyContent='center'>
                <ScriptList
                    showPrefix={showPrefix}
                    showHex={showHex}

                    title={"scriptPubkey"} 
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
                <DataEntry 
                    showDisabled={showDisabled}
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