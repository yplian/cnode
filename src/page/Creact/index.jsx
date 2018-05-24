import React,{ Component } from 'react';
import { NavBar, Picker, List, WhiteSpace, InputItem, TextareaItem, Button, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state={
      height:parseInt((document.documentElement.clientHeight -50 -45),10) +'px',
      tabValue: ['ask'],
      txtValue: '',
      areaValue: '',
    }
  }
  submitValue(){
    const {tabValue,txtValue,areaValue} = this.state;
    if(txtValue==='' || areaValue===''){
       console.log('不能为空')
    }else{
      this.props.submitValue(this.props.accesstoken,tabValue[0],txtValue,areaValue);
    }
  }
  componentDidMount(){
    if(this.props.success){
      this.props.history.push(`/topics/${this.props.topic_id}`)
    }
  }
  componentWillUnmount(){
    this.props.Unmount(false);
  }
  render() {
    const tabs = [
      [
        {
          label: '问答',
          value: 'ask',
        },
        {
          label: '分享',
          value: 'share',
        },
        {
          label: '招聘',
          value: 'job',
        },
      ]
    ];
    const Info = (...props)=>{
      if(this.props.success){
        setTimeout(()=>{
          this.props.history.push(`/topics/${this.props.topic_id}`)
        },2000)
        return <p>正在跳转。。</p>
      }else{
        return <p>{this.props.error_msg}</p>
      }
    }
    
    return (
      <div>
        <NavBar
          mode="dark"
        >新建</NavBar>
        <div style={{height:this.state.height,overflow:'auto'}}>

          <Info />

          <List>
            <Picker
              data={tabs}
              title="选择类型"
              cascade={false}
              extra="请选择(可选)"
              value={this.state.tabValue}
              cols={1}
              onChange={v => this.setState({ tabValue: v })}
              onOk={v => this.setState({ tabValue: v })}
            >
              <List.Item arrow="horizontal">类型</List.Item>
            </Picker>

            <InputItem
              clear
              placeholder="主题标题,至少10字..."
              value={this.state.txtValue}
              onChange={v => this.setState({ txtValue: v })}
              ref={el => this.autoFocusInst = el}
            >标题</InputItem>

            <TextareaItem
              rows={5}
              value={this.state.areaValue}
              onChange={v => this.setState({ areaValue: v })}
              // title="高度自适应"
              placeholder="文本内容,至少30字..."
              autoHeight
              // labelNumber={5}
            />
          </List>
          <WhiteSpace size="lg" />
          <WingBlank><Button size="small" onClick={()=>this.submitValue()} >发布</Button></WingBlank>
          <WhiteSpace size="lg" />
        </div>
      </div>
    );
  }
}

export default withRouter(Message);