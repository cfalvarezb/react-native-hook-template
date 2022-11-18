import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const ActivityIndicatorComponent = (props) => (
  <ActivityIndicator animating={props.animating} style={props.style} color={MD2Colors.black} size={props.size} />
);

export default ActivityIndicatorComponent;