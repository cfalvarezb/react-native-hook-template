import {createDrawerNavigator} from '@react-navigation/drawer';
import ProfileScreen from '../Profile/Profile.Screen';
import FollowerScreen from '../Follower/Follower.Screen';
import React from 'react';
import colors from '../Themes/Colors';
import styles from './DrawerNavigator.Style';
import CounterScreen from '../Counter/Counter.Screen';
import ContactsScreen from '../Contacts/Contacts.screen';
import DropDownScreen from '../DropDown/DropDown.screen';

const Drawer = createDrawerNavigator();

const DrawerNavigatorScreen = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: colors.primary,
        labelStyle: styles.textItemMenu,
      }}>
      <Drawer.Screen
        name="DropDownScreen"
        component={DropDownScreen}
        options={{drawerLabel: 'DropDown'}}
      />
      <Drawer.Screen
        name="ContactsScreen"
        component={ContactsScreen}
        options={{drawerLabel: 'Contacts'}}
      />
      <Drawer.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{drawerLabel: 'Profile'}}
      />
      <Drawer.Screen
        name="FollowerScreen"
        component={FollowerScreen}
        options={{drawerLabel: 'Follower'}}
      />
      <Drawer.Screen
        name="CounterScreen"
        component={CounterScreen}
        options={{drawerLabel: 'Counter'}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigatorScreen;
