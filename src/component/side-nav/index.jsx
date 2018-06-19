import React                from 'react';
import { Link, NavLink }    from 'react-router-dom';
class NavSide extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let menuData=[
            {titleName:'首页',link:'/',faClassName:'fa-dashboard',secMenuData:[]},
            {titleName:'商品',link:'/product',faClassName:'fa-list',secMenuData:[{titleName:'商品管理',link:'/product'},{titleName:'品类管理',link:'/product-category'}]},
            {titleName:'订单',link:'/order',faClassName:'fa-check-square-o',secMenuData:[{titleName:'订单管理',link:'/order'}]},
            {titleName:'用户',link:'/user',faClassName:'fa-user-o',secMenuData:[{titleName:'用户管理',link:'/user'}]},
        ]
        return(
            <div className="navbar-default navbar-side">
                <div className="sidebar-collapse">
                    <ul className="nav">
                        {
                            menuData.map((el,index)=>
                            <li className="active" key={index}>
                                {el.link=='/'?
                                <NavLink exact activeClassName="active-menu" to={el.link}>
                                <i className={`fa ${el.faClassName}`}></i>
                                <span>{el.titleName}</span>
                                </NavLink>:
                                <div>
                                    <Link to={el.link}>
                                        <i className={`fa ${el.faClassName}`}></i>
                                        <span>{el.titleName}</span>
                                        <span className="fa arrow"></span>
                                    </Link>
                                    <ul className="nav nav-second-level collapse in">
                                        {el.secMenuData.map((ell,index)=><li  key={index}>
                                            <NavLink to={ell.link} activeClassName="active-menu">{ell.titleName}</NavLink>
                                        </li>)}
                                    </ul>
                                </div>}
                            </li>)

                            
                        }
                            {/* NavLink to的路径跟当前url路径一样会添加activeClassName的class */}
                            {/* exact  是只匹配到当前路径 /会匹配到所有其他的*/}
                        {/* <li>
                            
                            <NavLink exact activeClassName="active-menu" to="/">
                                <i className="fa fa-dashboard"></i>
                                <span>首页</span>
                            </NavLink>
                        </li>
                        <li className="active">
                            <Link to="/product">
                                <i className="fa fa-list"></i>
                                <span>商品</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/product-category" activeClassName="active-menu">品类管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/order">
                                <i className="fa fa-check-square-o"></i>
                                <span>订单</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li className="active">
                            <Link to="/user">
                                <i className="fa fa-user-o"></i>
                                <span>用户</span>
                                <span className="fa arrow"></span>
                            </Link>
                            <ul className="nav nav-second-level collapse in">
                                <li>
                                    <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
                                </li>
                            </ul>
                        </li> */}
                    </ul>

                </div>

            </div>
        )
    }
}
export default NavSide