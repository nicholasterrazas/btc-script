from opcodes import *
from simulator import Simulation, SimulationStep, simulate_script, simulate_step


def test_add_simulation():
    script = [Data(1), Data(1), OP_ADD]
    sim = simulate_script(script)    
    
    steps = [zip(step.script, step.stack) for step in sim.steps]
    expected_steps = [
        # SCRIPT                        STACK
        ([Data(1), Data(1), OP_ADD],    []),
        ([Data(1), OP_ADD],             [Data(1)]),
        ([OP_ADD],                      [Data(1), Data(1)]),
        ([],                            [Data(2)])
    ]

    assert steps == expected_steps
    assert sim.valid == True


def test_P2PK_simulation():
    script = [Data("SIGNATURE"), Data("PUBKEY"), OP_CHECKSIG]
    sim = simulate_script(script)

    steps = [zip(step.script, step.stack) for step in sim.steps]
    expected_steps = [
        # SCRIPT                                            STACK
        ([Data("SIGNATURE"), Data("PUBKEY"), OP_CHECKSIG],  []),
        ([Data("PUBKEY"), OP_CHECKSIG],                     [Data("SIGNATURE")]),
        ([OP_CHECKSIG],                                     [Data("PUBKEY"), Data("SIGNATURE")]),
        ([],                                                [OP_1])
    ]

    assert steps == expected_steps
    assert sim.valid == True

