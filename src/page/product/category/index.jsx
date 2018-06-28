import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
import TableList from 'util/table-list/index.jsx';
import Link from 'react-router-dom/Link';
const _mm = new MUtil()
const _product = new Product()
class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentCategoryId: this.props.match.params.categoryId||0,
            list: [],//注意这里初始化数组 
        }
    }
    componentDidMount() {
        this.loadCategoryList()
    }
    //组件更新完触发 prevProps上个props参数 render已经结束了这时候 现在的状态用this.props拿
    componentDidUpdate(prevProps, prevState){
        let newPath = this.props.location.pathname,
            oldPath = prevProps.location.pathname,
            newId = this.props.match.params.categoryId;
        if (newPath !== oldPath){
            this.setState({
                parentCategoryId: newId||0
            },()=>{
                this.loadCategoryList()
            })
        }
       
    }
    //加载品类列表
    loadCategoryList() {
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list:res
            })
        }, err => {
            this.setState({
                list: []
            })
            _mm.errorTips(err)
        })
    }
    //修改品类名字
    updateName(id,name){
        let newName=window.prompt('请输入新的品类名称',name)
        if(newName){
            _product.updateCategoryName({
                categoryId:id,
                categoryName:newName
            }).then(res=>{
                _mm.successTips(res);
                this.loadCategoryList()
            },(err)=>{
                _mm.errorTips(err)
            })
        }
    }
    render() {
        let tableHeads = [
            { name: '品类ID' },
            { name: '品类名称'  },
            { name: '操作' },
            
        ]
        return (
            <div id='page-wrapper'>
                <PageTitle title='品类列表'>
                    <div className="page-header-right">
                        <Link to='/product-category/add' className='btn btn-primary'>
                            <i className='fa fa-plus'></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                
                    <div className="row">
                        <div className="col-md-12">
                            <p>父品类 ID: {this.state.parentCategoryId}</p>
                        </div>
                    </div>
                    <TableList tableHeads={tableHeads}>
                        {
                            this.state.list.map((category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <a href="javascript:;" className="opear"
                                                onClick={(e) => { this.updateName(category.id,category.name)}}
                                            >修改名称</a>
                                            {
                                                category.parentId===0?
                                                    <Link to={`/product-category/index/${category.id}`}
                                                    
                                                    >查看子品类</Link>
                                                :null
                                        }</td>
                                       
                                    </tr>
                                )
                            })
                        }

                    </TableList>
                
            </div>
        )
    }
}
export default CategoryList;