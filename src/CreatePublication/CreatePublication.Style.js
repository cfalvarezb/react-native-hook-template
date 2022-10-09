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
    width: "100%",
    height: "100%",
    backgroundColor: "yellow"
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
    alignItems: "center",
    backgroundColor: "white",
    margin: 12,
    padding: 10,
    color: "black"
  },
});