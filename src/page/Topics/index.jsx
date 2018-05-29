import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Tabs, NavBar } from 'antd-mobile';
import TopicList from '../../components/TopicList'

const tabs = [
  { title: '全部' , tab:'all' },
  { title: '分享' , tab:'share' },
  { title: '问答' , tab:'ask' },
  { title: '招聘' , tab:'job' },
];

class Index extends Component{
  constructor(props){
    super(props)
    this.state = {
      height: parseInt((document.documentElement.clientHeight -45 -50 ),10) +'px'
    }
  }
  componentWillMount() {
    this.props.init()
  }
  render(){
    const {loginflag,avatar_url} = this.props;
    return(
      <div style={{height:this.state.height + 45}}>
        <NavBar  
          mode="dark"
          icon={loginflag ? <img alt='已登录' className='avatar_img' style={{width:'32px',height:'32px'}} src={avatar_url} /> : '未登录'}
          onLeftClick={() => loginflag?'':this.props.history.push('/login')}
          rightContent={
            <i onClick={() => this.props.history.push('/creact')} className="iconfont icon-addition" style={{fontSize:'22px'}}></i>
          }
         >主题
        </NavBar>

        <div style={{height:this.state.height}}>
          <Tabs tabs={tabs}
            initialPage={this.props.tabIndex}
            distanceToChangeTab={0.1}
            prerenderingSiblingsNumber={false}
            onChange={(tabs, index) => {
              // this.props.changeTab(tabs.tab);
              // 保存当前切换的index
              this.props.changeTabIndex(index);
            }}
            // onTabClick={(tab, index) => {  }}
          >
          
            <TopicList tab={'all'} {...this.props} />
    
            <TopicList tab={'share'}  {...this.props} />
      
            <TopicList tab={'ask'}  {...this.props} />

            <TopicList tab={'job'}  {...this.props} />

          </Tabs>
          
        </div>
      </div>
      
    )
  }
}

export default withRouter(Index);