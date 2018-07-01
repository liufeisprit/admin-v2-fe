import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import TableList from 'util/table-list/index.jsx'
import MUtil from 'util/mm.jsx'
import Order from 'service/order-service.jsx'
import Link from 'react-router-dom/Link';
import ListSearch from './index-list-search.jsx'

const _mm = new MUtil()
const _order = new Order()
class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNum: 1,
            list: [],//注意这里初始化数组 
            listType: 'list'//list searcj
        }
    }
    componentDidMount() {
        this.loadProductList()
    }
    loadProductList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        //如果是搜素的话 需要搜素类型和搜素关键字
        if (this.state.listType == 'search') {
            listParam.orderNo = this.state.orderNumber;
        }
       
        _order.getOrderList(listParam).then(res => {
            this.setState(res)
        }, err => {
            this.setState({
                list: []
            })
            _mm.errorTips(err)
        })
    }
    onSearch(orderNumber) {
        let listType = orderNumber == '' ? 'list' : 'search';
        this.setState({
            pageNum: 1,
            listType: listType,
            orderNumber: orderNumber,
        }, () => {
            this.loadProductList()
        })
    }
    //页数发生变化的时候
    changePageNum(pageNum) {
        //注意 setState是异步函数
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadProductList()
        })

    }
    render() {
        let tableHeads = [
           '订单号','收件人','订单状态','订单总价','创建时间','操作'
        ]
        return (
            <div id='page-wrapper'>
                <PageTitle title='订单列表' />
                    
                <ListSearch onSearch={(orderNumber) => {
                    this.onSearch(orderNumber)
                }} />

                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td> <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link></td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>￥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>详情</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum => { this.changePageNum(pageNum) }} />
                {/* <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>用户名</td>
                                    <td>邮箱</td>
                                    <td>电话</td>
                                    <td>注册时间</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length>0?listBody:listError
                                }
                                
                            </tbody>
                        </table>  
                            
                    </div>
                </div> */}
                {/* </PageTitle> */}
            </div>
        )
    }
}
export default OrderList;