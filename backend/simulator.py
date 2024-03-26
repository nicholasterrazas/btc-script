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


def push_data(data: Data, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    stack.insert(0, data)
    message = f"Pushed <{data.value}> to stack"
    
    return SimulationStep(script=script, stack=stack, message=message)


def unary_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operand = stack.pop(0).value

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
        return SimulationStep(script=script, stack=stack, message=msg, failed=True)
    
    stack.insert(0, Data(value=result))
    msg += f"\nPushed <{result}> to stack"
    
    return SimulationStep(script=script, stack=stack, message=msg)


def binary_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    op1 = stack.pop(0).value
    op2 = stack.pop(0).value
    
    operation = opcode.label[3:]
    msg = f"Performed {operation} on <{op1}> and <{op2}>" 

    if opcode == OP_ADD:
        result = op1 + op2
    elif opcode == OP_SUB:
        result = op1 - op2
    elif opcode == OP_BOOLAND:
        # If both op1 and op2 are not 0, the output is 1. Otherwise 0.
        result = int(op1 != 0 and op2 != 0)
    elif opcode == OP_BOOLOR:
        # If op1 or op2 is not 0, the output is 1. Otherwise 0.
        result = op1 != 0 or op2 != 0
    elif opcode == OP_NUMEQUAL:
        result = int(op1 == op2)
    elif opcode == OP_NUMEQUALVERIFY:
        result = int(op1 == op2)
        if result == 1:
            msg += "Verify passed\n"
        else:
            msg += "Verify failed"
            return SimulationStep(script=script, stack=stack, message=msg, failed=True)
    elif opcode == OP_NUMNOTEQUAL:
        result = op1 != op2
    elif opcode == OP_LESSTHAN:
        result = int(op1 < op2)
    elif opcode == OP_GREATERTHAN:
        result = int(op1 > op2)
    elif opcode == OP_LESSTHANOREQUAL:
        result = int(op1 <= op2)
    elif opcode == OP_GREATERTHANOREQUAL:
        result = int(op1 >= op2)
    elif opcode == OP_MIN:
        result = min(op1, op2)
    elif opcode == OP_MAX:
        result = max(op1, op2)
    else:
        msg = f"BINARY OPERATION ERROR: (OPCODE: {opcode}, OPERAND1: {op1}, OPERAND2: {op2})"
        return SimulationStep(script=script, stack=stack, message=msg, failed=True)
    
    stack.insert(0, Data(value=result))
    msg += f"\nPushed <{result}> to stack"

    return SimulationStep(script=script, stack=stack, message=msg)


# swaps elements at idx1 and idx2 of stack, and then returns them
def swap(idx1: int, idx2: int, stack: list[ScriptOp]) -> tuple[ScriptOp,ScriptOp]:
    temp = stack[idx1]
    stack[idx1] = stack[idx2]
    stack[idx2] = temp

    return stack[idx1], temp 


def stack_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operation = opcode.label[3:]
    msg = f"Performed {operation}\n" 
    
    if opcode == OP_2DROP:
        first  = stack.pop(0)
        second = stack.pop(0)
        msg += f"Popped <{first}> and <{second}> from stack"
    elif opcode == OP_2DUP:
        first  = stack[0]
        second = stack[1]
        stack.insert(0, second)
        stack.insert(0, first)
        msg += f"Duplicated <{first}> and <{second}> and pushed them to stack"
    elif opcode == OP_2OVER:
        third  = stack[2]
        fourth = stack[3]
        stack.insert(0, fourth)
        stack.insert(0, third)
        msg += f"Duplicated <{third}> and <{fourth}> and pushed them to stack"
    elif opcode == OP_2ROT:
        print(f"{len(stack)=}")
        fifth = stack.pop(4)
        sixth = stack.pop(4)
        stack.insert(0, sixth)
        stack.insert(0, fifth)
        msg += f"Moved <{fifth}> and <{sixth}> to top of stack"
    elif opcode == OP_2SWAP:
        first, third = swap(0, 2, stack)    # swap 1st and 3rd values
        second, fourth = swap(1, 3, stack)  # swap 2nd and 4th values
        msg += f"Swapped <{first}> and <{second}> with <{third}> and <{fourth}>"
    elif opcode == OP_3DUP:
        first  = stack[0]
        second = stack[1]
        third  = stack[2]
        stack.insert(0, third)
        stack.insert(0, second)
        stack.insert(0, first)
        msg += f"Duplicated <{first}>, <{second}>, <{third}>, and pushed them to stack"
    else:
        msg = f"STACK OPERATION ERROR: (OPCODE: {opcode})"
        return SimulationStep(script=script, stack=stack, message=msg, failed=True)

    return SimulationStep(script=script, stack=stack, message=msg)


def process_opcode(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    if opcode.disabled:
        message = f"{opcode.label} is disabled"
        return SimulationStep(script=script, stack=stack, message=message, failed=True)
    
    if not enough_args(opcode.arg_count, stack):
        message = f"{opcode.label} requires {opcode.arg_count} arguments but was given {len(stack)}"
        return SimulationStep(script=script, stack=stack, message=message, failed=True)


    if opcode in UNARY_OPS:     
        return unary_operation(opcode, script, stack)
    elif opcode in BINARY_OPS:
        return binary_operation(opcode, script, stack)
    elif opcode in STACK_OPS:   
        return stack_operation(opcode, script, stack)

    else:
        # TODO: implement logic for each opcode
        stack.insert(0, opcode)
        msg = f"Logic for {opcode.label} not implemented yet.\n{opcode.label} pushed to stack"

    return SimulationStep(script=script, stack=stack, message=msg)


def simulate_step(script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    script_op = script.pop(0)

    if type(script_op) == Data:
        step = push_data(script_op, script, stack)
    elif type(script_op) == Opcode:
        step = process_opcode(script_op, script, stack)
    else:
        print(type(script_op))
        step = SimulationStep(script, stack, message="TYPE ERROR", failed=True)

    return step

def validate(stack: list[ScriptOp]) -> bool:
    # if stack is empty, script is invalid
    if len(stack) == 0:
        return False
    
    # if top of stack is False (zero value), script is invalid
    top = stack[0]
    if top == OP_0 or top == Data(value=0):
        return False
    
    # if top of stack is True (non-zero value), script is valid
    return True

def simulate_script(script: list[ScriptOp]) -> Simulation:
    stack = []
    steps = [SimulationStep(script=script, stack=stack, message="Initial setup")]

    # simulate script execution, step by step
    while script:
        step = simulate_step(script, stack)
        steps.append(step)
        
        if step.failed:
            return Simulation(steps=steps, valid=False)
        
    # verify if script is valid at the end of executing it
    valid_script = validate(stack)

    return Simulation(steps=steps, valid=valid_script)


def print_simulation(sim: Simulation) -> None:
    for i, step in enumerate(sim.steps):
        print(f"Step {i}:")
        print(f"Message: {step.message}")
        print(f"Script: {step.script}")
        print(f"Stack: {step.stack}")
        print(f"Passed: {not step.failed}")
        print()
    
    validity = "Valid" if sim.valid else "Invalid"
    print(f"{validity} script")


def main() -> None:
    script_input = input("Enter Script: ")
    print()

    script = construct_script(script_input)
    simulation = simulate_script(script)
    print_simulation(simulation)


if __name__ == "__main__":
    main()