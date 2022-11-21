import React, { useState, useRef, useEffect } from 'react';
import { View, Alert, Image, ScrollView, SafeAreaView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import styles from './ViewCreateEditPublication.Style';
import { errorsFirebase } from '../const';
import {getUniqueId} from 'react-native-device-info';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ActivityIndicatorComponent from '../Components/ActivityIndicatorComponent';

const ViewCreateEditPublicationScreen = ({route}) => {

  // Set an initializing state whilst Firebase connects
  const [textTitle, onChangeTextTitle] = useState(null);
  const [textDescription, onChangeTextDescription] = useState(null);
  const [buttonImageDisabled, setButtonImageDisabled] = useState(true);
  const [imageBase64, setImageBase64]  = useState(null);
  const [visible, setVisible] = useState(false);
  const [labelPublication, setLabelPublication ] = useState(null);
  const [isEditable, setIsEditable] = useState();
  const [editFirstTime, setEditFirstTime] = useState(0);
  const [lblSnackBar, setLblSnackBar] = useState("Guardada");
  const [lblButtonSubmit, setLblButtonSubmit] = useState("Crear");
  const [showButtons, setShowButtons] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const refTextTitle = useRef(null);
  const refTextDescription = useRef(null);

  const navigation = useNavigation();

  const onDismissSnackBar = () => setVisible(false);

  const { typeView, data, key } = route.params;

  useEffect(() => {

    if ( typeView && typeView != null && typeof typeView != "undefined" && editFirstTime == 0) {
      configView(typeView, data);
    }
    validateFields();
  },[textDescription, textTitle, imageBase64, typeView]);

  const setData = (data) => {
    let result = JSON.parse(data)
    setImageBase64(result.imageBase64);
    onChangeTextDescription(result.description);
    onChangeTextTitle(result.title);
  }

  const configView = (typeView, data) => {

    switch (typeView) {
      case "VIEW":
        setData(data);
        setLabelPublication("Ver");
        setLblButtonSubmit("Ver");
        setIsEditable(false);
        setShowButtons(false);
        break;
      case "EDIT":
        setData(data);
        setLabelPublication("Editar");
        setLblButtonSubmit("Editar");
        setIsEditable(true);
        setEditFirstTime(1);
        break;
      default :
        setLabelPublication("Crear");
        setLblButtonSubmit("Crear");
        setIsEditable(true);
        break;
    }
  }

  const handleErrorsFirebase = (code) => {
    if ( code == errorsFirebase.permissionDenied )
    Alert.alert(
      "Error",
      "No tiene permisos para escribir en la base de datos",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  }

  const onPress = () => {
    
    console.log("Device id: ", getUniqueId());
    console.log("Title y Descripcion: ", textTitle + textDescription);
    setShowLoading(!showLoading);
    if (typeView == "CREATE") {

      database().ref('publications').push({
        title: textTitle,
        description: textDescription,
        imageBase64: imageBase64,
        getUniqueId: getUniqueId()
      }).then((data)=> {
        onChangeTextDescription(null);
        onChangeTextTitle(null);
        setImageBase64(null);
        setShowLoading(false);
        setLblSnackBar("Guardada");
        setVisible(!visible);
      }).catch((err)=> {
        handleErrorsFirebase(err.code);
      });

    } 

    if (typeView == "EDIT") {

      let result = JSON.parse(data);

      database().ref('publications/' + key).update({
        title: textTitle,
        description: textDescription,
        imageBase64: imageBase64,
        getUniqueId: getUniqueId()
      }).then((data)=> {
        setShowLoading(false);
        setLblSnackBar("Actualizada");
        setVisible(!visible)
      }).catch((err)=> {
        handleErrorsFirebase(err.code);
      });

    } 
  }

  const validateFields = () => {
    if( imageBase64 && textTitle && textDescription ){
      setButtonImageDisabled(false)
    } else {
      setButtonImageDisabled(true)
    }
  }

  return (
    <>
    <SafeAreaView style={styles.view}>
      { (showLoading) ? 
        <ActivityIndicatorComponent animating={showLoading} style={styles.loading} size={"large"} />
      :
      <ScrollView>
          <Text variant="displaySmall" style={styles.text}>{labelPublication} Publicacion</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTextTitle}
            value={textTitle}
            multiline={true}
            numberOfLines={1}
            label={"Titulo"}
            ref={refTextTitle}
            textColor={ "black" }
            editable={isEditable}
          />
          <TextInput
            style={styles.inputArea}
            onChangeText={onChangeTextDescription}
            value={textDescription}
            multiline={true}
            numberOfLines={10}
            label={"Descripcion"}
            ref={refTextDescription}
            textColor={ "black" }
            editable={isEditable}
          />
          {
            imageBase64 && imageBase64 != null && <Image style={styles.tinyLogo} source={{uri: "data:image/png;base64," + imageBase64}} />
          }
          { showButtons && 
            <Button 
              style={styles.button}
              onPress={ async ()=>{
                const result = await launchImageLibrary({includeBase64: true});
                setImageBase64(( result.didCancel ) ? imageBase64 : result.assets[0].base64);
                validateFields();
              }}
              disabled={!isEditable}
              labelStyle= {styles.colorLabelButtons}
              contentStyle= {styles.contentStyleButtons}
              mode="elevated"
            >
              Subir Imagen
            </Button>
          }
          {
            showButtons &&  
            <Button 
              style={styles.button}
              onPress={onPress}
              disabled={ buttonImageDisabled || !isEditable}
              labelStyle= {styles.colorLabelButtons}
              contentStyle= {styles.contentStyleButtons}
              mode="elevated"
            >
              {lblButtonSubmit}
            </Button>
          }
        </ScrollView>}
        <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: 'Ok',
              onPress: () => {
                // Do something
                navigation.navigate("ListPublications");
              },
            }}>
            Publicacion {lblSnackBar} exitosamente
        </Snackbar>
      </SafeAreaView>
      </>
  );

}

export default ViewCreateEditPublicationScreen;