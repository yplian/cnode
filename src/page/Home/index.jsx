import React , { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { TabBar } from 'antd-mobile'

import { connect } from "react-redux";
import { tabBar, selectTab } from '../../actions'

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillMount(){
    let pathname = this.props.location.pathname;
    let select = '';
    switch (pathname){
      case '/topics':
        select = 'topics';break;
      case '/message':
        select = 'message';break;
      case '/mine':
        select = 'mine';break;
      default:
        select = 'topics';break;
    }
    this.props.Selected(select);
  }
  render(){
    const { selectedTab, hidden } = this.props;
    return(
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={hidden}
            noRenderContent={true}
          >
            <TabBar.Item
              title="内容"
              key="topics"
              icon={
                <i style={{fontSize:'26px',color: 'rgb(148, 148, 148)'}} className="iconfont icon-homepage"></i>
              }
              selectedIcon={
                <i style={{fontSize:'26px',color: 'rgb(51, 163, 244)'}} className="iconfont icon-homepage_fill"></i>
              }
              selected={selectedTab === 'topics'}
              onPress={() => {
                this.props.Selected('topics')
                this.props.history.push("/topics")
              }}
            />
            <TabBar.Item
              title="消息"
              key="message"
              icon={
                <i style={{fontSize:'26px',color: 'rgb(148, 148, 148)'}} className="iconfont icon-message"></i>
              }
              selectedIcon={
                <i style={{fontSize:'26px',color: 'rgb(51, 163, 244)'}} className="iconfont icon-message_fill"></i>
              }
              selected={selectedTab === 'message'}
              onPress={() => {
                this.props.Selected('message')
                this.props.history.push("/message")
              }}
              badge={this.props.message_count}
            />
            <TabBar.Item
              title="我的"
              key="mine"
              icon={
                <i style={{fontSize:'26px',color: 'rgb(148, 148, 148)'}} className="iconfont icon-mine"></i>
              }
              selectedIcon={
                <i style={{fontSize:'26px',color: 'rgb(51, 163, 244)'}} className="iconfont icon-mine_fill"></i>
              }
              selected={selectedTab === 'mine'}
              onPress={() => {
                this.props.Selected('mine')
                this.props.history.push("/mine")
              }}
            />

          </TabBar>
    )
  }
  componentDidMount(){
    this.props.toggle()
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log(state.utils)
  return {
    hidden: state.utils.hide,
    selectedTab: state.utils.selectedTab
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggle: () => {
      dispatch(tabBar(false))
    },
    Selected: (tab)=>{
      dispatch(selectTab(tab))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Home));