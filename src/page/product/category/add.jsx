import React from 'react'
import PageTitle from 'component/page-title/index.jsx'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
const _mm = new MUtil()
const _product = new Product()
class AddCategory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            parentId                    : 0,
            categoryList                : [],
            categoryName                : ''
        }
    }
    componentDidMount() {
        this.loadCategoryList()
    }
    //加载品类列表
    loadCategoryList() {
        _product.getCategoryList().then(res => {
            this.setState({
                categoryList: res
            })
        }, err => {
            _mm.errorTips(err)
        })
    }
    onValueChange(e){
        let value = e.target.value,
            name  = e.target.name;
            this.setState({
                [name]:value
            })
    }
    onSubmit(e){
        let categoryName = this.state.categoryName.trim()
        if (categoryName){
            _product.saveCategroy({
                parentId       :this.state.parentId,
                categoryName   :this.state.categoryName
            }).then(res=>{
                _mm.successTips(res);
                this.props.history.push('/product-category/index')
                }, err => { _mm.errorTips(err)})
        }else{
            _mm.errorTips('请输入商品名称')
        }
    }
    render() {
        return (
            <div id='page-wrapper'>
                <PageTitle title='品类列表'>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-md-2 control-label">所属品类</label>
                                    <div className="col-md-5">
                                        <select name="parentId" className="form-control"
                                        onChange={e=>{this.onValueChange(e)}}
                                        >
                                            <option value="0">根品类/</option>
                                            {
                                                this.state.categoryList.map((category, index) => {
                                                    return <option value={category.id} key={index}>根品类/{category.name}</option>
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-md-2 control-label">商品名称</label>
                                    <div className="col-md-5">
                                        <input type="text"
                                            name='categoryName'
                                            className="form-control"
                                            placeholder="请输入商品名称"
                                            onChange={e => { this.onValueChange(e) }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary" onClick={e => { this.onSubmit(e) }}>提交</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    
                </PageTitle>
            </div>
        )
    }
}
export default AddCategory;