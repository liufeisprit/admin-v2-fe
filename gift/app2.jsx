import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './index.scss'

class App extends React.Component{
    //构造函数
    constructor(props){
        super(props)
        // this.state={
        //     data:'old data'
        // }
        console.log('constructor')
    }
    //组件即将加载 
    componentWillMount(){
        console.log('componentWillMount')
    }
    //组件渲染完成
    componentDidMount(){
        console.log('componentDidMount')
    }
    //将要接受父组件传来的props
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps')
    }
    //子组件是不是应该更新
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate')
        //return false就不往下执行了
        return true
    }
    //组件将要更新
    componentWillUpdate(){
        console.log('componentWillUpdate')
    }
    //组件更新完成
    componentDidUpdate(){
        console.log('componentDidUpdate')
    }
    componentWillUnmount(){
        console.log('componentWillUnmount')
    }
    handleClick(){
        console.log('=====================')
        this.setState({
            data:'new Data'
        })
    }
    //渲染阶段
    render(){
        console.log('render')
        return (
            <div className='sb'>
                props: {this.props.data}
                <button onClick={()=>{this.handleClick()}}>更新</button>
            </div>
        )
    }
}
class AppChild extends React.Component{
    constructor(props){
        super(props)
        this.state={
            data:'old data',
            hasChild:true
        }
    }
    changeState(){
        console.log(11)
        this.setState({
            data:'new data'
        })
    }
    removeChild(){
        console.log(12)
        this.setState({
            hasChild:false
        })
    }
    render(){
        return (
        <div>
            {this.state.hasChild?<App data={this.state.data}/>:''}
            
            <button onClick={()=>{this.changeState()}}>改变props</button>
            <button onClick={()=>{this.removeChild()}}>干掉子组件</button>
            
        </div>
        )
    }

}
ReactDOM.render(
    <div> 
        <AppChild/>
    </div>,
    // jsx
    // ,
    document.getElementById('app')
);