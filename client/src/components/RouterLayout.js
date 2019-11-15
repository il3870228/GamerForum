import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import HomePage from "./HomePage/HomePage";
import SearchPage from './Search/SearchPage';
import { Menu, Layout} from 'antd';
import 'antd/dist/antd.css';
const {Header, Content} = Layout;
class RouterLayout extends Component {
  render() {
    const renderedPage = this.props.location.pathname === '/Home' ? <HomePage/> : <SearchPage/>;
    console.log(this.props.location.pathname);
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
