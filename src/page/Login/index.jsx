import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom'
import { NavBar, Button, Flex, WhiteSpace, Toast, Icon, WingBlank } from 'antd-mobile';
import Tools from '../../utils'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state={
      height:parseInt((document.documentElement.clientHeight -50),10) +'px',
      value:'',
      click:false
    }
  }
  componentWillUpdate(nextProps,nextState){
    if(nextProps.loginflag === true){
      Toast.success('登录成功', 1);
      this.props.Selected('topics');
      this.props.saveKey(this.accectKey.value);
      Tools.localItem('accesstoken',this.accectKey.value);

      this.props.history.push('/topics');
    }else{
      if(this.state.click){
        Toast.fail('登录失败', 1);
      }
    }
  }
  loginIn() {
    this.props.loginIn(this.accectKey.value)
    this.setState({
      click:true
    })
  }
  render() {
    return (
      <div style={{height:this.state.height}}>
        <NavBar
         mode="dark"
         icon={<Icon type="left" />}
         onLeftClick={() => this.props.history.goBack()}
         >登录</NavBar>

        <Flex style={{height:'60%'}} justify="center" align="center" direction="column">
          <div style={{width:'80%'}}>
            <input style={{width:'100%',height:'32px',padding:'0 5px','border':'1px solid #ccc'}} type='text' placeholder='请输入accessToken' defaultValue='8f7f8189-47d2-42f1-a10f-52f9a9dcfbee'  ref={((input)=>{this.accectKey = input})} />
            
            <WhiteSpace size="lg" />
              <WingBlank><Button size="small" onClick={()=>this.loginIn()} type="primary">登录</Button></WingBlank>
            <WhiteSpace size="lg" />
          </div>
          
        </Flex>
        
      </div>
    );
  }
}

export default withRouter(Login);