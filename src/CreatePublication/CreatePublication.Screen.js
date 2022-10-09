import React, { useState, useRef, useEffect } from 'react';
import { View, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import styles from './CreatePublication.Style';
import { errorsFirebase } from '../const';
import {getUniqueId} from 'react-native-device-info';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const CreatePublicationScreen = () => {

  // Set an initializing state whilst Firebase connects
  const [textTitle, onChangeTextTitle] = useState(null);
  const [textDescription, onChangeTextDescription] = useState(null);
  const [buttonImageDisabled, setButtonImageDisabled] = useState(true);
  const [imageBase64, setImageBase64]  = useState(null);
  const [visible, setVisible] = React.useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const refTextTitle = useRef(null);
  const refTextDescription = useRef(null);

  useEffect(() => {
    validateFields();
  },[textDescription, textTitle, imageBase64]);

  

  const navigation = useNavigation();

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
  
    
    database().ref('publications').push({
      title: textTitle,
      description: textDescription,
      imageBase64: imageBase64,
      getUniqueId: getUniqueId()
    }).then((data)=> {
      console.log("Data: ", data);
      onChangeTextDescription(null);
      onChangeTextTitle(null);
      setImageBase64(null);
      setVisible(!visible)
    }).catch((err)=> {
      console.log("Err: ", err.code);
      handleErrorsFirebase(err.code);
    });
    
    
  }

  const validateFields = () => {
    if( imageBase64 && textTitle && textDescription ){
      setButtonImageDisabled(false)
    } else {
      setButtonImageDisabled(true)
    }
  }

  return (
    <View style={styles.view}>
      <Text variant="displaySmall" style={styles.text}>Crear Publicacion</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTextTitle}
        value={textTitle}
        label={"Titulo"}
        ref={refTextTitle}
        textColor={ "black" }
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
      />
      <Button 
        style={styles.button}
        onPress={ async ()=>{
          const result = await launchImageLibrary({includeBase64: true});
          setImageBase64(( result.didCancel ) ? imageBase64 : result.assets[0].base64);
          validateFields();
        }}
        textColor={ "black" }
      >
        Subir Imagen
      </Button>
      <Button 
        style={styles.button}
        onPress={onPress}
        disabled={ buttonImageDisabled}
        textColor={ "black" }
      >
        Crear
      </Button>
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
        Publicacion guardada exitosamente
      </Snackbar>
    </View>
  );

}

export default CreatePublicationScreen;