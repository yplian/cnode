import React,{ Component } from 'react';
import { Flex ,Badge } from 'antd-mobile';
import { Link,withRouter } from "react-router-dom";

import Tools from "../../utils";
// import './style.css'

const Flag = ({type}) => {
  switch (type) {
    case 'share':
      return <Badge text='分享' style={{backgroundColor:'#91e456'}} />
    case 'ask':
      return <Badge text='问答' style={{backgroundColor:'#f4bc00'}} />
    case 'good':
      return <Badge text='精华' style={{backgroundColor:''}} />
    case 'dev':
      return <Badge text='测试' style={{backgroundColor:''}} />
    case 'job':
      return <Badge text='招聘' style={{backgroundColor:''}} />
    default:
      return <Badge text={type} />
  }
}

class TopicItem extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  
  render(){
    const {tab,title,reply_count,visit_count,id,last_reply_at,top,good,author} = this.props.data;
    return(
      <li style={{width:'100%',height:'40px'}}>
          <Flex className="list-item" justify="center" align="center">
            <div className="item-author-img" >
              <img alt={author.loginname} src={author.avatar_url} />
            </div>
            <div className="item-tab-type">
              {
                top?<Badge text='置顶' style={{backgroundColor:'#ff5b05'}} />:(good?<Badge text='精华' style={{backgroundColor:'#ff5b05'}} />:<Flag type={tab} />)
              }
            </div>
            <Flex.Item className="item-title">
              <Link to={`/topics/${id}`}  title={title}>{title}</Link>
            </Flex.Item>
            <div className="item-info">
              <span className="item-info-count" >{reply_count}/{visit_count}</span>
              <span className="item-info-time" >{Tools.formatDate(last_reply_at)}</span>
            </div>
          </Flex>
      </li>
    )
  }
  
}
TopicItem.defaultProps = {
  data:{
    id:'0',
    tab:"share",
    author:{loginname:'张三',avatar_url:'#'},
    title:'这是一个测试标题。。。。',
    img:'图片',
    reply_count:'0',
    visit_count:'2',
  }
}
export default withRouter(TopicItem);