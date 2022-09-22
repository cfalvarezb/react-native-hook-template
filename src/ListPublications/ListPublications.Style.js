import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import ApplicationStyle from '../Themes/Application.Style';
import {fontFamily, fontSize} from '../const';
import colors from '../Themes/Colors';

export default StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   backgroundColor: "silver"
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
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
    fontWeight: "bold"
  },
  descriptionStyle : {
    marginTop: "2%"
  }
})