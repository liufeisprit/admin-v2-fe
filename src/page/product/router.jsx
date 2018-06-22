/*
 * @Author: liufei 
 * @Date: 2018-06-21 17:41:34 
 * @Last Modified by: liufei
 * @Last Modified time: 2018-06-22 10:37:39
 */
import React              from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import ProductList        from 'page/product/index/index.jsx';

class ProductRouter extends React.Component{
    render(){
        return(

                <Switch>
                    <Route  path='/product/index' component={ProductList}/>
                    <Redirect exact from='/product' to='/product/index'/>
                </Switch>
   
        )
    }
}
export default ProductRouter