import React, { useState } from 'react';
import {
    View,
    Alert
  } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Button from '../Button/Button';
import {useNavigation} from '@react-navigation/native';

const DropDownScreen = () => {

    let topic = null; 
    let neighborhood= null;
    let department= null;

    const states = ["Bogota", "Medellin", "Cordoba"];
    const neighborhoods = ["Bosa", "Laureles", "Poblado", "Belen"];
    const topics = ["Drogas", "Prepagos", "Armas"];

    const navigation = useNavigation();

    const goContactsScreen = () => {
        if ( topic && neighborhood && department ) {
            navigation.navigate('ContactsScreen', { search: { topic, neighborhood, department }});
        } else {
            Alert.alert("Error!", "Debe llenar todos lo campos", [
                { text: "OK", onPress: () => null }
              ]);
        }
    };

    const renderDropDown = (list, defaultButtonText, onSelect) => {
        return(
            <View>
                <SelectDropdown
                    defaultButtonText={defaultButtonText}
                    data={list}
                    onSelect={onSelect}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        // text represented after item is selected
                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        // text represented for each item in dropdown
                        // if data array is an array of objects then return item.property to represent item in dropdown
                        return item
                    }}
                />
            </View>
        )
    }

    const renderButton = () => {
        return(
            <Button
                text="Click"
                buttonCustomStyles={{
                    backgroundColor: "#505050",
                    borderRadius: 15,
                    marginTop: 10
                }}
                textCustomStyles={{
                    color: "#FFF"
                }}
                onClick={() => { 
                    goContactsScreen();
                }}
            />
        )
    }

            
    onSelectState = (selectedItem, index) => {
        department = {
            selectedItem,
            index
        };
        console.log(selectedItem, index)
    }

    onSelectNeighborhood = (selectedItem, index) => {
        neighborhood = {
            selectedItem,
            index
        };
        console.log(selectedItem, index);
    }

    onSelectTopic = (selectedItem, index) => {
        topic = {
            selectedItem,
            index
        };
        console.log(selectedItem, index)
    }

    return(
        <View>
            {renderDropDown(states, "Seleccione un departamento", onSelectState)}
            {renderDropDown(neighborhoods, "Seleccione un sector", onSelectNeighborhood)}
            {renderDropDown(topics, "Seleccione un item de busqueda", onSelectTopic)}
            {renderButton()}
        </View>
    )

}

export default DropDownScreen;
