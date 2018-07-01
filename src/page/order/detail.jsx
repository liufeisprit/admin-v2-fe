
import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import Order from 'service/order-service.jsx'
const _order = new Order()
import MUtil from 'util/mm.jsx'
import TableList from 'util/table-list/index.jsx'
import './detail.scss'
const _mm = new MUtil()
class OrderDeail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo  : {}
        }
    }
    //加载数据
    loadOrderDetail() {
                _order.getOrderDetail(this.state.orderNumber).then(res => {
               
                this.setState({
                    orderInfo:res
                })
                console.log(this.state.orderInfo)
            }, err => {
                _mm.errorTips(err)
            })
        
    }
    //发货
    sendGood(){
        
        if(window.confirm('是否确认该订单已经发货')){
            _order.sendGoods(this.state.orderNumber).then(res=>{
                _mm.successTips('发货成功');
                this.loadOrderDetail()
            },err => {
                _mm.errorTips(err)
            })
        }
    }
    componentDidMount() {
        this.loadOrderDetail()
    }

    render() {
        let reveiveInfo=this.state.orderInfo.shippingVo||{},
            productList=this.state.orderInfo.orderItemVoList||[],
            tableHeads=[
            {name:'商品图片',width:'10%'},
            {name:'商品信息',width:'45%'},
            {name:'单价',width:'15%'},
            {name:'数量',width:'15%'},
            {name:'合计',width:'15%'},
        ];
        return (

            <div id='page-wrapper'>
                <PageTitle title='订单详情' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单号</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.orderNo}</p>

                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">创建时间</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.createTime}</p>


                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">收件人</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                                {reveiveInfo.receiverName}，
                                {reveiveInfo.receiverProvince}，
                                {reveiveInfo.receiverCity}，
                                {reveiveInfo.receiverAddress}，
                                {reveiveInfo.receiverMobile || reveiveInfo.receiverPhone}
                            </p>


                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单状态</label>
                        <div className="col-md-5">
                            <p className="form-control-static">
                            
                            {this.state.orderInfo.statusDesc}
                            {
                                this.state.orderInfo.status===20?
                                <button className='btn btn-detault btn-sm btn-send-goods'
                                onClick={e=>{this.sendGood()}}
                                >立即发货</button>:
                                null
                            }
                            </p>


                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">支付方式</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>


                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">订单金额</label>
                        <div className="col-md-5">
                            <p className="form-control-static">￥{this.state.orderInfo.payment}</p>


                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品列表</label>
                        <div className="col-md-5">
                            <p className="form-control-static">{this.state.orderInfo.paymentTypeDesc}</p>


                        </div>
                    </div>
                    <TableList tableHeads={tableHeads}>
                    {
                        productList.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <img 
                                        className='productImg'
                                        src={`${this.state.orderInfo.imageHost}${product.productImage}`} 
                                        alt={product.productName}/>
                                    </td>
                                    <td>{product.productName}</td>
                                    <td>￥{product.currentUnitPrice}</td>
                                    <td>{product.quantity}</td>
                                    <td>￥{product.totalPrice}</td>                                    
                                    
                                </tr>
                            )
                        })
                    }
                </TableList>

                    
                </div>
            </div>

        )
    }
}
export default OrderDeail