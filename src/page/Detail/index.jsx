import React, { Component } from 'react';
import { WhiteSpace, NavBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import DetailHead from "../../components/DetailHead";
import DetailReply from "../../components/DetailReply";

import Loading from "../../components/Loading"

import './style.css'
import Discuss from '../../components/Discuss';


const headTxt = (type)=>{
  switch (type) {
    case 'share':
        return '分享'
    case 'ask':
        return '问答'
    case 'good':
        return '精华'
    case 'job':
        return '招聘'
    case 'dev':
        return '测试'
    default:
        return '加载中'
  }
}

class Detail extends Component {
  constructor(props){
    super(props)
    this.states ={
      height:parseInt((document.documentElement.clientHeight -45),10) +'px'
    }
  }
  componentWillMount(){
    this.props.init()
  }
  componentDidMount(){
    // 跳转锚点
    setTimeout(()=>{
      if(this.props.location.hash){
        let el = this.props.location.hash.replace('#','');
        document.getElementById(el).scrollIntoView();
      }
    },500)
  }
  componentWillUnmount(){
    this.props.Unmount();
  }
  render() {
    const {data,isShow} = this.props;
    const {height} = this.states;
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >{headTxt(data.tab)}</NavBar>
        
        {/* <a ref={(v)=>{this.tohref=v}} href={`${this.props.location.hash}`} style={{height:'0',display:'none'}}>锚点</a> */}

        <Loading height={height} isShow={!isShow} />

        <div style={{height:height,overflow:'auto'}}>
          <DetailHead {...this.props} />

          <WhiteSpace size="md" />
            
          <div className="markdown-body" 
            dangerouslySetInnerHTML = {{__html: data.content}}
          ></div>
          
          <div style={{borderBottom:'1px solid #ccc',padding:'0 5px',lineHeight:'30px'}}>
            共 <span className="font-org">{data.reply_count}</span> 条评论
          </div>
          {
            data.replies.map((el,i)=> {
              return <DetailReply key={i} {...this.props} floorData={el} index={i} />
            })
          }

          <div style={{padding:'0 5px',lineHeight:'30px'}}>添加回复</div>
          <Discuss 
            showDis={true}
            clearBtnShow={true}
            isFocus={false}
            reportDis={(val)=>{
              this.props.discuss(val);
              this.props.refresh();
            }}
          />

          <WhiteSpace size="md" />
          
        </div>

      </div>
    );
  }
}

export default withRouter(Detail);
/*  data.replies.map((el,i)=> {
              return <DetailReply key={i} data={el} index={i} handleClick={this.handleClick} {...this.props,{el}} />
            }) */