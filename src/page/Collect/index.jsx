import React,{ Component } from 'react';
import { withRouter } from 'react-router-dom';
import Item from '../../components/TopicItem';

import { NavBar, Icon } from 'antd-mobile';

class Collect extends Component {
  constructor(props) {
    super(props)
    this.state={
      height:parseInt((document.documentElement.clientHeight -50),10) +'px',
    }
  }
  componentWillMount(){
    // 传入URL的参数github用户名
    this.props.init(this.props.match.params.name);
  }
  render() {
    const { data } = this.props;
    return (
      <div>
        <NavBar
         mode="dark"
         icon={<Icon type="left" />}
         onLeftClick={() => this.props.history.goBack()}
         >收藏</NavBar>

        <div style={{height:this.state.height,overflow:'auto'}}>
          <ul className='tab-item ulnone'>
            {
              data.map((el) =>{
                return <Item key={el.id} data={el}  />
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
export default withRouter(Collect);