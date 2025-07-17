import React, { useEffect } from 'react';
import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useAppDispatch, useAppSelector } from '../store';
import { getAuthState } from '../store/slice/auth.slice';
import { navigationRef } from './RootNaivgation';
import SignIn from '@app/screens/public/auth/SignIn';
import SignUp from '@app/screens/public/auth/SignUp';
import Splash from '@app/screens/public/auth/Splash';

const Stack = createStackNavigator<RootStackParamList>();

export default function StackNavigation() {
  const dispatch = useAppDispatch();
  const { token, loading } = useAppSelector(state => state.auth);

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white',
    },
  };

  const AuthScreens = {
    SignIn: SignIn,
    SignUp: SignUp,
  };

  const MainScreens = {
    // BottomTab: BottomTab,
  };

  useEffect(() => {
    dispatch(getAuthState({}));
  }, [dispatch]);

  if (loading) {
    return <Splash />;
  }

  // const Screens = token ? MainScreens : AuthScreens;
  const Screens = AuthScreens;
  console.log('USER_TOKEN==>', token);
  return (
    <NavigationContainer ref={navigationRef} theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {Object.entries(Screens).map(([name, component], index) => (
          <Stack.Screen
            key={index}
            name={name as keyof RootStackParamList} // Casting the name to RootStackParamList keys
            component={
              component as React.ComponentType<
                StackScreenProps<RootStackParamList>
              >
            }
            options={{ gestureEnabled: true }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
