import React,{ Component } from 'react';
import './style.css'

import Tools from "../../utils";

class DetailHead extends Component{
  constructor(props){
    super(props);
    this.state = {
      isCollect:false
    }
    this.isClick = false;
  }
  componentWillMount(){
    // console.log(this.props.data.is_collect);
    this.setState({isCollect:this.props.data.is_collect})
  }
  targetCollect(){
    const {isCollect} = this.state;
    // console.log(isCollect);
    this.props.targetCollect(isCollect)
    this.setState({
      isCollect:!isCollect
    })
    this.isClick = true;
  }
  /* componentWillReceiveProps(nextProps){
    if(this.isClick){
      nextProps.collectISuc ? console.log(1) : console.log(0)
      this.isClick = false;
    }
    // console.log(nextProps,'componentWillReceiveProps')
  }
  componentWillUpdate(nextProps,nextStates){
    // console.log(nextProps,'componentWillUpdate')
  } */
  render(){
    const {title,visit_count,create_at} = this.props.data;
    const {loginname} = this.props.data.author;
    const {isCollect} = this.state;

    // const {collectISuc,deCollectISuc} = this.props;
    // console.log(collectISuc,deCollectISuc,'render')
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