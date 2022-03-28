import React from 'react'

const Progress_bar = ({ progress, height }) => {

    const Parentdiv = {
        height: height,
        width: 15,
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
        transform: 'rotate(180deg)',
        marginRight: 10,
        marginLeft: 10,
    }

    const Childdiv = {
        height: `${progress}%`,
        width: 15,
        backgroundColor: 'black',
        borderRadius: 40,
        textAlign: 'right',
    }


    return (
        <div style={Parentdiv}>
            <div style={Childdiv}>
            </div>
        </div>
    )
}

export default Progress_bar;
