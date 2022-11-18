import * as React from 'react';
import { Appbar } from 'react-native-paper';

export const TopBarComponent = (props) => (
  <Appbar.Header>
    {/*<Appbar.BackAction onPress={() => {}} /> */}
    <Appbar.Content title={props.title} />
    <Appbar.Action icon={props.icon} onPress={props.search} />
  </Appbar.Header>
);