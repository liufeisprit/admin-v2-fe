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

class ProductRouter extends React.Component{
    render(){
        return(

                <Switch>
                    <Route  path='/product/index' component={ProductList}/>
                    <Route path='/product/save/:pid?' component={ProductSave} />
                    <Route path='/product/detail/:pid' component={ProductDeail} />
                    <Redirect exact from='/product' to='/product/index'/>
                </Switch>
   
        )
    }
}
export default ProductRouter