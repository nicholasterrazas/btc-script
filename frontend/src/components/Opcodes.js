// source: https://en.bitcoin.it/wiki/Script

export const OPCODES = [
    // constants
    {
        label: 'OP_0',
        opcode: 0, 
        hex: '0x00', 
        input: 'Nothing.', 
        output: '(empty value)', 
        description: 'An empty array of bytes is pushed onto the stack. (This is not a no-op: an item is added to the stack.)',
        category: 'constants'
    },
    {
        label: 'OP_PUSHDATA1',
        opcode: 76,
        hex: '0x4c',
        input: '(special)',
        output: 'data',
        description: 'The next byte contains the number of bytes to be pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_PUSHDATA2',
        opcode: 77,
        hex: '0x4d',
        input: '(special)',
        output: 'data',
        description: 'The next two bytes contain the number of bytes to be pushed onto the stack in little endian order.',
        category: 'constants'
    },
    {
        label: 'OP_PUSHDATA4',
        opcode: 78,
        hex: '0x4e',
        input: '(special)',
        output: 'data',
        description: 'The next four bytes contain the number of bytes to be pushed onto the stack in little endian order.',
        category: 'constants'
    },
    {
        label: 'OP_1NEGATE',
        opcode: 79,
        hex: '0x4f',
        input: 'Nothing.',
        output: '-1',
        description: 'The number -1 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_TRUE',
        opcode: 81,
        hex: '0x51',
        input: 'Nothing.',
        output: '1',
        description: 'The number 1 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_1',
        opcode: 81,
        hex: '0x51',
        input: 'Nothing.',
        output: '1',
        description: 'The number 1 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_2',
        opcode: 82,
        hex: '0x52',
        input: 'Nothing.',
        output: '2',
        description: 'The number 2 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_3',
        opcode: 83,
        hex: '0x53',
        input: 'Nothing.',
        output: '3',
        description: 'The number 3 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_4',
        opcode: 84,
        hex: '0x54',
        input: 'Nothing.',
        output: '4',
        description: 'The number 4 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_5',
        opcode: 85,
        hex: '0x55',
        input: 'Nothing.',
        output: '5',
        description: 'The number 5 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_6',
        opcode: 86,
        hex: '0x56',
        input: 'Nothing.',
        output: '6',
        description: 'The number 6 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_7',
        opcode: 87,
        hex: '0x57',
        input: 'Nothing.',
        output: '7',
        description: 'The number 7 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_8',
        opcode: 88,
        hex: '0x58',
        input: 'Nothing.',
        output: '8',
        description: 'The number 8 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_9',
        opcode: 89,
        hex: '0x59',
        input: 'Nothing.',
        output: '9',
        description: 'The number 9 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_10',
        opcode: 90,
        hex: '0x5a',
        input: 'Nothing.',
        output: '10',
        description: 'The number 10 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_11',
        opcode: 91,
        hex: '0x5b',
        input: 'Nothing.',
        output: '11',
        description: 'The number 11 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_12',
        opcode: 92,
        hex: '0x5c',
        input: 'Nothing.',
        output: '12',
        description: 'The number 12 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_13',
        opcode: 93,
        hex: '0x5d',
        input: 'Nothing.',
        output: '13',
        description: 'The number 13 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_14',
        opcode: 94,
        hex: '0x5e',
        input: 'Nothing.',
        output: '14',
        description: 'The number 14 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_15',
        opcode: 95,
        hex: '0x5f',
        input: 'Nothing.',
        output: '15',
        description: 'The number 15 is pushed onto the stack.',
        category: 'constants'
    },
    {
        label: 'OP_16',
        opcode: 96,
        hex: '0x60',
        input: 'Nothing.',
        output: '16',
        description: 'The number 16 is pushed onto the stack.',
        category: 'constants'
    },
    
    // flow control
    {
        label: 'OP_NOP',
        opcode: 97,
        hex: '0x61',
        input: 'Nothing.',
        output: 'Nothing',
        description: 'Does nothing.',
        category: 'flow control'
    },
    {
        label: 'OP_IF',
        opcode: 99,
        hex: '0x63',
        input: '<expression> if [statements] [else [statements]]* endif',
        output: 'Nothing', 
        description: 'If the top stack value is not False, the statements are executed. The top stack value is removed.',
        category: 'flow control'
    },
    {
        label: 'OP_NOTIF',
        opcode: 100,
        hex: '0x64',
        input: '<expression> notif [statements] [else [statements]]* endif',
        output: 'Nothing', 
        description: 'If the top stack value is False, the statements are executed. The top stack value is removed.',
        category: 'flow control'
    },
    {
        label: 'OP_ELSE',
        opcode: 103,
        hex: '0x67',
        input: '<expression> if [statements] [else [statements]]* endif',
        output: 'Nothing', 
        description: 'If the preceding OP_IF or OP_NOTIF or OP_ELSE was not executed then these statements are and if the preceding OP_IF or OP_NOTIF or OP_ELSE was executed then these statements are not.',
        category: 'flow control'
    },
    {
        label: 'OP_ENDIF',
        opcode: 104,
        hex: '0x68',
        input: '<expression> if [statements] [else [statements]]* endif',
        output: 'Nothing', 
        description: 'Ends an if/else block. All blocks must end, or the transaction is invalid. An OP_ENDIF without OP_IF earlier is also invalid.',
        category: 'flow control'
    },
    {
        label: 'OP_VERIFY',
        opcode: 105,
        hex: '0x69',
        input: 'True / false',
        output: 'Nothing / fail',
        description: 'Marks transaction as invalid if top stack value is not true. The top stack value is removed.',
        category: 'flow control'
    },
    {
        label: 'OP_RETURN',
        opcode: 106,
        hex: '0x6a',
        input: 'Nothing',
        output: 'fail',
        description: 'Marks transaction as invalid. Since bitcoin 0.9, a standard way of attaching extra data to transactions is to add a zero-value output with a scriptPubKey consisting of OP_RETURN followed by data.',
        category: 'flow control'
    },

    // stack
    {
        label: 'OP_TOALTSTACK',
        opcode: 107,
        hex: '0x6b',
        input: 'x1',
        output: '(alt)x1',
        description: 'Puts the input onto the top of the alt stack. Removes it from the main stack.',
        category: 'stack'
    },
    {
        label: 'OP_FROMALTSTACK',
        opcode: 108,
        hex: '0x6c',
        input: '(alt)x1',
        output: 'x1',
        description: 'Puts the input onto the top of the main stack. Removes it from the alt stack.',
        category: 'stack'
    },
    {
        label: 'OP_IFDUP',
        opcode: 115,
        hex: '0x73',
        input: 'x',
        output: 'x / x x',
        description: 'If the top stack value is not 0, duplicate it.',
        category: 'stack'
    },
    {
        label: 'OP_DEPTH',
        opcode: 116,
        hex: '0x74',
        input: 'Nothing',
        output: '<Stack size>',
        description: 'Puts the number of stack items onto the stack.',
        category: 'stack'
    },
    {
        label: 'OP_DROP',
        opcode: 117,
        hex: '0x75',
        input: 'x',
        output: 'Nothing',
        description: 'Removes the top stack item.',
        category: 'stack'
    },
    {
        label: 'OP_DUP',
        opcode: 118,
        hex: '0x76',
        input: 'x',
        output: 'x x',
        description: 'Duplicates the top stack item.',
        category: 'stack'
    },
    {
        label: 'OP_NIP',
        opcode: 119,
        hex: '0x77',
        input: 'x1 x2',
        output: 'x2',
        description: 'Removes the second-to-top stack item.',
        category: 'stack'
    },
    {
        label: 'OP_OVER',
        opcode: 120,
        hex: '0x78',
        input: 'x1 x2',
        output: 'x1 x2 x1',
        description: 'Copies the second-to-top stack item to the top.',
        category: 'stack'
    },
    {
        label: 'OP_PICK',
        opcode: 121,
        hex: '0x79',
        input: 'xn ... x2 x1 x0 <n>',
        output: 'xn ... x2 x1 x0 xn',
        description: 'The item n back in the stack is copied to the top.',
        category: 'stack'
    },
    {
        label: 'OP_ROLL',
        opcode: 122,
        hex: '0x7a',
        input: 'xn ... x2 x1 x0 <n>',
        output: '... x2 x1 x0 xn',
        description: 'The item n back in the stack is moved to the top.',
        category: 'stack'
    },
    {
        label: 'OP_ROT',
        opcode: 123,
        hex: '0x7b',
        input: 'x1 x2 x3',
        output: 'x2 x3 x1',
        description: 'The 3rd item down the stack is moved to the top.',
        category: 'stack'
    },
    {
        label: 'OP_SWAP',
        opcode: 124,
        hex: '0x7c',
        input: 'x1 x2',
        output: 'x2 x1',
        description: 'The top two items on the stack are swapped.',
        category: 'stack'
    },
    {
        label: 'OP_TUCK',
        opcode: 125,
        hex: '0x7d',
        input: 'x1 x2',
        output: 'x2 x1 x2',
        description: 'The item at the top of the stack is copied and inserted before the second-to-top item.',
        category: 'stack'
    },
    {
        label: 'OP_2DROP',
        opcode: 109,
        hex: '0x6d',
        input: 'x1 x2',
        output: 'Nothing',
        description: 'Removes the top two stack items.',
        category: 'stack'
    },
    {
        label: 'OP_2DUP',
        opcode: 110,
        hex: '0x6e',
        input: 'x1 x2',
        output: 'x1 x2 x1 x2',
        description: 'Duplicates the top two stack items.',
        category: 'stack'
    },
    {
        label: 'OP_3DUP',
        opcode: 111,
        hex: '0x6f',
        input: 'x1 x2 x3',
        output: 'x1 x2 x3 x1 x2 x3',
        description: 'Duplicates the top three stack items.',
        category: 'stack'
    },
    {
        label: 'OP_2OVER',
        opcode: 112,
        hex: '0x70',
        input: 'x1 x2 x3 x4',
        output: 'x1 x2 x3 x4 x1 x2',
        description: 'Copies the pair of items two spaces back in the stack to the front.',
        category: 'stack'
    },
    {
        label: 'OP_2ROT',
        opcode: 113,
        hex: '0x71',
        input: 'x1 x2 x3 x4 x5 x6',
        output: 'x3 x4 x5 x6 x1 x2',
        description: 'The fifth and sixth items back are moved to the top of the stack.',
        category: 'stack'
    },
    {
        label: 'OP_2SWAP',
        opcode: 114,
        hex: '0x72',
        input: 'x1 x2 x3 x4',
        output: 'x3 x4 x1 x2',
        description: 'Swaps the top two pairs of items.',
        category: 'stack'
    },

    // splice
    {
        label: 'OP_CAT',
        opcode: 126,
        hex: '0x7e',
        input: 'x1 x2',
        output: 'out',
        description: 'Concatenates two strings. disabled.',
        category: 'splice',
        disabled: true
    },
    {
        label: 'OP_SUBSTR',
        opcode: 127,
        hex: '0x7f',
        input: 'in begin size',
        output: 'out',
        description: 'Returns a section of a string. disabled.',
        category: 'splice',
        disabled: true
    },
    {
        label: 'OP_LEFT',
        opcode: 128,
        hex: '0x80',
        input: 'in size',
        output: 'out',
        description: 'Keeps only characters left of the specified point in a string. disabled.',
        category: 'splice',
        disabled: true
    },
    {
        label: 'OP_RIGHT',
        opcode: 129,
        hex: '0x81',
        input: 'in size',
        output: 'out',
        description: 'Keeps only characters right of the specified point in a string. disabled.',
        category: 'splice',
        disabled: true
    },
    {
        label: 'OP_SIZE',
        opcode: 130,
        hex: '0x82',
        input: 'in',
        output: 'size',
        description: 'Pushes the string length of the top element of the stack (without popping it).',
        category: 'splice'
    },

    // bitwise logic
    {
        label: 'OP_INVERT',
        opcode: 131,
        hex: '0x83',
        input: 'in',
        output: 'out',
        description: 'Flips all of the bits in the input. disabled.',
        category: 'bitwise logic',
        disabled: true
    },
    {
        label: 'OP_AND',
        opcode: 132,
        hex: '0x84',
        input: 'x1 x2',
        output: 'out',
        description: 'Boolean and between each bit in the inputs. disabled.',
        category: 'bitwise logic',
        disabled: true
    },
    {
        label: 'OP_OR',
        opcode: 133,
        hex: '0x85',
        input: 'x1 x2',
        output: 'out',
        description: 'Boolean or between each bit in the inputs. disabled.',
        category: 'bitwise logic',
        disabled: true
    },
    {
        label: 'OP_XOR',
        opcode: 134,
        hex: '0x86',
        input: 'x1 x2',
        output: 'out',
        description: 'Boolean exclusive or between each bit in the inputs. disabled.',
        category: 'bitwise logic',
        disabled: true
    },
    {
        label: 'OP_EQUAL',
        opcode: 135,
        hex: '0x87',
        input: 'x1 x2',
        output: 'True / false',
        description: 'Returns 1 if the inputs are exactly equal, 0 otherwise.',
        category: 'bitwise logic'
    },
    {
        label: 'OP_EQUALVERIFY',
        opcode: 136,
        hex: '0x88',
        input: 'x1 x2',
        output: 'Nothing / fail',
        description: 'Same as OP_EQUAL, but runs OP_VERIFY afterward.',
        category: 'bitwise logic'
    },

    // arithmetic
    {
        label: 'OP_1ADD',
        opcode: 139,
        hex: '0x8b',
        input: 'in',
        output: 'out',
        description: '1 is added to the input.',
        category: 'arithmetic'
    },
    {
        label: 'OP_1SUB',
        opcode: 140,
        hex: '0x8c',
        input: 'in',
        output: 'out',
        description: '1 is subtracted from the input.',
        category: 'arithmetic'
    },
    {
        label: 'OP_2MUL',
        opcode: 141,
        hex: '0x8d',
        input: 'in',
        output: 'out',
        description: 'The input is multiplied by 2. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_2DIV',
        opcode: 142,
        hex: '0x8e',
        input: 'in',
        output: 'out',
        description: 'The input is divided by 2. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_NEGATE',
        opcode: 143,
        hex: '0x8f',
        input: 'in',
        output: 'out',
        description: 'The sign of the input is flipped.',
        category: 'arithmetic'
    },
    {
        label: 'OP_ABS',
        opcode: 144,
        hex: '0x90',
        input: 'in',
        output: 'out',
        description: 'The input is made positive.',
        category: 'arithmetic'
    },
    {
        label: 'OP_NOT',
        opcode: 145,
        hex: '0x91',
        input: 'in',
        output: 'out',
        description: 'If the input is 0 or 1, it is flipped. Otherwise the output will be 0.',
        category: 'arithmetic'
    },
    {
        label: 'OP_0NOTEQUAL',
        opcode: 146,
        hex: '0x92',
        input: 'in',
        output: 'out',
        description: 'Returns 0 if the input is 0. 1 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_ADD',
        opcode: 147,
        hex: '0x93',
        input: 'a b',
        output: 'out',
        description: 'a is added to b.',
        category: 'arithmetic'
    },
    {
        label: 'OP_SUB',
        opcode: 148,
        hex: '0x94',
        input: 'a b',
        output: 'out',
        description: 'b is subtracted from a.',
        category: 'arithmetic'
    },
    {
        label: 'OP_MUL',
        opcode: 149,
        hex: '0x95',
        input: 'a b',
        output: 'out',
        description: 'a is multiplied by b. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_DIV',
        opcode: 150,
        hex: '0x96',
        input: 'a b',
        output: 'out',
        description: 'a is divided by b. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_MOD',
        opcode: 151,
        hex: '0x97',
        input: 'a b',
        output: 'out',
        description: 'Returns the remainder after dividing a by b. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_LSHIFT',
        opcode: 152,
        hex: '0x98',
        input: 'a b',
        output: 'out',
        description: 'Shifts a left b bits, preserving sign. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_RSHIFT',
        opcode: 153,
        hex: '0x99',
        input: 'a b',
        output: 'out',
        description: 'Shifts a right b bits, preserving sign. disabled.',
        category: 'arithmetic',
        disabled: true
    },
    {
        label: 'OP_BOOLAND',
        opcode: 154,
        hex: '0x9a',
        input: 'a b',
        output: 'out',
        description: 'If both a and b are not 0, the output is 1. Otherwise 0.',
        category: 'arithmetic'
    },
    {
        label: 'OP_BOOLOR',
        opcode: 155,
        hex: '0x9b',
        input: 'a b',
        output: 'out',
        description: 'If a or b is not 0, the output is 1. Otherwise 0.',
        category: 'arithmetic'
    },
    {
        label: 'OP_NUMEQUAL',
        opcode: 156,
        hex: '0x9c',
        input: 'a b',
        output: 'out',
        description: 'Returns 1 if the numbers are equal, 0 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_NUMEQUALVERIFY',
        opcode: 157,
        hex: '0x9d',
        input: 'a b',
        output: 'Nothing / fail',
        description: 'Same as OP_NUMEQUAL, but runs OP_VERIFY afterward.',
        category: 'arithmetic'
    },
    {
        label: 'OP_NUMNOTEQUAL',
        opcode: 158,
        hex: '0x9e',
        input: 'a b',
        output: 'out',
        description: 'Returns 1 if the numbers are not equal, 0 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_LESSTHAN',
        opcode: 159,
        hex: '0x9f',
        input: 'a b',
        output: 'out',
        description: 'Returns 1 if a is less than b, 0 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_GREATERTHAN',
        opcode: 160,
        hex: '0xa0',
        input: 'a b',
        output: 'out',
        description: 'Returns 1 if a is greater than b, 0 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_LESSTHANOREQUAL',
        opcode: 161,
        hex: '0xa1',
        input: 'a b',
        output: 'out',
        description: 'Returns 1 if a is less than or equal to b, 0 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_GREATERTHANOREQUAL',
        opcode: 162,
        hex: '0xa2',
        input: 'a b',
        output: 'out',
        description: 'Returns 1 if a is greater than or equal to b, 0 otherwise.',
        category: 'arithmetic'
    },
    {
        label: 'OP_MIN',
        opcode: 163,
        hex: '0xa3',
        input: 'a b',
        output: 'out',
        description: 'Returns the smaller of a and b.',
        category: 'arithmetic'
    },
    {
        label: 'OP_MAX',
        opcode: 164,
        hex: '0xa4',
        input: 'a b',
        output: 'out',
        description: 'Returns the larger of a and b.',
        category: 'arithmetic'
    },
    {
        label: 'OP_WITHIN',
        opcode: 165,
        hex: '0xa5',
        input: 'x min max',
        output: 'out',
        description: 'Returns 1 if x is within the specified range (left-inclusive), 0 otherwise.',
        category: 'arithmetic'
    },

    // crypto
    {
        label: 'OP_RIPEMD160',
        opcode: 166,
        hex: '0xa6',
        input: 'in',
        output: 'hash',
        description: 'The input is hashed using RIPEMD-160.',
        category: 'crypto'
    },
    {
        label: 'OP_SHA1',
        opcode: 167,
        hex: '0xa7',
        input: 'in',
        output: 'hash',
        description: 'The input is hashed using SHA-1.',
        category: 'crypto'
    },
    {
        label: 'OP_SHA256',
        opcode: 168,
        hex: '0xa8',
        input: 'in',
        output: 'hash',
        description: 'The input is hashed using SHA-256.',
        category: 'crypto'
    },
    {
        label: 'OP_HASH160',
        opcode: 169,
        hex: '0xa9',
        input: 'in',
        output: 'hash',
        description: 'The input is hashed twice: first with SHA-256 and then with RIPEMD-160.',
        category: 'crypto'
    },
    {
        label: 'OP_HASH256',
        opcode: 170,
        hex: '0xaa',
        input: 'in',
        output: 'hash',
        description: 'The input is hashed two times with SHA-256.',
        category: 'crypto'
    },
    {
        label: 'OP_CODESEPARATOR',
        opcode: 171,
        hex: '0xab',
        input: 'Nothing',
        output: 'Nothing',
        description: 'All of the signature checking words will only match signatures to the data after the most recently-executed OP_CODESEPARATOR.',
        category: 'crypto'
    },
    {
        label: 'OP_CHECKSIG',
        opcode: 172,
        hex: '0xac',
        input: 'sig pubkey',
        output: 'True / false',
        description: "The entire transaction's outputs, inputs, and script (from the most recently-executed OP_CODESEPARATOR to the end) are hashed. The signature used by OP_CHECKSIG must be a valid signature for this hash and public key. If it is, 1 is returned, 0 otherwise.",
        category: 'crypto'
    },
    {
        label: 'OP_CHECKSIGVERIFY',
        opcode: 173,
        hex: '0xad',
        input: 'sig pubkey',
        output: 'Nothing / fail',
        description: 'Same as OP_CHECKSIG, but OP_VERIFY is executed afterward.',
        category: 'crypto'
    },
    {
        label: 'OP_CHECKMULTISIG',
        opcode: 174,
        hex: '0xae',
        input: 'x sig1 sig2 ... <number of signatures> pub1 pub2 <number of public keys>',
        output: 'True / False',
        description: 'Compares the first signature against each public key until it finds an ECDSA match. Starting with the subsequent public key, it compares the second signature against each remaining public key until it finds an ECDSA match. The process is repeated until all signatures have been checked or not enough public keys remain to produce a successful result. All signatures need to match a public key. If all signatures are valid, 1 is returned, 0 otherwise.',
        category: 'crypto'
    },
    {
        label: 'OP_CHECKMULTISIGVERIFY',
        opcode: 175,
        hex: '0xaf',
        input: 'x sig1 sig2 ... <number of signatures> pub1 pub2 ... <number of public keys>',
        output: 'Nothing / fail',
        description: 'Same as OP_CHECKMULTISIG, but OP_VERIFY is executed afterward.',
        category: 'crypto'
    },
    {
        label: 'OP_CHECKSIGADD',
        opcode: 186,
        hex: '0xba',
        input: 'sig n pub',
        output: 'out',
        description: 'Three values are popped from the stack. The integer n is incremented by one and returned to the stack if the signature is valid for the public key and transaction. The integer n is returned to the stack unchanged if the signature is the empty vector (OP_0). In any other case, the script is invalid. This opcode is only available in tapscript.',
        category: 'crypto'
    },

    // locktime
    {
        label: 'OP_CHECKLOCKTIMEVERIFY',
        opcode: 177,
        hex: '0xb1',
        input: 'x',
        output: 'x / fail',
        description: "Marks transaction as invalid if the top stack item is greater than the transaction's nLockTime field, otherwise script evaluation continues as though an OP_NOP was executed. Transaction is also invalid if 1. the stack is empty; or 2. the top stack item is negative; or 3. the top stack item is greater than or equal to 500000000 while the transaction's nLockTime field is less than 500000000, or vice versa; or 4. the input's nSequence field is equal to 0xffffffff. The precise semantics are described in BIP 0065.",
        category: 'locktime'
    },
    {
        label: 'OP_CHECKSEQUENCEVERIFY',
        opcode: 178,
        hex: '0xb2',
        input: 'x',
        output: 'x / fail',
        description: "Marks transaction as invalid if the relative lock time of the input (enforced by BIP 0068 with nSequence) is not equal to or longer than the value of the top stack item. The precise semantics are described in BIP 0112.",
        category: 'locktime'
    }
];

export function nameToOpcode(nameToFind) {
    let opcode = OPCODES.find(op => op.label === nameToFind);
    if (opcode) 
        return opcode;
    else
        return null;
} 