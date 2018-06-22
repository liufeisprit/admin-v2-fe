import React        from 'react'
import PageTitle    from 'component/page-title/index.jsx'
import Pagination   from 'util/pagination/index.jsx'
import MUtil   from 'util/mm.jsx'
import User    from 'service/user-service.jsx'
import TableList  from 'util/table-list/index.jsx';
const _mm=new MUtil()
const _user=new User()
class UserList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pageNum:1,
            list:[],//注意这里初始化数组 
        }
    }
    componentDidMount() {
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res)
        },err=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(err)
        })
    }
    //页数发生变化的时候
    changePageNum(pageNum){
        //注意 setState是异步函数
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList()
        })
        
    }
    render(){
        let tableHeads=[
            {name:'ID',width:'20%'},
            {name:'用户名',width:'20%'},
            {name:'邮箱',width:'20%'},
            {name:'电话',width:'20%'},
            {name:'注册时间',width:'20%'},
        ]
        return(
            <div id='page-wrapper'>
                <PageTitle title='用户列表'>
                    <TableList tableHeads={tableHeads}>
                        {
                            this.state.list.map((user,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{new Date(user.createTime).toLocaleDateString()}</td>
                                    </tr>
                                )
                            })
                        }
                
                    </TableList>
                    <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum=>{this.changePageNum(pageNum)}}/>    
                </PageTitle>
            </div>
        )
    }
}
export default UserList;