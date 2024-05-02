from opcodes import *
from pydantic import BaseModel


class SimulationStep(BaseModel):
    script: list[Opcode | Data]
    stack: list[Opcode | Data]
    message: str | None = None
    failed: bool = False

class Simulation(BaseModel):
    steps: list[SimulationStep]
    valid: bool



def enough_args(arg_count: int, stack: list[ScriptOp]) -> bool: 
    return arg_count <= len(stack)


def check_sig(signature: Data, pubkey: Data) -> bool:
    if not is_signature(signature) or not is_pubkey(pubkey):
        return False
    
    if signature.value[3:] == pubkey.value[2:]:
        return True
    else:
        return False


def check_multisig(signatures: list[Data], pubkeys: list[Data], sig_count: int, pk_count: int) -> bool:
    for sig in signatures:
        if not is_signature(sig):
            return False
    
    for pk in pubkeys:
        if not is_pubkey(pk):
            return False

    verified_pairs = []
    for sig in signatures:
        for pk in pubkeys:
            if (sig, pk) not in verified_pairs and check_sig(sig, pk):
                verified_pairs.append((sig, pk))

    if len(verified_pairs) >= sig_count:
        return True
    else:
        return False
    

def is_pubkey(pubkey: Data) -> bool:
    return pubkey.value.startswith("PK")

def is_signature(signature: Data) -> bool:
    return signature.value.startswith("SIG")


def push_data(data: Data, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    stack.insert(0, data)
    message = f"Pushed <{data.value}> to stack"
    
    return SimulationStep(script=script, stack=stack, message=message)


def unary_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operand = stack.pop(0).value

    operation = opcode.value[3:]
    msg = f"Performed {operation} on <{operand}>; "

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
    msg += f"Pushed <{result}> to stack"
    
    return SimulationStep(script=script, stack=stack, message=msg)


def binary_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    op1 = stack.pop(0).value
    op2 = stack.pop(0).value
    
    operation = opcode.value[3:]
    msg = f"Performed {operation} on <{op1}> and <{op2}>; " 

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
            msg += "Verify passed; "
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
    msg += f"Pushed <{result}> to stack"

    return SimulationStep(script=script, stack=stack, message=msg)


# swaps elements at idx1 and idx2 of stack, and then returns them
def swap(idx1: int, idx2: int, stack: list[ScriptOp]) -> tuple[ScriptOp,ScriptOp]:
    temp = stack[idx1]
    stack[idx1] = stack[idx2]
    stack[idx2] = temp

    return stack[idx1], temp 


def stack_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operation = opcode.value[3:]
    msg = f"Performed {operation}; " 
    
    if opcode == OP_DEPTH:
        depth = len(stack)
        msg += f"Pushed <{depth}> to stack"
    elif opcode == OP_DUP:
        first = stack[0]
        stack.insert(0, first)
        msg += f"Duplicated <{first}>, and pushed it to stack"
    elif opcode == OP_DROP:
        first = stack.pop(0)
        msg += f"Popped <{first}> from stack"
    elif opcode == OP_2DROP:
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
    elif opcode == OP_IFDUP:
        top = stack[0]
        if bool(top) == True:
            stack.insert(0, top)
            msg += f"<{top}> is true; Duplicated <{top}>, and pushed it to stack"
        else:
            msg += f"<{top}> is false; Stack is left the same"
    elif opcode == OP_NIP:
        second = stack.pop(1)
        msg += f"Popped <{second}> from stack"
    elif opcode == OP_OVER:
        second = stack[1]
        stack.insert(0, second)
        msg += f"Duplicated <{second}>, and pushed it to stack"
    elif opcode == OP_PICK or opcode == OP_ROLL:
        n = stack.pop(0)
        if not (0 <= n < len(stack)):
            msg += f"<{n}> out of bounds [0, {len(stack)}]"
            return SimulationStep(script=script, stack=stack, message=msg, failed=True)
        
        x = stack[n]
        if opcode == OP_ROLL:
            stack.pop(n)
            msg += f"Popped element at position {n}; "
        else:
            msg += f"Duplicated element at position {n}; "

        stack.insert(0, x)
        msg += f"Pushed <{x}> to stack"
    elif opcode == OP_ROT:
        third = stack.pop(2)
        stack.insert(0, third)
        msg += f"Moved <{third}> to top of stack"
    elif opcode == OP_SWAP:
        first, second = swap(0, 1, stack)
        msg += f"Swapped <{first}> and <{second}>"
    elif opcode == OP_TUCK:
        top = stack[0]
        stack.insert(2, top)
        msg += f"Duplicated <{top}> and inserted it after the second element"
    else:
        msg = f"STACK OPERATION ERROR: (OPCODE: {opcode})"
        return SimulationStep(script=script, stack=stack, message=msg, failed=True)

    return SimulationStep(script=script, stack=stack, message=msg)


def signature_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operation = opcode.value[3:]
    msg = f"Performed {operation}; "


    if opcode == OP_CHECKSIG or OP_CHECKSIGVERIFY:
        pubkey = stack.pop(0)
        signature = stack.pop(0)

        if check_sig(signature, pubkey):
            stack.insert(0, Data(value=1))
            msg += f"Checksig on pubkey <{pubkey.value}> passed with signature <{signature.value}>; Pushed <1> to stack"
        else:
            stack.insert(0, Data(value=0))
            msg += f"Checksig on pubkey <{pubkey.value}> failed with signature <{signature.value}>; Pushed <0> to stack"

        if opcode == OP_CHECKSIGVERIFY:
            if check_sig(signature, pubkey):
                msg += "; Verify Passed"
            else:
                msg += "; Verify Failed"
                return SimulationStep(script=script, stack=stack, message=msg, failed=True)

        return SimulationStep(script=script, stack=stack, message=msg)


    elif opcode == OP_CHECKMULTISIG or opcode == OP_CHECKMULTISIGVERIFY:
        num_pubkeys = stack.pop(0)
        if num_pubkeys >= len(stack):
            msg += f"Too many pubkeys required, number of necessary pubkeys specified: <{num_pubkeys}>, stack size: <{len(stack)}>; Checkmultisig failed"
            return SimulationStep(script=script, stack=stack, message=msg, failed=True)
                    
        pubkeys = []
        for _ in range(num_pubkeys):
            pubkey = stack.pop(0)
            if not is_pubkey(pubkey):
                msg += f"Not enough pubkeys, needed <{num_pubkeys}>, received <{len(pubkeys)}>; Checkmultisig failed"
                return SimulationStep(script=script, stack=stack, message=msg, failed=True)
            
            pubkeys.append(pubkey)

        num_signatures = stack.pop(0)
        if num_signatures >= len(stack) or num_signatures > num_pubkeys:
            msg += f"Too many signatures required, number of necessary signatures specified: <{num_pubkeys}>, stack size: <{len(stack)}>; Checkmultisig failed"
            return SimulationStep(script=script, stack=stack, message=msg, failed=True)

        signatures = []
        for _ in range(num_signatures):
            signature = stack.pop(0)
            if not is_signature(signature):
                msg += f"Not enough signatures, needed <{num_signatures}>, received <{len(signatures)}>; Checkmultisig failed"
                return SimulationStep(script=script, stack=stack, message=msg, failed=True)

        multisig_result = check_multisig(pubkeys, signatures, num_signatures, num_pubkeys)
        if multisig_result:
            stack.insert(0, Data(value=1))
            msg += f"Checkmultisig passed; Pushed <1> to stack"
        else:
            stack.insert(0, Data(value=0))
            msg += f"Checkmultisig failed; Pushed <0> to stack"

        if opcode == OP_CHECKMULTISIGVERIFY:
            if multisig_result:
                msg += "; Verify Passed"
            else:
                msg += "; Verify Failed"
                return SimulationStep(script=script, stack=stack, message=msg, failed=True)
        
        return SimulationStep(script=script, stack=stack, message=msg)
    
    else:
        msg = f"EQUALITY OPERATION ERROR: (OPCODE: {opcode})"
        return SimulationStep(script=script, stack=stack, message=msg, failed=True)


def equality_operation(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    operation = opcode.value[3:]
    msg = f"Performed {operation}; "

    if opcode == OP_EQUAL:
        first, second = stack.pop(0), stack.pop(0)
        if first == second:
            stack.insert(0, Data(value=1))  # insert 1 if it is not equal
            msg += f"<{first}> is equal to <{second}>; Pushed <1> to stack"
        else:
            stack.insert(0, Data(value=0))  # insert 0 if it is not equal
            msg += f"<{first}> is not equal to <{second}>; Pushed <0> to stack"

        return SimulationStep(script=script, stack=stack, message=msg)

    elif opcode == OP_EQUALVERIFY:
        first, second = stack.pop(0), stack.pop(0)
        if first == second:
            stack.insert(0, Data(value=1))  # insert 1 if it is not equal
            msg += f"<{first}> is equal to <{second}>; Pushed <1> to stack; Verify Passed"
            return SimulationStep(script=script, stack=stack, message=msg)
        else:
            stack.insert(0, Data(value=0))  # insert 0 if it is not equal
            msg += f"<{first}> is not equal to <{second}>; Pushed <0> to stack; Verify Failed"
            return SimulationStep(script=script, stack=stack, message=msg, failed=True)

    else: 
        msg = f"EQUALITY OPERATION ERROR: (OPCODE: {opcode})"
        return SimulationStep(script=script, stack=stack, message=msg, failed=True)



def process_opcode(opcode: Opcode, script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    if opcode.disabled:
        message = f"{opcode.value} is disabled"
        return SimulationStep(script=script, stack=stack, message=message, failed=True)
    
    if not enough_args(opcode.arg_count, stack):
        message = f"{opcode.value} requires {opcode.arg_count} arguments but was given {len(stack)}"
        return SimulationStep(script=script, stack=stack, message=message, failed=True)


    if opcode in UNARY_OPS:     
        return unary_operation(opcode, script, stack)
    elif opcode in BINARY_OPS:
        return binary_operation(opcode, script, stack)
    elif opcode in STACK_OPS:   
        return stack_operation(opcode, script, stack)
    elif opcode in SIGNATURE_OPS:
        return signature_operation(opcode, script, stack)
    elif opcode in EQUALITY_OPS:
        return equality_operation(opcode, script, stack)
    elif opcode == OP_VERIFY:
        top = stack.pop(0)

        msg = f"Performed verify on {top}; Verify "
        msg += "passed" if bool(top) else "failed"

        return SimulationStep(script=script, stack=stack, message=msg, failed=bool(top))
            
    elif opcode == OP_WITHIN:
        hi = stack.pop(0)
        lo = stack.pop(0)
        x = stack.pop(0)
        if lo <= x < hi:
            stack.insert(0, Data(value=1))  # insert 1 if it is in range
            msg = f"<{x}> is within range [{lo}, {hi}); Pushed <1> to stack"
        else :
            stack.insert(0, Data(value=0))  # insert 0 if it is out of range
            msg = f"<{x}> is NOT within range [{lo}, {hi}); Pushed <0> to stack"

        return SimulationStep(script=script, stack=stack, message=msg)

    else:
        # TODO: implement logic for each opcode
        stack.insert(0, opcode)
        msg = f"Logic for {opcode.value} not implemented yet; {opcode.value} pushed to stack"

    return SimulationStep(script=script, stack=stack, message=msg)


def simulate_step(script: list[ScriptOp], stack: list[ScriptOp]) -> SimulationStep:
    script_op = script.pop(0)

    if type(script_op) == Data:
        step = push_data(script_op, script, stack)
    elif type(script_op) == Opcode:
        step = process_opcode(script_op, script, stack)
    else:
        print(type(script_op))
        step = SimulationStep(script, stack, message=f"TYPE ERROR: (TYPE={type(script_op)})", failed=True)

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