import React from 'react';
import {HashRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom';
import {List, PageHeader} from 'antd';

import {BorderRadius} from './page/border-radius';
import {ColorCycle} from './page/color-cycle';
import './App.css';

const ROUTE_CONFS = [
    {
        path: '/border-radius',
        component: BorderRadius,
        title: 'Border Radius'
    },
    {
        path: '/color-cycle',
        component: ColorCycle,
        title: 'Color Cycle'
    }
];

function Home() {
    return (
        <List
            className="main-list"
            header={null}
            footer={null}
            dataSource={ROUTE_CONFS}
            renderItem={
                item => (
                    <List.Item>
                        <Link to={item.path}>{item.title}</Link>
                    </List.Item>
                )
            }
        />
    );
}


function WrapRoute(props: any) {
    const Component = props.component;
    const navigate  = useNavigate();
    return <React.Fragment>
        <PageHeader
            className="site-page-header"
            onBack={
                () => {
                    navigate(-1);
                }
            }
            title="Home"
            subTitle={`This is a ${props.title}`}
        />
        <Component />
    </React.Fragment>;
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {
                        ROUTE_CONFS.map(
                            route => {
                                const {path, component, ...other} = route;
                            return (<Route
                                key={path}
                                path={route.path}
                                {...other}
                                element={<WrapRoute {...route} />}
                            />);
                            }
                        )
                    }
                </Routes>
            </Router>
        </div>
    );
}

export default App;
