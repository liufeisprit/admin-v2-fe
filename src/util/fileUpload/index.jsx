import React        from 'react'
import FileUpload   from './FileUpload.jsx';
class FileUploadComponent extends React.Component{
    render() {
        /*set properties*/
        const options = {
            baseUrl: '/manage/product/upload.do',
            fileFieldName:'upload_file',
            dataType:"json",
            chooseAndUpload:true,
            uploadSuccess: (res)=>{this.props.OnSuccess(res.data)},
            uploadError: (err)=>{this.props.OnError(err,message||'上传图片出错了')}
        }
        /*Use FileUpload with options*/
        /*Set two dom with ref*/
        return (
            
                <FileUpload options={options}>
                    <button ref="chooseAndUpload" className='btn btn-xs btn-default'>请选择图片</button>
                </FileUpload>
           
           
        )
    }
}
export default FileUploadComponent
