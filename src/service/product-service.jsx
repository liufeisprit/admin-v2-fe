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
}
export default Product