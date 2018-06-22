import MUtil   from 'util/mm.jsx'
const _mm=new MUtil()
class User{
    login(loginInfo){
           return _mm.request({
                type:'post',
                data:loginInfo,
                url:'manage/user/login.do'
            })
    }
    //退出登录
    logOut(){
        return _mm.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
    }
    checkUserLogin(loginInfo){
        let username=$.trim(loginInfo.username)
        let password=$.trim(loginInfo.password)
        if(typeof username!=='string'||username==''){
            return{
                status:false,
                msg:'用户名不能为空'
            }
        }
        if(typeof password!=='string'||password==''){
            return{
                status:false,
                msg:'密码不能为空'
            }
        }
        return{
            status:true,
            msg:'验证通过!'
        }
    }
    getUserList(pagNum){
        return _mm.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data:{
                pageNum:pagNum
            }
        });
    }
}
export default User