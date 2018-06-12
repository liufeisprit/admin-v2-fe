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
    hadleClick(e){
        console.log(this)
        this.setState({
            age:++this.state.age
        })
    }
    onValueChange(e){
        this.setState({
            age:e.target.value
        })
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
            <button onClick={(e)=>this.hadleClick(e)}>加一岁</button>
            <input type="text" onChange={(e)=>this.onValueChange(e)}/>
        </div>
        )
        
    }
}
class App extends React.Component{
    render(){
        return (
            <div className='sb'>

            {/* 组件的组合方式 */}
            {/* 容器式组件 单纯组件 */}

                <Title title='i am title'><span>i am title's children</span></Title>
               {/* <ES6Comoonent name='sb 123'/>  */}
            </div>
        )
    }
}
class Title extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.children}</p>
            </div>
            
        )
    }
}
class Child1 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                {/* <h1>Child1父组件的bgColor{this.props.bgColor}</h1> */}
                <button onClick={(e)=>this.hadleClick(e)}>改变Child2颜色 </button>
            </div>
            
        )
        
    }
    hadleClick(e){
        //不能直接修改props修改 只读的
        // this.props.bgColor='red'
        this.props.onchangeBgColor('red')
    }
}
class Child2 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div  style={{background:this.props.bgColor}}>
                <h1>Child2的bgColor{this.props.bgColor}</h1>
                {/* <button onClick={(e)=>this.hadleClick(e)}>改变颜色 </button> */}
            </div>
            
        )
        
    }
    hadleClick(e){
        //不能直接修改props修改 只读的
        // this.props.bgColor='red'
        this.props.onchangeBgColor('red')
    }
}
class Father extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bgColor:'#999'
        }
    }
    onchangeBgColor(color){
        this.setState({
            bgColor:color
        })
    }
    render(props){
        return (
        // <div style={{background:this.state.bgColor}}>
        //     <Child1 bgColor={this.state.bgColor} onchangeBgColor={(color)=>{this.onchangeBgColor(color)}}/>
        // </div>
        <div>
            <Child1 onchangeBgColor={(color)=>{this.onchangeBgColor(color)}}/>
            <Child2  bgColor={this.state.bgColor}/>
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
        <App/>
        <Father/>
    </div>,
    // jsx
    // ,
    document.getElementById('app')
);