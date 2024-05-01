import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { OPCODES, P2MS, P2PK, P2PKH, RETURN, value } from './Opcodes';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, Icon, IconButton, InputLabel, ListItemButton, ListItemIcon, ListItemText, ListSubheader, MenuItem, Select, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Tooltip, } from '@mui/material';
import {Abc, AccountTree, Calculate, Clear, Description, ExpandLess, ExpandMore, FormatQuote, Key, Layers, Lock, LockClock, Password, Settings, Timer10SelectSharp} from '@mui/icons-material/';


function ScriptSettings({setShowDisabled, setShowPrefix, setShowHex, scriptOpcodes1, setScriptOpcodes1, scriptOpcodes2, setScriptOpcodes2}) {
    
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
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='settings'
                    id='settings-summary'
                >
                    <Settings />
                    <b>Settings</b>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
        </Box>
    )

}

function OpcodeDescription({opcode, open, setOpen}) {
    console.log(opcode);
    if (opcode === null) {
        return null;
    }

    const handleClose = () =>  {
        setOpen(false);
    };

    const handleLearn = () => {
        window.open("https://en.bitcoin.it/wiki/Script");
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {opcode.label} Description
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {opcode.description}
                    </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleLearn}>Learn more</Button>
                <Button onClick={handleClose} autoFocus>Exit Description</Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>  
    );
}

function CategoryList({category, icon, opcodes, showHex, addToScript}) {
    const [open, setOpen] = React.useState(false);
    
    const handleClick = () => {
        setOpen(!open);
    };
    

    const [openDescription, setOpenDescription] = React.useState(false);
    const [descriptionOpcode, setDescriptionOpcode] = React.useState(null);

    let opcodeDescription = (     
        <OpcodeDescription 
            opcode={descriptionOpcode}
            open={openDescription}
            setOpen={setOpenDescription}
        />
    );

    const handleOpenDescription = (opcode) => {
        setDescriptionOpcode(opcode);
        setOpenDescription(true);
    }

    return (
        <>
            <ListItemButton onClick={handleClick} >
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={`${category}`} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {opcodeDescription}
        
            <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List>
                {opcodes.map(op => (
                    <ListItem
                        key={`${op.label}`}
                        secondaryAction={
                            <Tooltip title="Opcode Description">
                                <IconButton edge="end" aria-label="description" onClick={() => handleOpenDescription(op)}>
                                    <Description />
                                </IconButton>
                            </Tooltip>
                        }
                        disablePadding
                    >
                        <ListItemButton
                            key={`${op.label}`} 
                            style={{color: op.disabled && '#ef5350'}}
                            onClick={() => addToScript(op)}
                        >
                            <ListItemText primary={`${op.label}`} secondary={showHex && `${op.hex}`} />
                        </ListItemButton> 
                    </ListItem>
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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='opcodes'
                    id='opcodes-summary'                
                >
                    <b>Opcodes</b>

                </AccordionSummary>
                <AccordionDetails>
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

                </AccordionDetails>
            </Accordion>            
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
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls='settings'
                    id='settings-summary'                
                >
                    <b>Values</b>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
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
            <Stack direction='row' alignItems='center' spacing={2}>
                <ToggleButtonGroup
                    color='primary'
                    value={inputScriptLabel}
                    exclusive
                    onChange={handleChange}
                    aria-label='Input Script'
                >
                    <Tooltip title="Enter data into Lock script">
                        <ToggleButton value='Lock'>
                            <Lock />
                        </ToggleButton>
                    </Tooltip>
                    <Tooltip title="Enter data into Key script">
                        <ToggleButton value='Key'>
                            <Key />
                        </ToggleButton>
                    </Tooltip>
                </ToggleButtonGroup>
            </Stack>
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
            <h2>Data Entry</h2>
            <SelectInputScript inputScriptLabel={inputScriptLabel} setInputScriptLabel={setInputScriptLabel} />
            <br />
            <ValueList script={script} setScript={setScript} />
            <OpcodeList showDisabled={showDisabled} showHex={showHex} script={script} setScript={setScript} />
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
            <ScriptSettings 
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