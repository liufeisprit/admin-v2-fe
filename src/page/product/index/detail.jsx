
import React from 'react';
import PageTitle from 'component/page-title/index.jsx'
import CateGorySelector from './category-selector.jsx'
import './save.scss'
import Product from 'service/product-service.jsx'
const _product = new Product()
import MUtil from 'util/mm.jsx'
const _mm = new MUtil()
class ProductDeail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.pid,
            name: '',
            subtitle: '',
            price: '',
            stock: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            mainImage: '',
            detail: '',
            status: 1,//商品状态 在售

        }
    }
  
   
    getSubImageString() {
        return this.state.subImages.map(image => {
            return image.uri
        }).join(',')
    }

    //加载数据
    loadProduct() {
        if (this.state.id) {
            _product.getProduct(this.state.id).then(res => {
                let images = res.subImages?res.subImages.split(','):[];
                res.subImages = images.map((image) => {
                    return {
                        uri: image,
                        url: res.imageHost + image
                    }
                })
                this.setState(res)
            }, err => {
                _mm.errorTips(err)
            })
        }
    }
    componentDidMount() {
        this.loadProduct()
    }

    render() {
        return (

            <div id='page-wrapper'>
                <PageTitle title='查看商品' />
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                        <p className="form-control-static">{this.state.name}</p>
                           
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                        <p className="form-control-static">{this.state.subtitle}</p>

                           
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CateGorySelector onPropsCateGoryChange={(categoryId, parentCategoryId) => {
                            this.onCateGoryChange(categoryId, parentCategoryId)
                        }}
                            readOnly={'readOnly'}
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                        />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number"
                                    className="form-control"
                                    value={this.state.price}
                                    readOnly
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
                                    value={this.state.stock}
                                    readOnly
                                />
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>

                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10 ">
                            {
                                this.state.subImages.length ?
                                    this.state.subImages.map((image, index) => {
                                        return (
                                            <div className='imageContent' key={index}>
                                                <img src={image.url} alt="" />
                                            </div>
                                        )
                                    }) : null
                            }

                        </div>
   


                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        {/* 设置html 通过 dangerouslySetInnerHTML设置*/}
                        <div className="col-md-8" dangerouslySetInnerHTML={{__html:this.state.detail}}>
                       
                           
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-primary" onClick={e => { this.onSubmit() }}>提交</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
export default ProductDeail