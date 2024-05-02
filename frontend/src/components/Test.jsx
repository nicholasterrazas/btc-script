import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, List, ListItemButton, ListItemText, Stack, TextField, Tooltip } from '@mui/material';
import { AssignmentTurnedIn, AutoFixHigh, FirstPage, IntegrationInstructions, LastPage, NavigateBefore, NavigateNext, NoteAlt } from '@mui/icons-material';
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8000';


const steps = ['Choose Script', 'Simulate Script', 'Assess Script'];

function Choose({setActiveStep, script, setScript, simulateScript}) {
    const scriptEmpty = (script === '');

    const scriptEditorNavigation = (
        <Tooltip 
            title={(scriptEmpty ? 'Create' : 'Modify') + ' script using Script Constructor'}
            placement='right'
        >
            <IconButton 
                aria-label='navigate to Create page to access Script Constructor'
                href='/create' disableTouchRipple
            >
                <AutoFixHigh htmlColor='gold'/>
            </IconButton>
        </Tooltip>
    );

    const handleSimulateScript = () => {
        simulateScript(script);
    };

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <Stack direction='row' justifyContent='center' alignItems='flex-start'>
                <TextField
                    id='Script'
                    label='Script'
                    sx={{ width: '500px' }}
                    multiline
                    onChange={(event) => setScript(event.target.value)}
                    value={script}
                />
                {scriptEditorNavigation}
            </Stack>

            <Button 
                variant='contained' 
                disabled={scriptEmpty} 
                endIcon={<IntegrationInstructions htmlColor={!scriptEmpty ? 'gold' : undefined}/>}
                onClick={handleSimulateScript}
            >
                Simulate Script
            </Button>
        </Stack>
    );
}

function ScriptStack({stack, title}) {
    
    return (
        <Box minWidth={250}>
            <h3>{title}</h3>
            <List sx={{border: 1, borderRadius: 2}}>
                {(stack.length >= 1) ? (stack.map((op, idx) => (
                    <ListItemButton key={idx} >
                        <ListItemText primary={op.value} />
                    </ListItemButton>
                ))) : (
                    <ListItemButton key={0} >
                        <ListItemText primary="EMPTY" />
                    </ListItemButton>
                )}
            </List>        
        </Box>
    );
}

function SimulationNavigation({stepCount, activeSimulationStep, setActiveSimulationStep}) {
    const lastStep = stepCount - 1;
    
    const handleFirst = () => {
        setActiveSimulationStep(0);
    }

    const handleBack = () => {
        setActiveSimulationStep(step => step-1);
    }

    const handleNext = () => {
        setActiveSimulationStep(step => step+1);
    }

    const handleLast = () => {
        setActiveSimulationStep(lastStep);
    }

    return (
        <Stack direction='row'>
            <Tooltip title="First step" placement='top'>
                <IconButton onClick={handleFirst} disabled={activeSimulationStep === 0}>
                    <FirstPage fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Previous step" placement='top'>
                <IconButton onClick={handleBack} disabled={activeSimulationStep === 0}>
                    <NavigateBefore fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Next step" placement='top'>
                <IconButton onClick={handleNext} disabled={activeSimulationStep === lastStep}>
                    <NavigateNext fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Last step" placement='top'>
                <IconButton onClick={handleLast} disabled={activeSimulationStep === lastStep}>
                    <LastPage fontSize='large' />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}

function Simulate({simulationSteps, setActiveStep}) {
    const [activeSimulationStep, setActiveSimulationStep] = React.useState(0);
    const stepCount = simulationSteps.length;

    let currentSimulationStep = simulationSteps[activeSimulationStep];

    const handleChooseScript = () => {
        setActiveStep(0);
    };

    const handleAssessScript = () => {
        setActiveStep(2);
    };


    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={1}>
            <h2>Step {activeSimulationStep}: {currentSimulationStep.message}</h2>

            <Stack minHeight={250} direction='row' justifyContent='center' alignItems='flex-start' spacing={2}>
                <ScriptStack stack={currentSimulationStep.script} title='Script'/>
                <ScriptStack stack={currentSimulationStep.stack} title='Stack' />
            </Stack>


            <SimulationNavigation 
                stepCount={stepCount}
                activeSimulationStep={activeSimulationStep}
                setActiveSimulationStep={setActiveSimulationStep}
            />

            <Stack minHeight={250} direction='row' justifyContent='center' alignItems='flex-start' spacing={2}>

                <Button variant='outlined' onClick={handleChooseScript} endIcon={<NoteAlt />} >
                    Adjust Script
                </Button>

                <Button variant='contained' onClick={handleAssessScript} endIcon={<AssignmentTurnedIn htmlColor={'gold'}/>} >
                    Assess Script
                </Button>
            </Stack>

        </Stack>
    );
}

function Assess({simulation, setActiveStep}) {
    
    const lastStep = simulation.steps[simulation.steps.length-1];
    const finalStack = lastStep.stack;

    let message;
    if (simulation.valid) {
        message = "Valid Script!";
    } else {
        message = "Invalid Script!";
    }

    const handleChooseScript = () => {
        setActiveStep(0);
    };

    const handleSimulateScript = () => {
        setActiveStep(1);
    };

    
    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <h2>{message}</h2>

            <ScriptStack stack={finalStack} title="Final Stack" />

            <Stack minHeight={250} direction='row' justifyContent='center' alignItems='flex-start' spacing={2}>
                <Button variant='outlined' onClick={handleSimulateScript} endIcon={<IntegrationInstructions/>} >
                    Restart Simulation
                </Button>
                <Button variant='contained' onClick={handleChooseScript} endIcon={<NoteAlt/>} >
                    Choose new Script
                </Button>
            </Stack>
        </Stack>    
    );
}

function LinearStepper({activeStep, setActiveStep}) {

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => 
                    <Step key={label}>
                        <StepLabel >{label}</StepLabel>
                    </Step>
                )}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}


function InvalidScript({script, setActiveStep}) {
    
    
    
    const handleChooseScript = () => {
        setActiveStep(0);
    };

    return (
        <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
            <h2>Error parsing script!</h2>
            <p>{`Script: '${script}' `}</p>

            <Stack minHeight={250} direction='row' justifyContent='center' alignItems='flex-start' spacing={2}>

                <Button variant='outlined' onClick={handleChooseScript} endIcon={<NoteAlt />} >
                    Adjust Script
                </Button>

                <Button variant='contained' href='/create' endIcon={<AutoFixHigh htmlColor={'gold'}/>} >
                    Create Script
                </Button>
            </Stack>
        </Stack>
    );
}


export default function Test() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [script, setScript] = React.useState('');
    const [simulation, setSimulation] = React.useState(null);

    
    function simulateScript(script) {
        axios.get(`${API_ENDPOINT}/simulate?script=${script}`)
        .then(res => {
            console.log(res);
            setSimulation(res.data);
            setActiveStep(1);
        })
        .catch(err => {
            console.log(err);
            setActiveStep(4);
        })
    }


    let screen;
    if (activeStep === 0) {
        screen = <Choose setActiveStep={setActiveStep} script={script} setScript={setScript} simulateScript={simulateScript}/>
    } else if (activeStep === 1) {
        screen = <Simulate simulationSteps={simulation.steps} setActiveStep={setActiveStep} />
    } else if (activeStep === 2) {
        screen = <Assess simulation={simulation} setActiveStep={setActiveStep} />
    } else if (activeStep === 4) {
        screen = <InvalidScript script={script} setActiveStep={setActiveStep} />
    } else {
        console.error('Step out of range: ' + activeStep);
        screen = null;
    }

    return (
        <>
            <h1 id='test' style={{ paddingTop: '45px' }}>Test</h1>
            <Stack direction='column' alignItems='center'>
                <Box minHeight={500}>
                    {screen}
                </Box>   
                {/* <LinearStepper activeStep={activeStep} setActiveStep={setActiveStep}/> */}
            </Stack>
        </>
    );
}