import React , { Component } from 'react';
import { HashRouter as Router,Route,Switch,Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import asyncComponent from "../utils/asyncComponent.jsx";
import baseurl from "../utils/baseurl";
import Tools from "../utils";
import { saveUserKey, postCheckUser, getMessage } from '../actions';

const Home = asyncComponent(() => import("../components/Home"));
const Topics = asyncComponent(() => import("../containers/showTopic"));
const Detail = asyncComponent(() => import("../containers/showDetail"));
const Login = asyncComponent(() => import("../containers/showLogin"));
const User = asyncComponent(() => import("../containers/showUser"));
const Message = asyncComponent(() => import("../containers/showMessage"));
const NoMatch = asyncComponent(() => import("../page/NoMatch"));
const Collect = asyncComponent(() => import("../containers/showCollect"));
const Creact = asyncComponent(() => import("../containers/creactTopic"));
// const Test = asyncComponent(() => import("../components/MsgItem"));

class RouterConfig extends Component{
  componentWillMount(){
    this.props.init();
  }
  render(){
    // const loginflag = Tools.localItem('accesstoken');
    const loginflag = this.props.loginflag;
    return(
      <Router basename={`${baseurl}`}>
        <div style={{position: 'fixed', height: '100%', width: '100%', top: 0 }}>
            <Switch>
              {/* /  => topics */}
              <Route exact path='/' render={() => <Redirect to='/topics' />} /> 
              {/* 首页 */}
              <Route exact path="/topics" component={Topics}/>
              <Route path="/topics/:id" component={Detail}/>
              {/* 我的 */}
              <Route path="/mine" render={() => (
                loginflag ? (<User />) :(<Redirect to="/login"/>) 
              )}/>
              {/* 用户简要信息 */}
              <Route path="/user/:name" component={User}/>
              {/* 消息 */}
              <Route path="/message" render={() => (
                loginflag ? (<Message />) :(<Redirect to="/login"/>) 
              )}/>
              {/* 登录 */}
              <Route path="/login" component={Login}/>
              {/* 新建 */}
              <Route path="/creact" render={() => (
                loginflag ? (<Creact />) :(<Redirect to="/login"/>) 
              )}/>
              {/* 收藏 */}
              <Route path="/collect/:name" component={Collect}/>

              {/* 测试 */}
              {/* <Route path="/test" component={Test}/> */}
              {/* 404 */}
              <Route component={NoMatch}/>
            </Switch>

            <Home message_count={this.props.message_count} />
        </div>
      </Router>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  return {
    loginflag: state.user.summary.success,
    message_count: state.message.count
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      init: () => {
        const accesstoken = Tools.localItem('accesstoken');
        if(accesstoken){
          dispatch(saveUserKey(accesstoken));
          dispatch(postCheckUser(accesstoken));
          dispatch(getMessage(accesstoken));
        }
      }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RouterConfig);