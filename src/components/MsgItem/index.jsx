import React,{ Component } from 'react';
import { Flex } from 'antd-mobile';
import { Link } from "react-router-dom";

import Tools from "../../utils";

class MsgItem extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
    const {id,title,last_reply_at} = this.props.data;
    const {loginname,avatar_url} = this.props.data.author;
    return(
      <li style={{width:'100%',height:'40px'}}>
          <Flex className="list-item" justify="center" align="center">
            <div className="item-author-img" >
              <img alt={loginname} src={avatar_url} />
            </div>

            <Flex.Item className="item-title">
              <Link style={{color:'#108ee9'}} to={`/topics/${id}`}  title={title}>{title}</Link>
            </Flex.Item>
            
            <div className="item-info" style={{color:'#888',fontSize:'14px'}}>
              <span className="item-info-time" >{Tools.formatDate(last_reply_at)}</span>
            </div>
          </Flex>
      </li>
    )
  }
  
}

export default MsgItem;