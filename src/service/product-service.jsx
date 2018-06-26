import MUtil   from 'util/mm.jsx'
const _mm=new MUtil()
class Product{
  
    //获取商品列表
    getProductList(listParam){
        let url='',
            data={};
        if(listParam.listType=='list'){
            url='/manage/product/list.do';
            data.pageNum=listParam.pageNum
            
        }else if(listParam.listType=='search'){
            url='/manage/product/search.do';
            data.pageNum=listParam.pageNum;
            data[listParam.searchType]=listParam.keyword;

        }
        return _mm.request({
            type    : 'post',
            url     :  url,
            data    :data
        });
    }
    //改变商品状态
    setProductStatus(productInfo){
        return _mm.request({
            type    : 'post',
            url     : '/manage/product/set_sale_status.do',
            data:productInfo
        });
    }
    //获取子分类列表
    getCategoryList(parentCateGoryId){
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCateGoryId||0
            }
        });
    }
    //检查表单保存商品的字段
    checkProduct(product){
        let result={
            status:true,
            msg:'验证通过'
        }
        if(typeof product.name!=='string'||product.name==''){
            return{
                status:false,
                msg:'商品名称不能为空'
            }
        }
        if(typeof product.subtitle!=='string'||product.subtitle==''){
            return{
                status:false,
                msg:'商品描述不能为空'
            }
        }
        if (typeof product.categoryId !== 'number' || product.categoryId <= 0) {
            return {
                status: false,
                msg: '请选择商品分类'
            }
        }
        if(!product.price||product.price<0){
            return{
                status:false,
                msg:'请输入正确的商品价格'
            }
        }
        if(!product.stock||product.stock<=0){
            return{
                status:false,
                msg:'请输入正确的库存数量'
            }
        }
        
        if(typeof product.stock!=='number'||product.stock<=0){
            return{
                status:false,
                msg:'请输入正确的库存数量'
            }
        }
        return result;
    }
    //保存商品的接口
    saveProduct(product){
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        });
        
    }
    //获取商品详情的接口
    getProduct(productId){
        return _mm.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: {
                productId:productId
            }
        });
    }
}
export default Product