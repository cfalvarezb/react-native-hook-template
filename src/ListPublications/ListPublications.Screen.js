import React, { useState, useEffect, useCallback } from 'react';
import { Image, ScrollView, SafeAreaView, Alert, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import styles from './ListPublications.Style';
import { List, Divider, AnimatedFAB, Menu, Snackbar } from 'react-native-paper';
import ActivityIndicatorComponent from '../Components/ActivityIndicatorComponent';
import { TopBarComponent } from '../Components/TopBar';
import { DialogComponent } from '../Components/Dialog';


const ListPublicationsScreen = () => {

  // Set an initializing state whilst Firebase connects
  const [sections, setSections] = useState(null);
  const [sectionsOriginal, setSectionsOriginal] = useState(null);
  const [section, setSection] = useState(null);
  const [isExtended, setIsExtended] = useState(true);
  const [pageXY, setPageXY] = useState({
    x: 0,
    y: 0
  });
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleSnackBar, setVisibleSnackBar] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [visibleDialogComponent, setVisibleDialogComponent] = useState(false);
  const [ textInputValue, setTextInputValue ] = useState(null);
  const [ iconTopBar, setIconTopBar ] = useState("magnify");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getListPublications();
    setRefreshing(false);
  }, []);

  const onDismissSnackBar = () => setVisibleSnackBar(false);

  const navigation = useNavigation();

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { ["right"]: 16 };
  const closeMenu = () => setVisibleMenu(false);

  const getListPublications = () => {

    database()
    .ref(`publications`)
    .on('value', snapshot => {

      let list = [];

      snapshot.forEach((childSnapshot) => {
        list.push(childSnapshot);
      })

      setSections(list)
      setSectionsOriginal(list)
      setShowLoading(!setShowLoading)
    });

  }

  useEffect(() => {
    getListPublications();
  }, []);

  const _actionDoneDialog = () => {
    console.log("Texto Dialog: ", textInputValue);
    setVisibleDialogComponent(!visibleDialogComponent)
    setIconTopBar("close-outline")
    let newSections = []
    sections.map((childSnapshot, index) => {
      if (childSnapshot.val().title.toUpperCase().search(textInputValue.toUpperCase()) >= 0) {
        newSections.push(childSnapshot);
      }
      
    })
    setSections(newSections);
  }

  const _actionCancelDialog = () => {
    setVisibleDialogComponent(!visibleDialogComponent)
    setIconTopBar("magnify")
  }

  const _actionSearch = () => {
    setTextInputValue("");
    if ( iconTopBar == "close-outline" ) {
      setIconTopBar("magnify");
      setSections(sectionsOriginal);
    } else {
      setVisibleDialogComponent(!visibleDialogComponent);
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicatorComponent animating={showLoading} style={styles.loading} size={"large"} />
      <ScrollView 
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        } 
        onScroll={onScroll}
      >

        <TopBarComponent title={"Lista De Publicaciones"} search={_actionSearch} icon={iconTopBar} />
        <Divider bold={true} style={{ "marginTop": "2%", "marginBottom": "4%" }} />
        {
          sections != null && sections.map((childSnapshot, index) => {
            return (
              <List.Item
                title={childSnapshot.val().title}
                description={childSnapshot.val().description}
                left={props => <Image {...props} style={styles.tinyLogo} source={{ uri: "data:image/png;base64," + childSnapshot.val().imageBase64 }} />}
                titleNumberOfLines={1}
                titleStyle={styles.titleStyle}
                descriptionStyle={styles.descriptionStyle}
                key={index + "-" + childSnapshot.val().getUniqueId}
                onPress={(e) => {
                  setSection(sections[index]);
                  setVisibleMenu(!visibleMenu);
                  setPageXY({
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
          onPress={() => navigation.navigate("ViewCreateEditPublication", { typeView: "CREATE" })}
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
        
        <Menu.Item 
          onPress={() => { 
            setVisibleMenu(!visibleMenu); 
            navigation.navigate("ViewCreateEditPublication", { typeView: "EDIT", data: JSON.stringify(section), key: section.key })
          }}
          title="Editar" 
        />
        <Menu.Item onPress={() => {
          Alert.alert(
            "Alerta",
            "Seguro desea eliminar el item seleccionado?",
            [
              {
                text: "Si",
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

      <DialogComponent 
        dismissable={false} 
        visible={visibleDialogComponent} 
        onDismiss={()=>{setVisibleDialogComponent(!visibleDialogComponent)}} 
        title={"Informacion"} 
        done={_actionDoneDialog} 
        cancel={_actionCancelDialog}
        titleDone={"Aceptar"}
        titleCancel={"Cancel"}
        textInputValue={textInputValue}
        onChangeText={setTextInputValue}
      />

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