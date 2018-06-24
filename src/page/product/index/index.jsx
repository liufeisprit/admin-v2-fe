import React        from 'react'
import PageTitle    from 'component/page-title/index.jsx'
import Pagination   from 'util/pagination/index.jsx'
import TableList   from 'util/table-list/index.jsx'
import MUtil   from 'util/mm.jsx'
import Product    from 'service/product-service.jsx'
import Link from 'react-router-dom/Link';
import ListSearch from './index-list-search.jsx'
import './index.scss'
const _mm=new MUtil()
const _product=new Product()
class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pageNum:1,
            list:[],//注意这里初始化数组 
            listType:'list'
        }
    }
    componentDidMount() {
        this.loadProductList()
    }
    loadProductList(){
        let listParam={};
        listParam.listType=this.state.listType;
        listParam.pageNum=this.state.pageNum;
        //如果是搜素的话 需要搜素类型和搜素关键字
        if(this.state.listType=='search'){
            listParam.searchType=this.state.searchType;
            listParam.keyword=this.state.searchKeyword;
        }
        if (this.state.searchType == 'productId' && !Number(this.state.seachKeyword)) {
            _mm.errorTips('按商品id搜索请输入商品数字id');
            return ;
        }
        _product.getProductList(listParam).then(res=>{
            this.setState(res)
        },err=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(err)
        })
    }
    onSearch(searchType,searchKeyword){
        let listType=searchKeyword==''?'list':'search';
        this.setState({
            pageNum:1,
            listType:listType,
            searchType:searchType,
            searchKeyword:searchKeyword
        },()=>{
            this.loadProductList()
        })
        console.log(searchType,searchKeyword)
    }
    //页数发生变化的时候
    changePageNum(pageNum){
        //注意 setState是异步函数
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadProductList()
        })
        
    }
    //改变商品上下架状态
    onChangeProductStatus(productId,currentStatus){
        let newStatus=currentStatus==1?2:1,
            tips     =currentStatus==1?'确定要下架该商品吗？':'确定要上架该商品吗？';
        if(window.confirm(tips)){
            _product.setProductStatus({
                productId:productId,
                status:newStatus
            }).then(req=>{
                _mm.successTips(req)
                this.loadProductList()
            },err=>{
                _mm.errorTips(err)
            })
        }
    }
    render(){
        let tableHeads=[
            {name:'商品ID',width:'10%'},
            {name:'商品信息',width:'50%'},
            {name:'价格',width:'10%'},
            {name:'状态',width:'15%'},
            {name:'操作',width:'15%'},

        ]
        return(
            <div id='page-wrapper'>
            <PageTitle title='商品列表'>
                <div className="page-header-right">
                        <Link to='/product/save' className='btn btn-primary'>
                            <i className='fa fa-plus'></i>
                            <span>添加商品</span>
                        </Link>
                </div>
            </PageTitle>
                <ListSearch onSearch={(searchType,searchKeyword)=>{
                    this.onSearch(searchType,searchKeyword)
                }}/>
                
                <TableList tableHeads={tableHeads}>
                {
                    this.state.list.map((product,index)=>{
                        return(
                            <tr key={index}>
                                <td>{product.id}</td>
                                <td>
                                    <p>{product.name}</p>
                                    <p>{product.subtitle}</p>
                                </td>
                                <td>￥{product.price}</td>
                                <td>
                                    <p>
                                        {product.status==1?'在售':'已下架'}
                                    </p>
                                    <button className=' btn btn-warning btn-xs' 
                                            onClick={e=>{this.onChangeProductStatus(product.id,product.status)}}>{product.status==1?'下架':'上架'}</button>
                                </td>
                                <td>
                                    <Link className='opear' to={`/product/detail/${product.id}`}>详情</Link>
                                    <Link className='opear' to={`/product/save/${product.id}`}>编辑</Link>

                                </td>
                            </tr>
                        )
                    })
                }
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={pageNum=>{this.changePageNum(pageNum)}}/> 
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
export default ProductList;