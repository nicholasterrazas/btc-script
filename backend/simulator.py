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


def unary_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operand = stack.pop(0)

    operation = opcode.label[3:]
    msg = f"Performed {operation} on <{operand}>"

    if opcode == OP_1ADD:
        result = operand + 1
    elif opcode == OP_1SUB:
        result = operand - 1
    elif opcode == OP_NEGATE:
        result = -operand
    elif opcode == OP_ABS:
        result = -operand if operand < 0 else operand
    elif opcode == OP_NOT:
        result = int(operand==0)
    elif opcode == OP_0NOTEQUAL:
        result = int(opcode!=0)
    else:
        msg = f"UNARY OPERATION ERROR: (OPCODE: {opcode}, OPERAND: {operand})"
        return SimulationStep(script, stack, message=msg, failed=True)
    
    stack.insert(0, result)
    msg += f"\nPushed <{result}> to stack"
    
    return SimulationStep(script, stack, msg)


def binary_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    op1 = stack.pop(0)
    op2 = stack.pop(0)
    
    operation = opcode.label[3:]
    msg =f"Performed {operation} on <{op1}> and <{op2}>" 

    if opcode == OP_ADD:
        result = op1 + op2
    elif opcode == OP_SUB:
        result = op1 - op2
    elif opcode == OP_BOOLAND:
        # If both op1 and op2 are not 0, the output is 1. Otherwise 0.
        result == int(op1 != 0 and op2 != 0)
    elif opcode == OP_BOOLOR:
        # If op1 or op2 is not 0, the output is 1. Otherwise 0.
        result == int(op1 != 0 or op2 != 0)
    elif opcode == OP_NUMEQUAL:
        result == int(op1 == op2)
    elif opcode == OP_NUMEQUALVERIFY:
        result == int(op1 == op2)
        if result == 1:
            msg += "Verify passed\n"
        else:
            msg += "Verify failed"
            return SimulationStep(script, stack, msg, failed=True)
    elif opcode == OP_NUMNOTEQUAL:
        result == int(op1 != op2)
    elif opcode == OP_LESSTHAN:
        result == int(op1 < op2)
    elif opcode == OP_GREATERTHAN:
        result == int(op1 > op2)
    elif opcode == OP_LESSTHANOREQUAL:
        result == int(op1 <= op2)
    elif opcode == OP_GREATERTHANOREQUAL:
        result == int(op1 >= op2)
    elif opcode == OP_MIN:
        result = min(op1, op2)
    elif opcode == OP_MAX:
        result = max(op1, op2)
    else:
        msg = f"UNARY OPERATION ERROR: (OPCODE: {opcode}, OPERAND1: {op1}, OPERAND2: {op2})"
        return SimulationStep(script, stack, message=msg, failed=True)
    
    stack.insert(0, result)
    msg += f"\nPushed <{result}> to stack"

    return SimulationStep(script, stack, msg)


def process_opcode(opcode: Opcode, stack: list[ScriptOp]) -> SimulationStep:
    if opcode.disabled:
        message = f"{opcode.label} is disabled"
        return SimulationStep(script, stack, message, failed=True)
    
    if not enough_args(opcode.arg_count, stack):
        message = f"{opcode.label} requires {opcode.arg_count} args but was given {len(stack)}"
        return SimulationStep(script, stack, message, failed=True)


    if opcode.arg_count == 1:
        return unary_operation(opcode, stack)
    elif opcode.arg_count == 2:
        return binary_operation(opcode, stack)

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
