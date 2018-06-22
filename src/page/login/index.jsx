import React   from 'react'
import MUtil   from 'util/mm.jsx'
import User    from 'service/user-service.jsx'
import './index.scss'
const _mm=new MUtil()
const user=new User()
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            password:'',
            redirect:_mm.getUrlParam('redirect')||'/'
        }
    }
    componentWillMount () {
        document.title='登录 '+'- HAPPY MMALL'
      }
    //用户名发生改变
    onInputChange(e){
        let inputName=e.target.name;
        let inputValue=e.target.value;
        this.setState({
            [inputName]:inputValue
        })
    }
    //登录按钮
    onSubmit(e){
        let loginIngo={
            username:this.state.username,
            password:this.state.password,
        },
        checkStatus=user.checkUserLogin(loginIngo);
        if(checkStatus.status){
            user.login(loginIngo).then((res)=>{
                _mm.setStorage('userInfo',res)
                this.props.history.push(this.state.redirect)
            },(err)=>{
                _mm.errorTips(err)
            })
        }else{
            _mm.errorTips(checkStatus.msg)
        }
    }
    onInputKeyup(e){
        if(e.keyCode==13){
            this.onSubmit()
        }
    }
    render(){
        
        return(
            <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">欢迎登陆 MMALL管理系统</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">用户名</label>
                                    <input type="text" 
                                    className="form-control"  
                                    placeholder="请输入用户名"
                                    name="username"
                                    onChange={e=>this.onInputChange(e)}
                                    onKeyUp={e=>this.onInputKeyup(e)}
                                     />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">密码</label>
                                    <input type="password" 
                                    className="form-control" 
                                    placeholder="请输入密码" 
                                    name="password"
                                    onChange={e=>this.onInputChange(e)}
                                    onKeyUp={e=>this.onInputKeyup(e)}
                                    />
                                </div>


                                <button className="btn btn-primary btn-lb btn-block" onClick={e=>this.onSubmit(e)}>登陆</button>
                            </div>
                        </div>
                    </div>
                    {/* jsx input需要自闭合 for 要用htmlFor */}
                    
            </div>
        )
    }
}
export default Login;