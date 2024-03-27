import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ButtonGroup, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, TextField, Tooltip } from '@mui/material';
import { ArrowBackIos, AutoFixHigh, Code, FirstPage, LastPage, NavigateBefore, NavigateNext } from '@mui/icons-material';

const steps = ['Select Script', 'Simulate Script', 'Evaluate Script'];

function Select() {
    const [lock, setLock] = React.useState('');
    const [key, setKey] = React.useState('');

    const bothScriptsEmpty = (lock === '' && key === '');
    const oneScriptEmpty = (lock === '' || key === '');

    const scriptEditorNavigation = (
        <Tooltip 
            title={(bothScriptsEmpty ? 'Create' : 'Modify') + ' script using Script Editor'}
            placement='right'
        >
            <IconButton 
                aria-label='navigate to Create page to access Script Editor'
                href='/create' disableTouchRipple
            >
                <AutoFixHigh htmlColor='gold'/>
            </IconButton>
        </Tooltip>
    );

    return (
        <Box>

            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                <Stack direction='row' justifyContent='center' alignItems='flex-start'>
                    <Stack pl={5} direction='column' justifyContent='center' alignItems='center' spacing={2}>
                
                        <TextField
                            id='Lock'
                            label='Lock'
                            sx={{ width: '500px' }}
                            multiline
                            onChange={(event) => setLock(event.target.value)}
                        />

                        <TextField
                            id='Key'
                            label='Key'
                            sx={{ width: '500px' }}
                            multiline
                            onChange={(event) => setKey(event.target.value)}
                        />
                    </Stack>
                    {scriptEditorNavigation}
                </Stack>

                <Button 
                    variant='contained' 
                    disabled={oneScriptEmpty} 
                    endIcon={<Code htmlColor={!oneScriptEmpty && 'gold'}/>}
                >
                    Simulate Script
                </Button>
            </Stack>

        </Box>
    );
}

function ScriptStack({stack, title}) {
    
    return (
        <Box minWidth={250}>
            <h3>{title}</h3>
            <List sx={{border: 1, borderRadius: 2}}>
                {(stack.length >= 1) ? (stack.map((op, idx) => (
                    <ListItemButton key={idx} disablePadding>
                        <ListItemText primary={op} />
                    </ListItemButton>
                ))) : (
                    <ListItemButton key={0} disablePadding>
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
            <Tooltip title="Go to first step">
                <IconButton onClick={handleFirst} disabled={activeSimulationStep === 0}>
                    <FirstPage fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Go to previous step">
                <IconButton onClick={handleBack} disabled={activeSimulationStep === 0}>
                    <NavigateBefore fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Go to next step">
                <IconButton onClick={handleNext} disabled={activeSimulationStep === lastStep}>
                    <NavigateNext fontSize='large' />
                </IconButton>
            </Tooltip>
            <Tooltip title="Go to last step">
                <IconButton onClick={handleLast} disabled={activeSimulationStep === lastStep}>
                    <LastPage fontSize='large' />
                </IconButton>
            </Tooltip>
        </Stack>
    );
}

function Simulate({simulationSteps}) {
    const [activeSimulationStep, setActiveSimulationStep] = React.useState(0);
    const stepCount = simulationSteps.length;

    let currentSimulationStep = simulationSteps[activeSimulationStep];

    return (
        <Box >
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

            </Stack>

        </Box>
    );
}

function Evaluate({steps, valid}) {
    let message;
    if (valid) {
        message = "Valid Script!";
    } else {
        message = "Invalid Script!";
    }
    return (
        <h2>{message}</h2>
    );
}

function LinearStepper({activeStep, setActiveStep}) {
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
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
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

const fakeSimulation = {
    steps: [
        {script: [1, 1, 'OP_ADD'],  stack: [],      message: 'Initial setup', failed: false},
        {script: [1, 'OP_ADD'],     stack: [1],     message: 'Pushed <1> to stack', failed: false},
        {script: ['OP_ADD'],        stack: [1, 1],  message: 'Pushed <1> to stack', failed: false},
        {script: [],                stack: [2],     message: 'Performed ADD on <1> and 1; Pushed <2> to stack', failed: false}
    ],
    valid: true
}


export default function Test() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [simulation, setSimulation] = React.useState(fakeSimulation);



    let screen;
    if (activeStep === 0) {
        console.log('Selecting Script');
        screen = <Select />
    } else if (activeStep === 1) {
        console.log('Simulating Script');
        screen = <Simulate simulationSteps={simulation.steps} />
    } else if (activeStep === 2) {
        console.log('Evaluating Script');
        screen = <Evaluate />
    } else {
        console.error('Step out of range: ' + activeStep);
        screen = null;
    }

    return (
        <>
            <h1 id='test' style={{ paddingTop: '45px' }}>Test</h1>
            <Stack alignItems='center' spacing={3}>
                <LinearStepper activeStep={activeStep} setActiveStep={setActiveStep}/>
                {screen}
            </Stack>
        </>
    );
}