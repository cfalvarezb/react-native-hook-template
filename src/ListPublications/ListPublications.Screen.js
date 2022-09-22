import React, { useState, useEffect, useRef } from 'react';
import { View, Image } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import styles from './ListPublications.Style';
import { errorsFirebase } from '../const';
import { List, Text, Divider } from 'react-native-paper';


const ListPublicationsScreen = () => {

  // Set an initializing state whilst Firebase connects
  const [sections, setSections] = useState(null);

  useEffect(() => {
    database()
      .ref(`publications`)
        .on('value', snapshot => {

          let list = [];

          snapshot.forEach((childSnapshot)=>{
            list.push(childSnapshot)
            console.log(list)
          })

          setSections(list) 
    });

  }, []);

  return (
    <View style={styles.container}>
      <Divider/>
      <Text variant="displaySmall" style={styles.text}>Lista De Publicaciones</Text>
      <Divider/>
      {
        sections != null && sections.map((childSnapshot, index) => {
          return (
            <List.Item
              title={childSnapshot.val().title}
              description={childSnapshot.val().description}
              left={props => <Image style={styles.tinyLogo} source={{uri: "data:image/png;base64," + childSnapshot.val().imageBase64}} />}
              titleNumberOfLines={1}
              titleStyle={styles.titleStyle}
              descriptionStyle={styles.descriptionStyle}
              key={index + childSnapshot.val().getUniqueId}
            />
          )
        })
      }
      
    </View>
  );

}

export default ListPublicationsScreen;