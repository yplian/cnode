import React,{ Component } from 'react';
import { TextareaItem, Button, Toast } from 'antd-mobile';
import './style.css'

class Discuss extends Component{
  constructor(props){
    super(props);
    this.state = {
      value:''
    }
  }
  static defaultProps={
    cancelBtnShow: false,
    cancelDis:()=>{},
    clearBtnShow: false,
    isFocus:true,
  }
  changeDisVal(value){
    this.setState({
      value: value
    })
  }
  clearVal(){
    this.setState({
      value: ''
    })
  }
  componentDidMount() {
    if(this.props.isFocus){
      this.autoFocusInst.focus()
    }
  }
  render(){
    return(
      <div className="reply-area-wrap" style={{display:this.props.showDis?'block':'none'}}>
        <TextareaItem
          ref={el => this.autoFocusInst = el}
          focus={this.state.focus}
          value={this.state.value}
          placeholder='评论'
          rows={4}
          onChange={(v)=>{this.changeDisVal(v)}}
        /> 
        <Button 
          type="warning" 
          size="small" 
          inline 
          style={{ float:'right',marginLeft:'10px',fontSize:'12px',
            display: this.props.cancelBtnShow ? 'block' : 'none'
          }} 
          onClick={() => {this.props.cancelDis()}}
        >
          取消
        </Button>

        <Button 
          type="warning" 
          size="small" 
          inline 
          style={{ float:'right',marginLeft:'10px',fontSize:'12px',
            display: this.props.clearBtnShow ? 'block' : 'none'
          }} 
          onClick={() => {
            this.clearVal();
            Toast.success('评论已清空.',1)
          }}
        >
          清空
        </Button>

        <Button 
          type="primary" 
          size="small" 
          inline 
          style={{ float:'right',fontSize:'12px' }}
          onClick={() => {
            let value = this.state.value;
            if(value===''){
              Toast.fail('不能为空!',1)
            }else{
              this.props.reportDis(this.state.value)
            }
          }}
        >
          发表
        </Button>
      </div>
    )
  }
}

export default Discuss;