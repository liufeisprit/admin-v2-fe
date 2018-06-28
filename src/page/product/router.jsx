/*
 * @Author: liufei 
 * @Date: 2018-06-21 17:41:34 
 * @Last Modified by: liufei
 * @Last Modified time: 2018-06-26 17:55:02
 */
import React                            from 'react';
import { Switch, Redirect, Route }      from 'react-router-dom'
import ProductList                      from 'page/product/index/index.jsx';
import ProductSave                      from 'page/product/index/save.jsx';
import ProductDeail                     from 'page/product/index/detail.jsx';
import CategoryList                     from 'page/product/category/index.jsx';
import AddCategory                      from 'page/product/category/add.jsx';

class ProductRouter extends React.Component{
    render(){
        return(

                <Switch>
                    <Route  path='/product/index' component={ProductList}/>
                    <Route path='/product/save/:pid?' component={ProductSave} />
                    <Route path='/product/detail/:pid' component={ProductDeail} />
                    {/* 注意这里后面参数:xxx之前要加/ */}
                    <Route path='/product-category/index/:categoryId?' component={CategoryList} />
                    <Route path='/product-category/add' component={AddCategory} />                    
                    <Redirect exact from='/product' to='/product/index'/>
                    <Redirect exact from='/product-category' to='/product-category/index' />
                </Switch>
   
        )
    }
}
export default ProductRouter