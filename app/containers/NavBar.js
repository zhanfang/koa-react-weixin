import React, { Component } from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Menu, Icon } from 'antd';
import '../less/menu.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'index',
      theme: 'dark'
    }
  }

  handleClick(e) {
    this.setState({
      current: e.key
    });
    if (e.key) {
      let url = '/weixin/' + e.key;
      browserHistory.push(url);
    }
  }
  render() {
    return (
      <Menu theme={this.state.theme} onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="index">
          <Icon type="mail"/>关键字回复
        </Menu.Item>
        <Menu.Item key="msg">
          <Icon type="mail"/>收到信息
        </Menu.Item>
        <Menu.Item key="wxuser">
          <Icon type="mail"/>关注的用户
        </Menu.Item>
        <Menu.Item key="page">
          <Icon type="mail"/>文章
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />导航 - 子菜单</span>}>
          <MenuItemGroup title="分组1">
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="分组2">
            <Menu.Item key="setting:3">选项3</Menu.Item>
            <Menu.Item key="setting:4">选项4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="#">导航四 - 链接</a>
        </Menu.Item>
        <Menu.Item key="logout" className="logout">
          <a href="/weixin/logout">logout</a>
        </Menu.Item>
      </Menu>
      );
  }
}

export default NavBar;
