import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router ,Route,Link,Switch,IndexRoute,Redirect} from 'react-router-dom'
import Home from 'page/home/index.jsx';
import Layout from 'component/layout/index.jsx';

class App extends React.Component{
    render(){
        return(
            <Router>
                <Layout>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route  path='/product' component={Home}/>
                    <Route  path='/product-category' component={Home}/>
                    
                    {/* <Redirect from='*' to='/'></Redirect> */}
                </Switch>
                </Layout>
            </Router>
        )
    }
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('app')
)