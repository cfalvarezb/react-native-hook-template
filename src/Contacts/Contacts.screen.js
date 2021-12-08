import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  BackHandler, 
  Alert
} from 'react-native';
import { CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Contacts.Style';
import {getContactsRequest} from './Contacts.Action';
import colors from '../Themes/Colors';
import {barStyle} from '../const';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const ContactsScreen = ({ route, navigation }) => { 

    const { search } = route.params;
    const contacts = useSelector(state => state.getContacts);
    const dispatch = useDispatch();
    const getContacts = () => dispatch(getContactsRequest(search));

    useEffect(() => {
      const backAction = () => {
        Alert.alert("Atencion!", "Seguro que quiere ir atras?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'DropDownScreen' },
                ],
              })
            ) 
          }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      console.log("useEffect");
      getContacts();
  
      return () => backHandler.remove();
    }, []);

    const renderToolbar = () => {
        return (
          <View style={styles.toolbar}>
            <StatusBar
              hidden={false}
              backgroundColor={colors.primary}
              barStyle={barStyle.lightContent}
            />
            <TouchableOpacity
              style={styles.viewWrapIcLeft}
              onPress={navigation.openDrawer}>
              <MaterialCommunityIcons
                name={'menu'}
                size={30}
                color={colors.white}
              />
            </TouchableOpacity>
            <View style={styles.viewWrapTitleToolbar}>
              <Text style={styles.titleToolbar}>Contacts</Text>
            </View>
            <View style={styles.viewWrapIcRight} />
          </View>
        );
    };

    const renderListContacts = () => {

        const renderItem = ({item}) => {
            return (
              <TouchableOpacity>
                <View style={styles.row}>
                  <Image source={{ uri: item.image }} style={styles.pic} />
                  <View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                      <Text style={styles.mblTxt}>Mobile</Text>
                    </View>
                    <View style={styles.msgContainer}>
                      <Text style={styles.msgTxt}>{item.status}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }
        if ( contacts.data ) {
          return(
              
                <View style={{ flex: 1 }} >
                    <FlatList
                    extraData={contacts.data}
                    data={contacts.data}
                    keyExtractor = {(item) => {
                        return item.id;
                    }}
                    renderItem={renderItem}
                    />
                </View>
          );  
        } else {
          return null;
        }
    };

    const renderLoading = () => {
        if (contacts.fetching) {
          return (
            <View style={styles.viewLoading}>
              <ActivityIndicator />
            </View>
          );
        } else {
          return null;
        }
    };
    
    return(
        <View style={styles.mainContainer}>
            {renderToolbar()}
            {renderListContacts()}
            {renderLoading()}
        </View>
    )

}

export default ContactsScreen;