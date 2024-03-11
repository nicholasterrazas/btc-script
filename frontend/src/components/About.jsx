import * as React from 'react';

export default function About() {
    return (
        <>
            <h1 style={{paddingTop: '45px'}}>About</h1>
            
            <h2>FAQ</h2>
            <h3>What is Bitcoin Script</h3>
            Bitcoin script is a stack-based mini programming language that is able to lock and unlock bitcoin transactions

            <h3>Where can I learn more about Bitcoin Script?</h3>
            Check our resources below!

            <h2>Resources</h2>
            <ul>
                <li><a href='https://en.bitcoin.it/wiki/Script'>Bitcoin Wiki page on Script language</a></li>
                <li><a href='https://learnmeabitcoin.com/technical/script'>Learn me a bitcoin</a></li>
                <li><a href='https://github.com/BlockchainCommons/Learning-Bitcoin-from-the-Command-Line/blob/master/13_1_Writing_Puzzle_Scripts.md'>Writing Puzzle Scripts</a></li>
            
            </ul>           
        </>
    );
}