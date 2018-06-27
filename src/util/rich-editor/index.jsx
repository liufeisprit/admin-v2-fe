import React        from 'react'
import Simditor     from 'simditor'
import 'simditor/styles/simditor.scss'
import './index.scss'
class RichEditor extends React.Component{
    constructor(props){
        super(props)
       
    }
    componentDidMount(){
        this.loadEditor()
    }
    loadEditor(){
        let ele=this.refs.textarea;
        this.simditor=new Simditor({
            textarea: $(ele),
            defaultValue:this.props.placeholder||'请输入内容',
            upload:
            {
                url:'/manage/product/upload.do',
                fileKey: 'upload_file',
                defaultImage:''
            }
          });
        this.bindEditorEvent()
    }
    bindEditorEvent(){
        this.simditor.on('valuechanged',e=>{
            this.props.onValueChange(this.simditor.getValue())
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail!==nextProps.defaultDetail){
            this.simditor.setValue(nextProps.defaultDetail)
        }
       
    }
    render(){
        return(
                <div className="rich-editor">
                    <textarea name="" ref='textarea'></textarea>
                </div>

        )
    }
}
export default RichEditor;