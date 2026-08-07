
import React, { useEffect, useState } from 'react';
// import init, { calculation } from '../../wasm/core_wasm';

import './Calc.scss'

const Calc : React.FC = () => {

    const [result, setResult] = useState<number | null>(null);

    useEffect(() => {

        // init().then(() => {

        //     setResult(calculation(2, 37));
        // });

    }, []);

    return <p>Wynik z WASM: {result ?? 'liczę...'}</p>;
};

export default Calc;
