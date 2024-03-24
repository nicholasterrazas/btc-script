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



def enough_args(arg_count: int, stack: list[ScriptOp]) -> bool: 
    return arg_count <= len(stack)


def push_data(data: Data, stack: list[ScriptOp]) -> SimulationStep:
    stack.insert(0, data)
    message = f"<{data}> pushed to stack"
    
    return SimulationStep(script=script, stack=stack, message=message)


def process_opcode(opcode: Opcode, stack: list[ScriptOp]) -> SimulationStep:
    if not enough_args(opcode.arg_count, stack):
        message = f"{opcode.label} requires {opcode.arg_count} args but was given {len(stack)}"
        return SimulationStep(script, stack, message, failed=True)

    # TODO: implement logic for each opcode
    stack.insert(0, opcode)
    message = f"Logic for {opcode.label} not implemented yet.\n{opcode.label} pushed to stack"
    return SimulationStep(script, stack, message)


def simulate_step(script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    script_op = script.pop(0)

    if type(script_op) == Data:
        step = push_data(script_op, stack)
    elif type(script_op) == Opcode:
        step = process_opcode(script_op, stack)
    else:
        print(type(script_op))
        step = SimulationStep(script, stack, message="TYPE ERROR", failed=True)

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
