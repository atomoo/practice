import React, {useState, useMemo, useCallback} from 'react';
import styles from './index.module.css';
import {Slider, Radio, Typography} from 'antd';

const {Group} = Radio;

function BorderRadius() {
    const [currentCorner, setCurrentCorner] = useState('tl');
    const [tl, setTl] = useState<[number, number]>([0, 0]);
    const [tr, setTr] = useState<[number, number]>([0, 0]);
    const [bl, setBl] = useState<[number, number]>([0, 0]);
    const [br, setBr] = useState<[number, number]>([0, 0]);


    const silderCls = useMemo(
        () => {
            const cls = {
                top: `${styles.sliderTop} ${styles.hide}`,
                right: `${styles.sliderRight} ${styles.hide}`,
                bottom: `${styles.sliderBottom} ${styles.hide}`,
                left: `${styles.sliderLeft} ${styles.hide}`,
            };
            switch (currentCorner) {
                case 'tl':
                    cls.top = `${styles.sliderTop} ${styles.show}`;
                    cls.left = `${styles.sliderLeft} ${styles.show}`;
                    break;
                case 'tr':
                    cls.top = `${styles.sliderTop} ${styles.show}`;
                    cls.right = `${styles.sliderRight} ${styles.show}`;
                    break;
                case 'br':
                    cls.bottom = `${styles.sliderBottom} ${styles.show}`;
                    cls.right = `${styles.sliderRight} ${styles.show}`;
                    break;
                case 'bl':
                    cls.bottom = `${styles.sliderBottom} ${styles.show}`;
                    cls.left = `${styles.sliderLeft} ${styles.show}`;
                    break;
                default:
                    break;
            }
            return cls;
        },
        [currentCorner]
    );
    
    const onCornerChange = useCallback(
        e => {
            setCurrentCorner(e.target.value);
        },
        []
    );

    const sliderProps = useMemo(
        () => {
            const sliderProps = {
                top: {value: 0, reverse: false},
                right: {value: 0, reverse: false},
                bottom: {value: 0, reverse: false},
                left: {value: 0, reverse: false},
            };
            switch (currentCorner) {
                case 'tl':
                    sliderProps.top.value = tl[0];
                    sliderProps.left.value = tl[1];
                    sliderProps.left.reverse = true;
                    break;
                case 'tr':
                    sliderProps.top.value = tr[0];
                    sliderProps.top.reverse = true;
                    sliderProps.right.value = tl[1];
                    sliderProps.right.reverse = true;
                    break;
                case 'br':
                    sliderProps.bottom.value = br[0];
                    sliderProps.bottom.reverse = true;
                    sliderProps.right.value = br[1];
                    break;
                case 'bl':
                    sliderProps.bottom.value = bl[0];
                    sliderProps.left.value = bl[1];
                    break;
                default:
                    break;
            }
            return sliderProps;
        },
        [currentCorner, tl, tr, bl, br]
    );

    const onTopChange = useCallback(
        value => {
            if (currentCorner === 'tr') {
                setTr(
                    tr => ([value, tr[1]])
                );
            }
            else if (currentCorner === 'tl') {
                setTl(
                    tl => ([value, tl[1]])
                );
            }
        },
        [currentCorner]
    );

    const onRightChange = useCallback(
        value => {
            if (currentCorner === 'tr') {
                setTr(
                    tr => ([tr[0], value])
                );
            }
            else if (currentCorner === 'br') {
                setBr(
                    br => ([br[0], value])
                );
            }
        },
        [currentCorner]
    );
    const onBottomChange = useCallback(
        value => {
            if (currentCorner === 'br') {
                setBr(
                    br => ([value, br[1]])
                );
            }
            else if (currentCorner === 'bl') {
                setBl(
                    bl => ([value, bl[1]])
                );
            }
        },
        [currentCorner]
    );
    const onLeftChange = useCallback(
        value => {
            if (currentCorner === 'tl') {
                setTl(
                    tl => ([tl[0], value])
                );
            }
            else if (currentCorner === 'bl') {
                setBl(
                    bl => ([bl[0], value])
                );
            }
        },
        [currentCorner]
    );

    const borderRadius = `${tl[0]}% ${tr[0]}% ${br[0]}% ${bl[0]}% / ${tl[1]}% ${tr[1]}% ${br[1]}% ${bl[1]}%`;

    return (
        <React.Fragment>
            <div className={styles.main}>
                <Slider className={silderCls.top} {...sliderProps.top} onChange={onTopChange} />
                <Slider className={silderCls.right} vertical {...sliderProps.right} onChange={onRightChange} />
                <Slider className={silderCls.bottom} {...sliderProps.bottom} onChange={onBottomChange} />
                <Slider className={silderCls.left} vertical {...sliderProps.left} onChange={onLeftChange} />
                <Group style={{display: 'inline'}} value={currentCorner} onChange={onCornerChange}>
                    <Radio className={styles.radioTL} value="tl" />
                    <Radio className={styles.radioTR} value="tr" />
                    <Radio className={styles.radioBR} value="br" />
                    <Radio className={styles.radioBL} value="bl" />
                </Group>
                <div className={styles.content} style={{borderRadius}} />
            </div>
            <Typography.Paragraph copyable={{text: `border-radius: ${borderRadius}`}}>
                border-radius: {borderRadius}
            </Typography.Paragraph>
        </React.Fragment>
    )
}

export {BorderRadius};
