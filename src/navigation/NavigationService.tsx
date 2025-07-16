import * as React from 'react';
import {NavigationContainerRef, StackActions} from '@react-navigation/native';


export const navigationRef = React.createRef<NavigationContainerRef<any>>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function replace(name: string, params?: any) {
  let stackAction = StackActions.replace(name, params);
  navigationRef.current?.dispatch(stackAction);
}

function goBack() {
  navigationRef.current?.goBack();
}

function reset(name: string) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: name}],
  });
}

export default {
  navigate,
  goBack,
  replace,
  reset,
};
