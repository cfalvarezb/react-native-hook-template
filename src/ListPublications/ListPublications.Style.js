import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
   paddingTop: 22,
   backgroundColor: "white"
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
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})