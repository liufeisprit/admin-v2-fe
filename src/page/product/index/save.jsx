
import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import CateGorySelector from './category-selector.jsx'
import FileUploadComponent from 'util/fileUpload/index.jsx'
import './save.scss'
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
class ProductSave extends React.Component {
    constructor(props){
        super(props)
        this.state={
            curCategoryId:0,
            parentCategoryId:0,
            subImages:[],

        }
    }
    onCateGoryChange(curCategoryId, parentCategoryId){
        console.log(curCategoryId, parentCategoryId)
        this.setState({
            curCategoryId: curCategoryId,
            parentCategoryId: curCategoryId
        })
    }
    //文件上传成功的回调
    fileSuccess(res){
        this.setState({
            subImages: [...this.state.subImages, res]
        })
        
    }
    //文件上传失败的回调
    fileError(err){
        _mm.errorTips(err)
    }
    //删除图片
    deleteImg(e){
        let index = this.refs.faClose.getAttribute("index"),
            subImages=this.state.subImages;
        subImages.splice(index,1)
        console.log(index)
        console.log(subImages)
        this.setState({
            subImages: subImages
        })
    }
    render() {
        return (

            <div id='page-wrapper'>
                <PageTitle title='添加商品' />
                <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品名称</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control" placeholder="请输入商品名称" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label  className="col-md-2 control-label">商品描述</label>
                                <div className="col-md-5">
                                    <input type="text" className="form-control"  placeholder="请输入商品描述" />
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
                                        <input type="number" className="form-control"  placeholder="价格" />
                                        <span className="input-group-addon">元</span>                                
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-2 control-label">商品库存</label>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <input type="number" className="form-control" placeholder="库存" />
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
                                                        ref='faClose'
                                                        onClick={(e)=>{this.deleteImg(e)}}
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
                                <div className="col-sm-offset-2 col-sm-10">
                                    <button type="submit" className="btn btn-primary">提交</button>
                                </div>
                            </div>
                </div>
            </div>

        )
    }
}
export default ProductSave