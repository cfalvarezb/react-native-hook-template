import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import ApplicationStyle from '../Themes/Application.Style';
import {fontFamily, fontSize} from '../const';
import colors from '../Themes/Colors';
import { color } from 'react-native-reanimated';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
   paddingTop: 22,
   backgroundColor: "yellow"
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  tinyLogo: {
    width: 80,
    height: 60,
  },
  titleStyle : {
    fontWeight: "bold",
    color: "black"
  },
  descriptionStyle : {
    marginTop: "2%",
    color: "black"
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: "black",
  }
})