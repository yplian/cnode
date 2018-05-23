import React,{ Component } from 'react';
import { Flex, List, WhiteSpace, NavBar, Button, WingBlank, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import MsgItem from "../../components/MsgItem";
import Tools from "../../utils";
import './style.css'

class User extends Component {
  constructor(props) {
    super(props);
    this.state={
      height:parseInt((document.documentElement.clientHeight -50 -45),10) +'px',
      isSelf:false
    }
  }
  componentWillMount(){
    const loginname = this.props.summary.loginname;
    const path = this.props.match.path;
    const matchName = this.props.match.params.name;
    // 判断是否是用户本人
    if(path === '/mine'){
      this.props.init(loginname);
      this.setState({isSelf:true});
    }else{
      this.props.init(matchName);
      this.setState({isSelf:false});
    }
  }
  render() {
    const { loginname,avatar_url,githubUsername,score,create_at,recent_topics,recent_replies} = this.props.user;
    const { isSelf } = this.state;
    return (
      <div>
        <NavBar
          mode="dark"
          icon={isSelf ? '':<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >{isSelf ? '我的' : '信息' }</NavBar>
         <div style={{height:this.state.height,overflowY:'auto'}}>
          <WhiteSpace className="bg-white" size="md" />

          <Flex className="bg-white" direction="column" justify="center">
              <img alt={loginname} className="avatar_img" src={avatar_url}  />
              <p className="avatar_name">{loginname}</p>
          </Flex> 

          <List renderHeader='基础信息' className="mine-list">
            <List.Item extra={githubUsername}><i className="iconfont icon-github"></i> GitHub账户</List.Item>
            <List.Item extra={score}><i className="iconfont icon-jifen"></i> 积分</List.Item>
            <List.Item extra={Tools.formatDate(create_at)}><i className="iconfont icon-time"></i> 创建时间</List.Item>
            <List.Item arrow="horizontal" onClick={()=>{this.props.history.push(`/collect/${loginname}`)}}><i className="iconfont icon-like"></i> 收藏</List.Item>
          </List>

          <div className="user-list-wrap">
            <WhiteSpace size="md" />
            <div className="padding-LR15 font-gray">创建的主题</div>
            <WhiteSpace size="md" />
            <ul className="bg-white">
            {
              recent_topics.length > 0 ?(
                recent_topics.map((item,i)=>{
                  return (
                    <MsgItem data={item} key={i} />
                  )
                })
              ):(<li className="msg-item padding-LR15">没有新建的主题</li>)
            }
            </ul>
          </div>

          <div className="user-list-wrap">
            <WhiteSpace size="md" />
            <div className="padding-LR15 font-gray">回复的主题</div>
            <WhiteSpace size="md" />
            <ul className="bg-white">
            {
              recent_replies.length > 0 ?(
                recent_replies.map((item,i)=>{
                  return (
                    <MsgItem data={item} key={i} />
                  )
                })
              ):(<li className="msg-item padding-LR15">没有回复的主题</li>)
            }
            </ul>
          </div>

          <WhiteSpace size="lg" />
          {
            isSelf ?<WingBlank><Button size="small" onClick={
              ()=>{
                this.props.logout();
                this.props.history.push('/login');
              }} type="warning">注销</Button></WingBlank>:''
          }
          <WhiteSpace size="lg" />
        </div> 
        
      </div>
    );
  }
}

export default withRouter(User);