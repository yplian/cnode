import React,{ Component } from 'react';

import './style.css'

class Loading extends Component{
  constructor(props){
    super(props);
    this.state={}
  }
  static defaultProps = {
    height:'100%',
    isShow: true,
    value:''
  }
  render(){
    const {height,isShow,value} =this.props;
    return(
      <div className="loading-box" style={{height:height,display:isShow?'flex':'none'}}>
        <p className="loading-txt">{value}</p>
        <div className="k-ball-holder">
          <div className="k-ball7a"></div>
          <div className="k-ball7b"></div>
          <div className="k-ball7c"></div>
          <div className="k-ball7d"></div>
        </div>
      </div>
      
    )
  }
}

export default Loading;