import React,{ Component } from 'react';
import { Flex, Toast } from 'antd-mobile';
import { Link } from "react-router-dom";

import Discuss from '../Discuss'
import Tools from "../../utils";
import './style.css'

class DetailReply extends Component{
  constructor(props){
    super(props);
    this.state = {
      hidden: false,
      upsicon: false,
      upsnum: 0
    }
  }
  componentWillMount(){
    let upsicon = this.props.floorData.is_uped;
    let upsnum = this.props.floorData.ups.length;
    this.setState({
      upsicon: upsicon,
      upsnum: upsnum,
    })
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.floorData.author.loginname===''){
      return false;
    }else{
      return true;
    }
  }
  handleClick(type){
    const {floorData,loginname} =this.props;
    const {upsnum,upsicon} =this.state;
    // type 点击类型 分点赞 评论
    if(type === 1){
      if(floorData.author.loginname === loginname){
        Toast.fail('自己不能给自己点赞',1);
      }else {
        this.props.praise(this.props.floorData.id);
        this.setState({
          upsicon: !upsicon,
          upsnum: upsicon ? upsnum-1 : upsnum +1
        })    
      }
    }else if(type === 2){
      this.setState({
        hidden: true
      })
    }
  }
  render(){
    const {content,author,create_at,id} = this.props.floorData;
    const {hidden,upsicon,upsnum} = this.state;
    return(
      <Flex className="replay" id={id}>
        <div className="replay-author-img">
          <img alt={author.loginname} src={author.avatar_url} />
        </div>
        <Flex.Item>
          <div className="replay-author-wrap">
            <Link to={`/user/${author.loginname}`} className="replay-author-name">{author.loginname}</Link>
            <span>&nbsp;&nbsp;{this.props.index + 1}楼</span>
            <span>&nbsp;&nbsp;{Tools.formatDate(create_at)}</span>

            <span style={{float:'right',paddingLeft:'5px'}}  onClick={()=>{this.handleClick(2)}}>
              <i className="iconfont icon-message"></i>
            </span>
            
            <span style={{float:'right'}} onClick={()=>{this.handleClick(1)}}>
              <i className={upsicon?"iconfont icon-praise_fill":"iconfont icon-praise"}></i>
              {upsnum}
            </span>
            
          </div>
          <div className="markdown-body replay-markdown-body" 
            dangerouslySetInnerHTML = {{__html: content}}
          ></div>

          {hidden?<Discuss 
              showDis={hidden}
              cancelBtnShow={true}
              cancelDis={()=>{this.setState({hidden:false})}}
              reportDis={(val)=>{
                let value = `@${author.loginname} `+val;
                this.props.discuss(value,id);
                this.setState({hidden:false});
                this.props.refresh();
              }}
            />:''
          }
          
        </Flex.Item>
      </Flex>
    )
  }
}

export default DetailReply;