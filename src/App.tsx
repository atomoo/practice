import React from 'react';
import {HashRouter as Router, Route, Link, RouteComponentProps} from 'react-router-dom';
import {List, PageHeader} from 'antd';

import {BorderRadius} from './page/border-radius';
import './App.css';

const ROUTE_CONFS = [
    {
        path: '/border-radius',
        component: BorderRadius,
        title: 'Border Radius'
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

function App() {
    return (
        <div className="App">
            <Router>
                <Route path="/" exact component={Home} />
                {
                    ROUTE_CONFS.map(
                        route => {
                            const {path, component, ...other} = route;
                            return (<Route
                                key={path}
                                path={route.path}
                                {...other}
                                render={
                                    (routeProps: RouteComponentProps) => {
                                        const Component = route.component;
                                        return <React.Fragment>
                                            <PageHeader
                                                className="site-page-header"
                                                onBack={
                                                    () => {
                                                        routeProps.history.goBack();
                                                    }
                                                }
                                                title="Home"
                                                subTitle={`This is a ${route.title}`}
                                            />
                                            <Component />
                                        </React.Fragment>;
                                    }
                                }
                            />);
                        }
                    )
                }
            </Router>
        </div>
    );
}

export default App;
