import React from 'react'
import ReactDOM from 'react-dom'
// import {HashRouter as Router ,Route,Link} from 'react-router-dom'
import {BrowserRouter as Router ,Route,Link,Switch,IndexRoute} from 'react-router-dom'
class A extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
               Component A
                <Switch>
                    <Route exact path={`${this.props.match.path}`} render={(route)=>{
                            return <div> 不带参数 </div>
                        }}/>
                    <Route exact path={`${this.props.match.path}/sub`} render={(route)=>{
                            return <div> sub组件 </div>
                        }}/>
                     <Route path={`${this.props.match.path}/:id`} render={(route)=>{
                            return <div> 带参数 参数是 : {route.match.params.id} </div>
                        }}/> 
                    
                </Switch>
            </div>
        )
            
    }
}
class B extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>component B</div>
        )
            
    }
}
class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div></div>
        )
            
    }
}
class Home extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>component Home</div>
        )
            
    }
}
class Wrapper extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <Link to='/a'>组件A</Link> 
                <br/>
                <Link to='/a/123'>带参数的组件A</Link> 
                <br/>
                <Link to='/a/sub'>sub组件</Link> 
                <br/>
                <Link to='/b'>组件B</Link>
                {this.props.children}
            </div>
        )
            
    }
}
ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path='/a' component={A}/>
            <Route path='/b' component={B}/>
        </Wrapper>

    </Router>

        
    ,
    document.getElementById('app')
)