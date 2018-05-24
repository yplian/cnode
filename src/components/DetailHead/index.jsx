import React,{ Component } from 'react';
import { Toast } from "antd-mobile";
import './style.css'

import Tools from "../../utils";

class DetailHead extends Component{
  constructor(props){
    super(props);
    this.state = {
      isCollect:false,
      isInit:false
    }
    this.isClick = false;
  }
  componentWillMount(){
    // console.log(this.props.data.is_collect,this.state.isCollect,'componentDidMount');
    this.setState({isCollect:this.props.data.is_collect,isInit:true})
  }
  targetCollect(){
    const {isCollect} = this.state;
    this.props.targetCollect(isCollect)
    this.setState({
      isCollect:!isCollect
    })
    this.isClick = true;
  }
  componentWillReceiveProps(nextProps){
    // console.log(nextProps,this.state.isCollect,'componentWillReceiveProps')
    const {isInit} = this.state;
    if(isInit){
      this.setState({isCollect:nextProps.data.is_collect,isInit:false})
    }
  }
  componentDidUpdate(nextProps,nextState){
    const {collectISuc,deCollectISuc} = this.props;
    if(this.isClick){
      if(collectISuc){
        Toast.info('收藏成功 ~.~',1);
        this.props.resetCollect();
      }else{}
      if(deCollectISuc){
        Toast.info('取消收藏 >.<',1);
        this.props.resetDeCollect();         
      }else{}
    }
    
  }
  render(){
    const {title,visit_count,create_at} = this.props.data;
    const {loginname} = this.props.data.author;
    const {isCollect} = this.state;
    return(
      <div className="head">
        <h2>{title}</h2>
        <div className="author">
          <span>发布于:{Tools.formatDate(create_at)}</span>
          <span>作者:{loginname}</span>
          <span>访问数量:{visit_count}</span>
          <span>
            <i style={{color:'#f60',fontSize:'21px'}} 
               className={isCollect ? "iconfont icon-collection_fill":"iconfont icon-collection"}
               onClick={() => {this.targetCollect()}}
            >
            </i>
          </span>
        </div>

      </div>
    )
  }
}
DetailHead.defaultProps={
  targetCollect:()=>{}
}
export default DetailHead;