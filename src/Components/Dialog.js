import React , { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Provider, TextInput } from 'react-native-paper';

export const DialogComponent = props => {

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog dismissable={props.dismissable} visible={props.visible} onDismiss={props.onDismiss}>
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Content>
              <TextInput
                value={props.textInputValue}
                onChangeText={text => props.onChangeText(text)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={props.done}>{props.titleDone}</Button>
              <Button onPress={props.cancel}>{props.titleCancel}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};