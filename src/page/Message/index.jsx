import React,{ Component } from 'react';
import { NavBar } from 'antd-mobile';
import { Link, withRouter } from 'react-router-dom';

import "./style.css";
class Message extends Component {
  constructor(props) {
    super(props);
    this.state={
      height:parseInt((document.documentElement.clientHeight -50 -45),10) +'px'
    }
  }
  componentWillMount(){
    this.props.init(this.props.accesstoken);
    if(this.props.count !== 0){
      this.props.msgMarkAll(this.props.accesstoken);
    }
  }
  render() {
    const {hasnot_read_messages,has_read_messages} = this.props.data;
    return (
      <div>
        <NavBar
          mode="dark"
        >信息</NavBar>
        <div style={{height:this.state.height,overflowY:'auto'}}>
          <p className="padding-LR20 font-gray">未读消息</p>
          <ul className="bg-white">
          {
            hasnot_read_messages.length > 0 ?(
              hasnot_read_messages.map((item,i)=>{
                return (
                  <li key={item.id} className="msg-item padding-LR20">
                    <Link to={`/user/${item.author.loginname}`} className="msg-txt">{item.author.loginname}</Link> 
                    在话题 
                    <Link to={`/topics/${item.topic.id}#${item.reply
                      .id}`} className="msg-txt">{item.topic.title}</Link>
                    中@了你
                  </li>
                )
              })
            ):(<li className="msg-item padding-LR20">没有未读消息</li>)
          }
          </ul>

          <p className="padding-LR20 font-gray">已读消息</p>
          <ul className="bg-white">
          {
            has_read_messages.length > 0 ?(
              has_read_messages.map((item,i)=>{
                return (
                  <li key={item.id} className="msg-item padding-LR20">
                    <Link to={`/user/${item.author.loginname}`} className="msg-txt">{item.author.loginname}</Link> 
                    在话题 
                    <Link to={`/topics/${item.topic.id}#${item.reply
                      .id}`} className="msg-txt">{item.topic.title}</Link>
                    中@了你
                  </li>
                )
              })
            ):(<li className="msg-item padding-LR20">没有已读消息</li>)
          }
          </ul>

        </div>
      </div>
      
    );
  }
}

export default withRouter(Message);