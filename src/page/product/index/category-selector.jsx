import React from 'react';
import './category-selector.scss'
import MUtil from 'util/mm.jsx'
import Product from 'service/product-service.jsx'
const _mm = new MUtil()
const _product = new Product()

class CateGorySelector extends React.Component {
    constructor(props){
        super(props);
        this.state={
            firstCategoryList           :[],
            firstCategoryId             :0,
            secondCategoryList          :[],
            secondCategoryId             :0,
            
        }
    }
    //获取数据
    componentDidMount(){
        this.loadFirstCategory()   
    }
    //加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList:res,
            })
        },err=>{
            _mm.errTips(err)
        })
    }
    //切换一级分类触发事件
    OnFirstCategoryChange(e){
        if(this.props.readOnly){
            return
        }
        let newValue=e.target.value||0;
        this.setState({
            firstCategoryId: newValue,
            secondCategoryList: [],
            secondCategoryId: 0,
        },()=>{
            //更新二级分类
            this.loadSecondCateGory()
            this.onPropsCateGoryChange()
        })
    }
    //加载二级分类
    loadSecondCateGory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            
            this.setState({
                secondCategoryList: res,
            })
        }, err => {
            _mm.errTips(err)
        })
    }
    //切换二级分类触发事件
    OnSecondCategoryChange(e) {
        if(this.props.readOnly){
            return
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue,
        }, () => {
            //更新二级分类
            this.onPropsCateGoryChange()
        })
    }
    //调用父组件方法
    onPropsCateGoryChange(){
        let categoryChangeab = typeof this.props.onPropsCateGoryChange == 'function';
        if (categoryChangeab){
                if (this.state.secondCategoryId){
                this.props.onPropsCateGoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
            }else{
                this.props.onPropsCateGoryChange(this.state.firstCategoryId,0)
            }
        }
        
    }
    //接收到props 触发
    componentWillReceiveProps(nextProps){
        //props发生变化 新的props要用传入的nextProps 旧的props用this.props
        let categoryChange      =this.props.categoryId      !==nextProps.categoryId,
            parentCategoryChange=this.props.parentCategoryId!==nextProps.parentCategoryId;
            //数据没有发生变化的时候不做处理
        if(!categoryChange&&!parentCategoryChange){
            return
        }
        //假如只有一级分类
        if(nextProps.parentCategoryId==0){
            this.setState({
                firstCategoryId:nextProps.categoryId,
                secondCategoryId:0
            },()=>{
            })
        }else{
            this.setState({
                firstCategoryId:nextProps.parentCategoryId,
                secondCategoryId:nextProps.categoryId
            },()=>{
                parentCategoryChange&&this.loadSecondCateGory()
            })
        }
    }
    render() {
        return (

            <div className="col-md-10">
                <select name="" className='form-control cate-select'
                value={this.state.firstCategoryId}
                onChange={e=>{this.OnFirstCategoryChange(e)}}
                readOnly={this.props.readOnly}
                >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((firstCategory, index) => {
                            return(
                                <option value={firstCategory.id} key={index}>{firstCategory.name}</option>
                            )
                        })
                    }
                </select>
                {
                    this.state.secondCategoryList.length?
               
                <select name="" className='form-control cate-select'
                value={this.state.secondCategoryId}
                onChange={e => { this.OnSecondCategoryChange(e) }}
                readOnly={this.props.readOnly}
                >
                    <option value="">请选择二级分类</option>
                    {
                        this.state.secondCategoryList.map((secondCategory, index) => {
                            return(
                            <option value={secondCategory.id} key={index}>{secondCategory.name}</option>
                            )
                        })
                    }
                    
                   
                        </select> : null
                 }
            </div>

        )
    }
}
export default CateGorySelector