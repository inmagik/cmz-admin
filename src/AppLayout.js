import React from 'react';
import { Layout, Menu, MenuItem, MenuItemUserProfile } from './lib/cmz/ui/layout';

const AppLayout = (props) => (<Layout
  {...props}
  brand="CMZ Admin"
  menu={(
    <Menu>
      <MenuItemUserProfile to="/profile">
        {({ user }) => (<span>Hey {user.username}</span>)}
      </MenuItemUserProfile>
      <MenuItem to="/" icon="fa fa-tachometer">Dashboard</MenuItem>
      <MenuItem to="/news" icon="fa fa-newspaper-o">News</MenuItem>
      <MenuItem to="/portfolio" icon="fa fa-newspaper-o">Portfolio</MenuItem>
    </Menu>
  )}>{props.children}</Layout>
);

export default AppLayout;
