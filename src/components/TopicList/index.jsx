import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import TopicItem from '../TopicItem'

import { getTopics } from '../../actions'
import store from '../../store'
import './style.css'

class TopicList extends Component{
  constructor(props){
    super(props);
    this.states={}
  }
  componentWillMount(){
    this.props.changeTab(this.props.tab)
  }
  render(){
    let data = null;
    switch(this.props.tab){
      case 'all':  data = this.props.data;break;
      case 'share':  data = this.props.shareData;break;
      case 'ask':  data = this.props.askData;break;
      case 'job':  data = this.props.jobData;break;
      default:  data = this.props.data;break;
    }
    return(
      <div ref={(box)=>this.box = box} style={{overflowY:'auto',height:'100%'}}>
        <ul className='tab-item ulnone'>
          {
            data.map((el) =>{
              return <TopicItem key={el.id} data={el}  />
            })
          }
        </ul>
        <div className="k-letter-holder" >
          <div className="k-letter-1b k-letter">L</div>
          <div className="k-letter-2b k-letter">o</div>
          <div className="k-letter-3b k-letter">a</div>
          <div className="k-letter-4b k-letter">d</div>
          <div className="k-letter-5b k-letter">i</div>
          <div className="k-letter-6b k-letter">n</div>
          <div className="k-letter-7b k-letter">g</div>
          <div className="k-letter-8b k-letter">.</div>
          <div className="k-letter-9b k-letter">.</div>
          <div className="k-letter-10b k-letter">.</div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    const {tab} = this.props;
    this.box.addEventListener('scroll', (e) => {
        let box_height = e.target.offsetHeight;
        let scroll_top = e.target.scrollTop;
        let doc_height = e.target.scrollHeight;
        // 文档高度 + 提示文字的高度 = 盒子高度  + 滚动的高度
        let scroll = doc_height - scroll_top ;
        if(box_height >= scroll ){
          store.dispatch(getTopics(tab,store.getState().topics.page +1))
        }
    });
  }
  componentWillUnmount() {
    this.box.onscroll = '';
  }
}

export default withRouter(TopicList);