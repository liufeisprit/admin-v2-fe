
import React                    from 'react';
import PageTitle                from 'component/page-title/index.jsx'
import CateGorySelector         from './category-selector.jsx'
import FileUploadComponent      from 'util/fileUpload/index.jsx'
import RichEditor               from 'util/rich-editor/index.jsx'
import './save.scss'
import Product from 'service/product-service.jsx'
const _product = new Product()
import MUtil                    from 'util/mm.jsx'
const _mm = new MUtil()
class ProductSave extends React.Component {
    constructor(props){
        super(props)
        this.state={
            name                :'',
            subtitle            :'',
            price               :'',
            stock               :'',
            curCategoryId       :0,
            parentCategoryId    :0,
            subImages           :[],
            mainImage           :'',
            detail              :'',
            status              :1,//商品状态 在售

        }
    }
    //简单表单输入框的改变
    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value.trim()
        })
    }
    //选中分类的id
    onCateGoryChange(curCategoryId, parentCategoryId){
        this.setState({
            curCategoryId: curCategoryId,
            parentCategoryId: parentCategoryId
        })
    }
    //文件上传成功的回调
    fileSuccess(res){
        this.setState({
            // subImages: [...this.state.subImages, res]
            subImages:this.state.subImages.concat(res)
        })
        
    }
    //文件上传失败的回调
    fileError(err){
        _mm.errorTips(err)
    }
    //删除图片
    deleteImg(index){
        let subImages=this.state.subImages;
        subImages.splice(index,1)
        this.setState({
            subImages: subImages
        })
    }
    //富文本编辑器值发生改变
    onRichEditorChange(value){
        this.setState({
            detail:value
        })
    }
    getSubImageString(){
        return this.state.subImages.map(image=>{
            return image.uri
        }).join(',')
    }
    //提交表单
    onSubmit(){
        let product={
            name                :this.state.name,
            subtitle            :this.state.subtitle,
            categoryId          :parseFloat(this.state.curCategoryId),
            subImages           :this.getSubImageString(),
            detail              :this.state.detail,
            price               :parseFloat(this.state.price),
            stock               :parseFloat(this.state.stock),
            status              :this.state.status,
        }
        console.log(product)
        let checkProductResult=_product.checkProduct(product)
        if(checkProductResult.status){
            _product.saveProduct(product).then(res=>{
                _mm.successTips(res)
                this.props.history.push('/')
            },err=>{
                _mm.errorTips(err)
            })
        }else{
            _mm.errorTips(checkProductResult.msg)
        }
    }
    render() {
        return (

            <div id='page-wrapper'>
                <PageTitle title='添加商品' />
                <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                        className="form-control"
                                        placeholder="请输入商品名称"
                                        name='name'
                                        onChange={e=>{this.onValueChange(e)}}
                                      />
                                </div>
                            </div>
                            <div className="form-group">
                                <label  className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text" 
                                    className="form-control"  
                                    placeholder="请输入商品描述" 
                                    name='subtitle'
                                    onChange={e=>{this.onValueChange(e)}}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">所属分类</label>
                                <CateGorySelector onPropsCateGoryChange={(curCategoryId,parentCategoryId)=>{
                                this.onCateGoryChange(curCategoryId, parentCategoryId)
                                }}/>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品价格</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                        className="form-control"  
                                        placeholder="价格" 
                                        name='price'
                                        onChange={e=>{this.onValueChange(e)}}
                                        />
                                        <span className="input-group-addon">元</span>                                
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" 
                                        className="form-control" 
                                        placeholder="库存" 
                                        name='stock'
                                        onChange={e=>{this.onValueChange(e)}}
                                        />
                                        <span className="input-group-addon">件</span>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品图片</label>
                                <div className="col-md-10 ">
                                    {
                                        this.state.subImages.length?
                                        this.state.subImages.map((image,index)=>{
                                            return(
                                                <div className='imageContent' key={index}>
                                                    <img src={image.url} alt=""/>
                                                    <i className='fa fa-close' index={index}
                                                        onClick={(e)=>{this.deleteImg(index)}}
                                                    ></i>
                                                </div>
                                            )
                                        }):null
                                    }
                                    
                                </div>
                                <div className='col-md-10 col-md-offset-2 file-icons'>
                                        <FileUploadComponent
                                            OnSuccess={(res) => { this.fileSuccess(res) }}
                                            OnError={(err) => { this.fileError(err) }}
                                        />
                                </div>
                                       
                                
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品详情</label>
                                <div className="col-md-8">
                                    <RichEditor onValueChange={value=>{this.onRichEditorChange(value)}}/>
                                </div>
                            </div>
                           
                            <div className="form-group">
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button  className="btn btn-primary" onClick={e=>{this.onSubmit()}}>提交</button>
                                </div>
                            </div>
                </div>
            </div>

        )
    }
}
export default ProductSave