import React,{ Component } from 'react';
// import { PullToRefresh, ListView, Button } from 'antd-mobile';

class NoMatch extends Component {
  constructor(props) {
    super(props);
    this.state={
      height:parseInt((document.documentElement.clientHeight -50),10) +'px'
    }
  }
  render() {
    return (
      <div style={{height:this.state.height}}>
        <div style={{
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          height:'100%',
          fontSize:'52px'
        }}>404</div>
      </div>
    );
  }
}

export default NoMatch;