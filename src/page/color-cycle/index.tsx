import React, {useState, useCallback, useEffect, useRef} from 'react';
import {Row, Col, Button, InputNumber} from 'antd';

import styles from './index.module.css';


function add(prev: string, increment: number) {
    let result = ((parseInt(prev, 16) + increment) % 256).toString(16);
    if (result.length === 1) {
        result = '0' + result;
    }
    return result;
}

export function ColorCycle() {
    const [color, setColor] = useState('000000');
    const [loop, toggleLoop] = useState(false);
    const [timeInteval, setTimeinteval] = useState(250);
    const increment = useRef([0, 0, 0]);
    const timer = useRef(0);

    const changeColor = useCallback(
        () => {
            if (loop) {
                setColor(
                    color => {
                        let r = add(color.substring(0, 2), increment.current[0]);
                        let g = add(color.substring(2, 4), increment.current[1]);
                        let b = add(color.substring(4, 6), increment.current[2]);
                        return `${r}${g}${b}`;
                    }
                );
                timer.current = window.setTimeout(
                    () => {
                        changeColor();
                    },
                    timeInteval
                );
            }
        },
        [loop, timeInteval]
    );

    useEffect(
        () => {
            if (loop) {
                timer.current = window.setTimeout(
                    () => {
                        changeColor();
                    },
                    timeInteval
                );
            }
            return () => {
                if (timer.current) {
                    clearTimeout(timer.current);
                }
            };
        },
        [loop, changeColor, timeInteval]
    );

    const start = useCallback(
        () => {
            increment.current = [
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 10) + 1
            ]
            toggleLoop(true);
        },
        []
    );

    const stop = useCallback(
        () => {
            toggleLoop(false);
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = 0;
            }
        },
        []
    );

    const onTimeChange = useCallback(
        value => {
            setTimeinteval(value);
        },
        []
    );

    return <div>
        {/* <div className={styles.colorControl}>
            <Row gutter={20}>
                <Col span={8}>
                    <div>R: <Input maxLength={2} minLength={2} /></div>
                </Col>
                <Col span={8}>
                    <div>G: <Input maxLength={2} minLength={2} /></div>
                </Col>
                <Col span={8}>
                    <div>B: <Input maxLength={2} minLength={2} /></div>
                </Col>
            </Row>
        </div> */}
        <div className={styles.colorControl}>
            <Row justify="center">
                <Col span={8}>
                    <div>时间间隔：<InputNumber disabled={loop} value={timeInteval} onChange={onTimeChange} /> </div>
                </Col>
                <Col span={4}><Button onClick={start}>start</Button></Col>
                <Col span={4}><Button onClick={stop}>stop</Button></Col>
            </Row>
        </div>
        <div className={styles.colorBox} style={{backgroundColor: `#${color}`}}></div>
    </div>
}
