import React, { Component } from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import '../less/menu.less';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuWx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail',
      theme: 'dark'
    }
  }

  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  }
  render() {
    return (
      <Menu theme={this.state.theme}
      onClick={this.handleClick.bind(this)}
      selectedKeys={[this.state.current]}
      mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />关键字回复
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />文章
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
          <a href="http://www.alipay.com/" target="_blank">导航四 - 链接</a>
        </Menu.Item>
        <Menu.Item key="logout" className="logout">
          <a href="/weixin/logout">logout</a>
        </Menu.Item>
      </Menu>
      );
  }
}

export default MenuWx;
