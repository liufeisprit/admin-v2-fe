import React from 'react'
import ReactDOM from 'react-dom'
// import {HashRouter as Router ,Route,Link} from 'react-router-dom'
import {BrowserRouter as Router ,Route,Link} from 'react-router-dom'
class A extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                参数是 : {this.props.match.params.id}
                component A
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
            <Link to='/b'>组件B</Link>
            {this.props.children}
            </div>
        )
            
    }
}
ReactDOM.render(
    <Router>
        <Wrapper>
            <Route path='/a/:id' component={A}/>
            <Route path='/b' component={B}/>
        </Wrapper>
    </Router>

        
    ,
    document.getElementById('app')
)