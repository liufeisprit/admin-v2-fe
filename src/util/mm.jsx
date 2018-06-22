class MUtil{
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type        :param.type||'get',
                url         :param.url||'',
                dataType    :param.dataType||'json',
                data        :param.data||null,
                success:res=>{
                    switch (res.status){
                        //成功
                        case 0:typeof resolve=='function'&& resolve(res.data);break;
                        //未登录
                        case 10:this.doLogin();break;
                        default:typeof reject=='function'&& reject(res.msg||res.data);break;
                    }
                }  ,
                error :err=>{
                    typeof reject=='function' && reject(err.statusText);
                }
            })
        })
    }  
    doLogin(){
        window.location.href='/login?redirect='+decodeURIComponent(window.location.pathname);
    } 
    getUrlParam(name){
        // param=123&param1=456
        // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
            return result ? decodeURIComponent(result[2]) : null;
    }
    successTips(successMsg){
        alert(successMsg||'操作成功')
    }
    errorTips(errMsg){
        alert(errMsg||'好像哪里不对了')
    }
    setStorage(name,data){
        let dataType=typeof data
        //object类型
        if(dataType =='object'){
            window.localStorage.setItem(name,JSON.stringify(data))
        }
        //基础类型
        else if(['number','string','boolean'].indexOf(dataType)){
            window.localStorage.setItem(name,data)
        }else{
            alert('该类型不适用于本地存储')
        }
    }
    getStorage(name){
        let data=window.localStorage.getItem(name)
        if(data){
            return JSON.parse(data)
        }else{
            return '';
        }
    }
    removeStorage(name){
       window.localStorage.removeItem(name)
    }
}
export default MUtil