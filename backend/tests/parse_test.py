from opcodes import *

def test_add():
    script = ["1", "1", "OP_ADD"]
    expected_output = [Data(1), Data(1), OP_ADD]
    assert parse_script(script) == expected_output

def test_P2PK():
    script = ["SIGNATURE", "PUBKEY", "OP_CHECKSIG"]
    expected_output = [Data("SIGNATURE"), Data("PUBKEY"), OP_CHECKSIG]
    assert parse_script(script) == expected_output

def test_P2PKH():
    script = [
        "SIGNATURE", 
        "PUBKEY", 
        "OP_DUP",
        "OP_HASH160",
        "PUBKEY",
        "OP_CHECKSIG"
    ]
    expected_output = [
        Data("SIGNATURE"),
        Data("PUBLIC_KEY"), 
        OP_DUP,
        OP_HASH160,
        Data("PUBKEY"),
        OP_CHECKSIG
    ]
    assert parse_script(script) == expected_output
