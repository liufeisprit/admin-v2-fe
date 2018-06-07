import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './index.scss'
import 'font-awesome/css/font-awesome.min.css'
function Compoent(){
    return <h1>i am sb</h1>
}
class  ES6Comoonent extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            name:'sb',
            age:18
        }
        // this.hadleClick=this.hadleClick.bind(this)
    }
    hadleClick(){
        console.log(this)
        // this.setState({
        //     age:++this.state.age
        // })
    }
    render(){
        // setTimeout(()=>{
        //     this.setState({
        //         name:'big sb'
        //     })
        // },2000)
        return (
        <div>
            <h1>i am {this.state.name}</h1>
            <p>i am {this.state.age}</p>
            <button onClick={this.hadleClick}>加一岁</button>
        </div>
        )
        
    }
}
let style={'font-size':20+'px'}
let jsx=<div className='jsx' style={{fontSize:'30px'}}>jsx。。。</div>
ReactDOM.render(
    <div> 
        
        <Compoent/>
        <ES6Comoonent name='sb 123'/>
    </div>,
    // jsx
    // ,
    document.getElementById('app')
);