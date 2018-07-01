/*
 * @Author: liufei 
 * @Date: 2018-06-22 18:10:16 
 * @Last Modified by: liufei
 * @Last Modified time: 2018-06-22 18:51:29
 */
import React from 'react';
class ListSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderNumber: ''
        }
    }
    //下拉框切换 输入框输入 触发的事件
    onValueChange(e) {
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            //'searchType':value
            [name]: value
        })

    }
    //输入关键字后事件
    onKeyUpChange(e) {
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }
    //点击搜素事件
    onSearch() {

        this.props.onSearch(this.state.orderNumber)
    }
    render() {
        return (

            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control">
                                <option value="">按订单号</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="请订单号"
                                name='orderNumber'
                                onChange={e => { this.onValueChange(e) }}
                                onKeyUp={e => { this.onKeyUpChange(e) }}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={e => { this.onSearch() }}>搜索</button>
                    </div>
                </div>
            </div>

        )
    }
}
export default ListSearch