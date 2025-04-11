import React, { useState } from 'react';
import { send } from '@utils/clientUtil';

const healthCheckHandler = async (e) => {

    console.log("HealthCheck Start");

    const sendUrl = "http://localhost:18080/dart/main/check";
    const { data, error } = await send(sendUrl, {}, "GET");

    console.log("HealthCheck Result", data, error);
}

const Test = () => {
    return (
        <>
            <div onClick={healthCheckHandler} style={{ cursor: 'pointer', width: '20px', height: '60px', border: '1px solid black' }}>
                ServerCheck
            </div>
        </>
    )
}

export default Test;