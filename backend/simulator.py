from opcodes import *
from pydantic import BaseModel


class SimulationStep(BaseModel):
    script: list[ScriptOp]
    stack: list[ScriptOp]
    message: str | None = None
    failed: bool = False

class Simulation(BaseModel):
    steps: list[SimulationStep]
    valid: bool



def simulate_step(script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    data = script.pop(0)
    stack.insert(0, data)
    message = f"<{data}> pushed to stack"

    step = SimulationStep(script=script, stack=stack, message=message)
    return step


def simulate_script(script: list[ScriptOp]) -> Simulation:
    stack = []
    steps = [SimulationStep(script=script, stack=stack, message="Initial setup")]

    # simulate script execution, step by step
    while script:
        step = simulate_step(script, stack)
        steps.append(step)
        
        if step.failed:
            break
        
    # verify if script is valid at the end of executing it
    match stack:
        case ["OP_ZERO"] | [0]: valid_script = False
        case _:                 valid_script = True

    return Simulation(steps=steps, valid=valid_script)



if __name__ == "__main__":
    script_input = input("Enter Script: ").split()
    script = parse_script(script_input)

    simulation = simulate_script(script)
    for i, step in enumerate(simulation.steps):
        print(f"Step {i}: {step.message}")
        print(f"Script: {step.script}")
        print(f"Stack: {step.stack}")
        print()
    
    validity = "Valid" if simulation.valid else "Invalid"
    print(f"{validity} script")
