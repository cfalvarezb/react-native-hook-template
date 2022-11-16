import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import styles from './ListPublications.Style';
import { errorsFirebase } from '../const';
import { List, Text, Divider, AnimatedFAB, Menu, Snackbar } from 'react-native-paper';


const ListPublicationsScreen = () => {

  // Set an initializing state whilst Firebase connects
  const [sections, setSections] = useState(null);
  const [section, setSection] = useState(null);
  const [isExtended, setIsExtended] = useState(true);
  const [pageXY , setPageXY] = useState({
    x: 0,
    y: 0
  });
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const navigation =  useNavigation();

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { ["right"]: 16 };
  const closeMenu = () => setVisibleMenu(false);

  useEffect(() => {
    database()
      .ref(`publications`)
        .on('value', snapshot => {

          let list = [];

          snapshot.forEach((childSnapshot)=>{
            list.push(childSnapshot);
          })

          setSections(list) 
    });

  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        <Divider bold={true} style={{"marginTop": "2%", "marginBottom": "2%"}}/>
        <Text style={styles.titleStyle} variant="displaySmall">Lista De Publicaciones</Text>
        <Divider bold={true} style={{"marginTop": "2%","marginBottom": "4%"}}/>
        
        {
          sections != null && sections.map((childSnapshot, index) => {
            return (
              <List.Item
                title={childSnapshot.val().title}
                description={childSnapshot.val().description}
                left={props => <Image {...props} style={styles.tinyLogo} source={{uri: "data:image/png;base64," + childSnapshot.val().imageBase64}} />}
                titleNumberOfLines={1}
                titleStyle={styles.titleStyle}
                descriptionStyle={styles.descriptionStyle}
                key={index + "-" +childSnapshot.val().getUniqueId}
                onPress={(e)=> {
                  setSection(sections[index]);
                  setVisibleMenu(!visibleMenu); 
                  setPageXY( {
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY
                  });
                }}
              />
            )
          })
        }
      </ScrollView>
      <AnimatedFAB
          icon={'plus'}
          label={'Agregar'}
          extended={isExtended}
          onPress={() => navigation.navigate("ViewCreateEditPublication", { typeView: "CREATE"})}
          visible={true}
          animateFrom={'right'}
          iconMode={'dynamic'}
          style={[styles.fabStyle, fabStyle]}
          color={"white"}
      />
        <Menu
          anchor={pageXY}
          visible={visibleMenu}
          onDismiss={closeMenu}
          >
          <Menu.Item onPress={() => { setVisibleMenu(!visibleMenu); navigation.navigate("ViewCreateEditPublication", { typeView: "VIEW", data: JSON.stringify(section) }) }} title="Ver" />
          <Menu.Item onPress={() => { setVisibleMenu(!visibleMenu); navigation.navigate("ViewCreateEditPublication", { typeView: "EDIT", data: JSON.stringify(section) }) }} title="Editar" />
          <Menu.Item onPress={() => { 
            Alert.alert(
              "Alerta",
              "Seguro desea eliminar el item seleccionado?",
              [
                { text: "Si", 
                  onPress: () => {
                    database().ref('publications').child('' + section.key).remove(() => {
                                                                            setVisibleSnackBar(!visibleSnackBar);
                                                                          })
                  }
                },
                { text: "No", onPress: () => console.log("OK Pressed") }
              ]
            );
            setVisibleMenu(!visibleMenu);
            }} 
            title="Eliminar" 
          />
        </Menu>
        <Snackbar
          visible={visibleSnackBar}
          onDismiss={onDismissSnackBar}
          action={{
            label: 'Ok',
            onPress: () => {
              // Do something
              console.log("Eliminado")
            },
          }}>
          Item eliminado exitosamente
        </Snackbar>
    </SafeAreaView>
  );

}

export default ListPublicationsScreen;