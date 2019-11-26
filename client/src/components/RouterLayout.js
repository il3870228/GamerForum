import React, { Component } from "react";
import { Link } from "react-router-dom";
import GamePage from "./GamePage/GamePage";
import SearchPage from './Search/SearchPage';
import Home from './Home/Home';
import { Redirect } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import 'antd/dist/antd.css';
const { Header, Content } = Layout;
class RouterLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('this.props.location: ', this.props.location);
    if (this.props.location.state.username === null) {
      return (<Redirect to={{ pathname: '/' }} />);
    }
    const username = this.props.location.state.username;
    //const password = this.props.location.state.username;
    const pathName = this.props.location.pathname;
    console.log('pathname: ', pathName);
    let renderedPage;
    if (pathName === '/Overwatch') {
      renderedPage = <GamePage username={username} game='Overwatch' />
      console.log('ow')
    } else if (pathName === '/PUBG') {
      renderedPage = <GamePage username={username} game='PUBG' />
      console.log('pubg')
    } else if (pathName === '/Home') {
      renderedPage = <Home username={username}/>
      console.log('Home');
    } else {
      renderedPage = <SearchPage />
      console.log('search page')
    }
    return (
      <div>
        <Layout>
          <Header>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.props.location.pathname]}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key='/Home'>
                Home
                <Link to={{ pathname: '/Home', state: { username: username } }} />
              </Menu.Item>
              <Menu.Item key='/Overwatch'>
                Overwatch
                <Link to={{ pathname: '/Overwatch', state: { username: username } }} />
              </Menu.Item>
              <Menu.Item key='/PUBG'>
                PUBG
                <Link to={{ pathname: '/PUBG', state: { username: username } }} />
              </Menu.Item>
              <Menu.Item key='/Search'>
                Search
                <Link to={{ pathname: '/Search', state: { username: username } }} />
              </Menu.Item>
              <Menu.Item key='/'>
                Sign out
                <Link to='/' />
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
