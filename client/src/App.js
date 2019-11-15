import React, { Component } from "react";
import HomePage from "./components/HomePage/HomePage";
import SearchPage from './components/Search/SearchPage';
import LoginForm from './components/Login/LoginForm';
import SignUpForm from './components/Login/SignUpForm';
import LoginSignUpPage from './components/Login/LoginSignUpPage';
import { Menu, Layout} from 'antd';
import 'antd/dist/antd.css';
import './App.css'
const {Header, Content} = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {pageIdx: "0"};//0: HomePage, 1: searchPage
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    console.log('menu handleClick e: ', event);
    this.setState({
      pageIdx: event.key
    })
  }

  render() {
    //var renderPage = this.state.pageIdx === "0" ? <HomePage/> : <SearchPage/>
    return (
      <LoginSignUpPage/>
    /*
    <div>
      <Layout>
        <Header>
          <Menu
              onClick={this.handleClick}
              theme="dark"
              mode="horizontal"
              selectedKeys={[this.state.pageIdx]}
              style={{lineHeight: '64px'}}
            >
              <Menu.Item key={0}>
                Home
              </Menu.Item>
              <Menu.Item key={1}>
                Search
              </Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <Layout className='lc'>
        <Content className='mt'>
          {renderPage}
        </Content>
      </Layout>
    </div>
    */
    );
  }
}
export default App;
