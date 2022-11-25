import {StyleSheet} from 'react-native';
import ApplicationStyle from '../Themes/Application.Style';
import {fontFamily, fontSize} from '../const';
import colors from '../Themes/Colors';

export default StyleSheet.create({
  ...ApplicationStyle,
  textContent: {
    fontFamily: fontFamily.regular,
    color: colors.charcoalGrey,
    fontSize: fontSize.medium,
    marginTop: 10,
    alignSelf: 'center',
  },
  view: {
    backgroundColor: "white",
    flexGrow: 1,
  },
  text: {
    margin: 8,
    padding: 8,
    color: "black"
  },
  input: {
    margin: 12,
    borderWidth: 0,
    padding: 10,
    color: "black",
    backgroundColor: "white"
  },
  inputArea: {
    margin: 12,
    borderWidth: 0,
    padding: 10,
    color: "black",
    backgroundColor: "white"
  },
  button: {
    //alignItems: "center",
    //backgroundColor: "gray",
    margin: 12,
    padding: 10,
    color: "white"
  },
  tinyLogo: {
    width: 200,
    height: 200,
    marginLeft: 100,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  colorLabelButtons: {
    color: "white"
  },
  contentStyleButtons : {
    width: "100%"
  }
});