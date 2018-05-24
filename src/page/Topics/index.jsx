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
    const {data,askData,shareData,jobData,loginflag,avatar_url} = this.props;
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
            onChange={(tabs, index) => {
              this.props.changeTab(tabs.tab);
              this.props.changeTabIndex(index);
            }}
            // onTabClick={(tab, index) => {  }}
          >
          
            <TopicList tab={'all'} data={data} />
    
            <TopicList tab={'share'} data={shareData} />
      
            <TopicList tab={'ask'} data={askData} />

            <TopicList tab={'job'} data={jobData} />

          </Tabs>
          
        </div>
      </div>
      
    )
  }
}

export default withRouter(Index);