from pydantic import BaseModel

class ScriptOp(BaseModel):
    category: str = "data"
    
    def __repr__(self) -> str:
        if type(self) == Data:
            return str(self.value)
        elif type(self) == Opcode:
            return str(self.value)
        
    def __str__(self) -> str:
        if type(self) == Data:
            return str(self.value)
        elif type(self) == Opcode:
            return str(self.value)

class Data(ScriptOp):
    value: str | int

class Opcode(ScriptOp):
    value: str
    arg_count: int = 0
    disabled: bool = False

# Constants
OP_0            = Opcode(value='OP_0', category='constants')
OP_PUSHDATA1    = Opcode(value='OP_PUSHDATA1', category='constants')
OP_PUSHDATA2    = Opcode(value='OP_PUSHDATA2', category='constants')
OP_PUSHDATA4    = Opcode(value='OP_PUSHDATA4', category='constants')
OP_1NEGATE      = Opcode(value='OP_1NEGATE', category='constants')
OP_RESERVED     = Opcode(value='OP_RESERVED', category='constants')
OP_1            = Opcode(value='OP_1', category='constants')
OP_2            = Opcode(value='OP_2', category='constants')
OP_3            = Opcode(value='OP_3', category='constants')
OP_4            = Opcode(value='OP_4', category='constants')
OP_5            = Opcode(value='OP_5', category='constants')
OP_6            = Opcode(value='OP_6', category='constants')
OP_7            = Opcode(value='OP_7', category='constants')
OP_8            = Opcode(value='OP_8', category='constants')
OP_9            = Opcode(value='OP_9', category='constants')
OP_10           = Opcode(value='OP_10', category='constants')
OP_11           = Opcode(value='OP_11', category='constants')
OP_12           = Opcode(value='OP_12', category='constants')
OP_13           = Opcode(value='OP_13', category='constants')
OP_14           = Opcode(value='OP_14', category='constants')
OP_15           = Opcode(value='OP_15', category='constants')
OP_16           = Opcode(value='OP_16', category='constants')

# Flow Control
OP_NOP          = Opcode(value='OP_NOP', category='flow control')
OP_VER          = Opcode(value='OP_VER', category='flow control')
OP_IF           = Opcode(value='OP_IF', category='flow control')
OP_NOTIF        = Opcode(value='OP_NOTIF', category='flow control')
OP_VERIF        = Opcode(value='OP_VERIF', category='flow control')
OP_VERNOTIF     = Opcode(value='OP_VERNOTIF', category='flow control')
OP_ELSE         = Opcode(value='OP_ELSE', category='flow control')
OP_ENDIF        = Opcode(value='OP_ENDIF', category='flow control')
OP_VERIFY       = Opcode(value='OP_VERIFY', category='flow control')
OP_RETURN       = Opcode(value='OP_RETURN', category='flow control')

# Stack
OP_TOALTSTACK   = Opcode(value='OP_TOALTSTACK', category='stack')
OP_FROMALTSTACK = Opcode(value='OP_FROMALTSTACK', category='stack')
OP_2DROP        = Opcode(value='OP_2DROP', category='stack', arg_count=2)
OP_2DUP         = Opcode(value='OP_2DUP', category='stack', arg_count=2)
OP_3DUP         = Opcode(value='OP_3DUP', category='stack', arg_count=3)
OP_2OVER        = Opcode(value='OP_2OVER', category='stack', arg_count=4)
OP_2ROT         = Opcode(value='OP_2ROT', category='stack', arg_count=6)
OP_2SWAP        = Opcode(value='OP_2SWAP', category='stack', arg_count=4)
OP_IFDUP        = Opcode(value='OP_IFDUP', category='stack')
OP_DEPTH        = Opcode(value='OP_DEPTH', category='stack', arg_count=0)
OP_DROP         = Opcode(value='OP_DROP', category='stack', arg_count=1)
OP_DUP          = Opcode(value='OP_DUP', category='stack', arg_count=1)
OP_NIP          = Opcode(value='OP_NIP', category='stack')
OP_OVER         = Opcode(value='OP_OVER', category='stack')
OP_PICK         = Opcode(value='OP_PICK', category='stack')
OP_ROLL         = Opcode(value='OP_ROLL', category='stack')
OP_ROT          = Opcode(value='OP_ROT', category='stack')
OP_SWAP         = Opcode(value='OP_SWAP', category='stack')
OP_TUCK         = Opcode(value='OP_TUCK', category='stack')

# Splice
OP_CAT          = Opcode(value='OP_CAT', category='splice', disabled=True)
OP_SUBSTR       = Opcode(value='OP_SUBSTR', category='splice', disabled=True)
OP_LEFT         = Opcode(value='OP_LEFT', category='splice', disabled=True)
OP_RIGHT        = Opcode(value='OP_RIGHT', category='splice', disabled=True)
OP_SIZE         = Opcode(value='OP_SIZE', category='splice')

# Bitwise Logic
OP_INVERT       = Opcode(value='OP_INVERT', category='bitwise logic', disabled=True)
OP_AND          = Opcode(value='OP_AND', category='bitwise logic', disabled=True)
OP_OR           = Opcode(value='OP_OR', category='bitwise logic', disabled=True)
OP_XOR          = Opcode(value='OP_XOR', category='bitwise logic', disabled=True)
OP_EQUAL        = Opcode(value='OP_EQUAL', category='bitwise logic')
OP_EQUALVERIFY  = Opcode(value='OP_EQUALVERIFY', category='bitwise logic')

# Arithmetic
OP_RESERVED1            = Opcode(value='OP_RESERVED1', category='arithmetic')
OP_RESERVED2            = Opcode(value='OP_RESERVED2', category='arithmetic')
OP_1ADD                 = Opcode(value='OP_1ADD', category='arithmetic', arg_count=1)
OP_1SUB                 = Opcode(value='OP_1SUB', category='arithmetic', arg_count=1)
OP_2MUL                 = Opcode(value='OP_2MUL', category='arithmetic', disabled=True)
OP_2DIV                 = Opcode(value='OP_2DIV', category='arithmetic', disabled=True)
OP_NEGATE               = Opcode(value='OP_NEGATE', category='arithmetic', arg_count=1)
OP_ABS                  = Opcode(value='OP_ABS', category='arithmetic', arg_count=1)
OP_NOT                  = Opcode(value='OP_NOT', category='arithmetic', arg_count=1)
OP_0NOTEQUAL            = Opcode(value='OP_0NOTEQUAL', category='arithmetic', arg_count=1)
OP_ADD                  = Opcode(value='OP_ADD', category='arithmetic', arg_count=2)
OP_SUB                  = Opcode(value='OP_SUB', category='arithmetic', arg_count=2)
OP_MUL                  = Opcode(value='OP_MUL', category='arithmetic', arg_count=2, disabled=True)
OP_DIV                  = Opcode(value='OP_DIV', category='arithmetic', arg_count=2, disabled=True)
OP_MOD                  = Opcode(value='OP_MOD', category='arithmetic', arg_count=2, disabled=True)
OP_LSHIFT               = Opcode(value='OP_LSHIFT', category='arithmetic', arg_count=2, disabled=True)
OP_RSHIFT               = Opcode(value='OP_RSHIFT', category='arithmetic', arg_count=2, disabled=True)
OP_BOOLAND              = Opcode(value='OP_BOOLAND', category='arithmetic', arg_count=2)
OP_BOOLOR               = Opcode(value='OP_BOOLOR', category='arithmetic', arg_count=2)
OP_NUMEQUAL             = Opcode(value='OP_NUMEQUAL', category='arithmetic', arg_count=2)
OP_NUMEQUALVERIFY       = Opcode(value='OP_NUMEQUALVERIFY', category='arithmetic', arg_count=2)
OP_NUMNOTEQUAL          = Opcode(value='OP_NUMNOTEQUAL', category='arithmetic', arg_count=2)
OP_LESSTHAN             = Opcode(value='OP_LESSTHAN', category='arithmetic', arg_count=2)
OP_GREATERTHAN          = Opcode(value='OP_GREATERTHAN', category='arithmetic', arg_count=2)
OP_LESSTHANOREQUAL      = Opcode(value='OP_LESSTHANOREQUAL', category='arithmetic', arg_count=2)
OP_GREATERTHANOREQUAL   = Opcode(value='OP_GREATERTHANOREQUAL', category='arithmetic', arg_count=2)
OP_MIN                  = Opcode(value='OP_MIN', category='arithmetic', arg_count=2)
OP_MAX                  = Opcode(value='OP_MAX', category='arithmetic', arg_count=2)
OP_WITHIN               = Opcode(value='OP_WITHIN', category='arithmetic', arg_count=3)

# Crypto
OP_RIPEMD160            = Opcode(value='OP_RIPEMD160', category='crypto')
OP_SHA1                 = Opcode(value='OP_SHA1', category='crypto')
OP_SHA256               = Opcode(value='OP_SHA256', category='crypto')
OP_HASH160              = Opcode(value='OP_HASH160', category='crypto')
OP_HASH256              = Opcode(value='OP_HASH256', category='crypto')
OP_CODESEPARATOR        = Opcode(value='OP_CODESEPARATOR', category='crypto')
OP_CHECKSIG             = Opcode(value='OP_CHECKSIG', category='crypto')
OP_CHECKSIGVERIFY       = Opcode(value='OP_CHECKSIGVERIFY', category='crypto')
OP_CHECKMULTISIG        = Opcode(value='OP_CHECKMULTISIG', category='crypto')
OP_CHECKMULTISIGVERIFY  = Opcode(value='OP_CHECKMULTISIGVERIFY', category='crypto')

# Locktime
OP_CHECKLOCKTIMEVERIFY  = Opcode(value='OP_CHECKLOCKTIMEVERIFY', category='locktime')
OP_CHECKSEQUENCEVERIFY  = Opcode(value='OP_CHECKSEQUENCEVERIFY', category='locktime')


OPCODES = {
    "OP_0": OP_0,
    "OP_PUSHDATA1": OP_PUSHDATA1,
    "OP_PUSHDATA2": OP_PUSHDATA2,
    "OP_PUSHDATA4": OP_PUSHDATA4,
    "OP_1NEGATE": OP_1NEGATE,
    "OP_RESERVED": OP_RESERVED,
    "OP_1": OP_1,
    "OP_2": OP_2,
    "OP_3": OP_3,
    "OP_4": OP_4,
    "OP_5": OP_5,
    "OP_6": OP_6,
    "OP_7": OP_7,
    "OP_8": OP_8,
    "OP_9": OP_9,
    "OP_10": OP_10,
    "OP_11": OP_11,
    "OP_12": OP_12,
    "OP_13": OP_13,
    "OP_14": OP_14,
    "OP_15": OP_15,
    "OP_16": OP_16,

    "OP_NOP": OP_NOP,
    "OP_VER": OP_VER,
    "OP_IF": OP_IF,
    "OP_NOTIF": OP_NOTIF,
    "OP_VERIF": OP_VERIF,
    "OP_VERNOTIF": OP_VERNOTIF,
    "OP_ELSE": OP_ELSE,
    "OP_ENDIF": OP_ENDIF,
    "OP_VERIFY": OP_VERIFY,
    "OP_RETURN": OP_RETURN,

    "OP_TOALTSTACK": OP_TOALTSTACK,
    "OP_FROMALTSTACK": OP_FROMALTSTACK,
    "OP_2DROP": OP_2DROP,
    "OP_2DUP": OP_2DUP,
    "OP_3DUP": OP_3DUP,
    "OP_2OVER": OP_2OVER,
    "OP_2ROT": OP_2ROT,
    "OP_2SWAP": OP_2SWAP,
    "OP_IFDUP": OP_IFDUP,
    "OP_DEPTH": OP_DEPTH,
    "OP_DROP": OP_DROP,
    "OP_DUP": OP_DUP,
    "OP_NIP": OP_NIP,
    "OP_OVER": OP_OVER,
    "OP_PICK": OP_PICK,
    "OP_ROLL": OP_ROLL,
    "OP_ROT": OP_ROT,
    "OP_SWAP": OP_SWAP,
    "OP_TUCK": OP_TUCK,

    "OP_CAT": OP_CAT,
    "OP_SUBSTR": OP_SUBSTR,
    "OP_LEFT": OP_LEFT,
    "OP_RIGHT": OP_RIGHT,
    "OP_SIZE": OP_SIZE,

    "OP_INVERT": OP_INVERT,
    "OP_AND": OP_AND,
    "OP_OR": OP_OR,
    "OP_XOR": OP_XOR,
    "OP_EQUAL": OP_EQUAL,
    "OP_EQUALVERIFY": OP_EQUALVERIFY,

    "OP_RESERVED1": OP_RESERVED1,
    "OP_RESERVED2": OP_RESERVED2,
    "OP_1ADD": OP_1ADD,
    "OP_1SUB": OP_1SUB,
    "OP_2MUL": OP_2MUL,
    "OP_2DIV": OP_2DIV,
    "OP_NEGATE": OP_NEGATE,
    "OP_ABS": OP_ABS,
    "OP_NOT": OP_NOT,
    "OP_0NOTEQUAL": OP_0NOTEQUAL,
    "OP_ADD": OP_ADD,
    "OP_SUB": OP_SUB,
    "OP_MUL": OP_MUL,
    "OP_DIV": OP_DIV,
    "OP_MOD": OP_MOD,
    "OP_LSHIFT": OP_LSHIFT,
    "OP_RSHIFT": OP_RSHIFT,
    "OP_BOOLAND": OP_BOOLAND,
    "OP_BOOLOR": OP_BOOLOR,
    "OP_NUMEQUAL": OP_NUMEQUAL,
    "OP_NUMEQUALVERIFY": OP_NUMEQUALVERIFY,
    "OP_NUMNOTEQUAL": OP_NUMNOTEQUAL,
    "OP_LESSTHAN": OP_LESSTHAN,
    "OP_GREATERTHAN": OP_GREATERTHAN,
    "OP_LESSTHANOREQUAL": OP_LESSTHANOREQUAL,
    "OP_GREATERTHANOREQUAL": OP_GREATERTHANOREQUAL,
    "OP_MIN": OP_MIN,
    "OP_MAX": OP_MAX,
    "OP_WITHIN": OP_WITHIN,

    "OP_RIPEMD160": OP_RIPEMD160,
    "OP_SHA1": OP_SHA1,
    "OP_SHA256": OP_SHA256,
    "OP_HASH160": OP_HASH160,
    "OP_HASH256": OP_HASH256,
    "OP_CODESEPARATOR": OP_CODESEPARATOR,
    "OP_CHECKSIG": OP_CHECKSIG,
    "OP_CHECKSIGVERIFY": OP_CHECKSIGVERIFY,
    "OP_CHECKMULTISIG": OP_CHECKMULTISIG,
    "OP_CHECKMULTISIGVERIFY": OP_CHECKMULTISIGVERIFY, 

    "OP_CHECKLOCKTIMEVERIFY": OP_CHECKLOCKTIMEVERIFY,
    "OP_CHECKSEQUENCEVERIFY": OP_CHECKSEQUENCEVERIFY,
}

# Opcodes that take ONE value as input, and returns one value as output
UNARY_OPS = [
    OP_1ADD,
    OP_1SUB,
    OP_NEGATE,
    OP_ABS,
    OP_NOT,
    OP_0NOTEQUAL,
]

# Opcodes that take TWO values as inputs, and returns ONE value as output
BINARY_OPS = [
    OP_ADD,
    OP_SUB,
    OP_BOOLAND,
    OP_BOOLOR,
    OP_NUMEQUAL,
    OP_NUMEQUALVERIFY,
    OP_NUMNOTEQUAL,
    OP_LESSTHAN,
    OP_GREATERTHAN,
    OP_LESSTHANOREQUAL,
    OP_GREATERTHANOREQUAL,
    OP_MIN,
    OP_MAX,
]

# Opcodes that modify the stack
STACK_OPS = [
    OP_DEPTH,
    OP_DUP,
    OP_DROP,
    OP_2DROP,
    OP_2DUP,
    OP_2OVER,
    OP_2ROT,
    OP_2SWAP,
    OP_3DUP,
]

def str_to_op(s: str):
    if OPCODES.get(s) != None:
        return OPCODES[s]

    match s:
        case "SIGNATURE" | "PUBKEY": val = s
        case _: val = int(s)

    return Data(value=val)


def construct_script(script: str) -> list[ScriptOp]:
    return [str_to_op(op) for op in script.split()]