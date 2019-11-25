import React, { Component } from "react";
import { Link } from "react-router-dom";
import Forum from "./Forum/Forum";
import SearchPage from './Search/SearchPage';
import { Redirect } from 'react-router-dom';
import { Menu, Layout} from 'antd';
import 'antd/dist/antd.css';
const {Header, Content} = Layout;
class RouterLayout extends Component {
  constructor(props){
		super(props);
	}
  render() {
    if (this.props.location.state == null) {
      return (<Redirect to={{pathname: '/'}}/>);
    }
    const username = this.props.location.state.username;
    //const password = this.props.location.state.username;
    const renderedPage = this.props.location.pathname === '/Home' ? <Forum username={username}/> : <SearchPage/>;
    console.log(username);
    return (
    <div>
      <Layout>
        <Header>
          <Menu
              onClick={this.handleClick}
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}
              style={{lineHeight: '64px'}}
            >
              <Menu.Item key='/Home'>
                Home
                <Link to='/Home'/>
              </Menu.Item>
              <Menu.Item key='/Search'>
                Search
                <Link to='/Search'/>
              </Menu.Item>
              <Menu.Item key='/'>
                Sign out
                <Link to='/'/>
              </Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <Layout className='lc'>
        <Content className='mt'>
          {renderedPage}
        </Content>
      </Layout>
    </div>
    );
  }
}
export default RouterLayout;
