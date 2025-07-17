import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/protected/home';
import {Colors, Icons} from '../themes';
import {normalize} from '../utils/orientation';
import {Image, Platform, Pressable, View} from 'react-native';
import Appointments from '../screens/protected/Appointments';
import Profile from '../screens/protected/Profile';
import MyPlans from '../screens/protected/MyPlans';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navHeight = useSafeAreaInsets().bottom;
  const bottomHeight =
    Platform.OS === 'android'
      ? navHeight + normalize(10)
      : navHeight - normalize(10);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: props => <Pressable {...props} />,
        tabBarIcon: ({focused}) => {
          let iconSource;
          let bgColor = focused ? '#fff' : undefined;

          switch (route.name) {
            case 'Home':
              iconSource = focused ? Icons.house : Icons.houseWhite;
              break;
            case 'Appointments':
              iconSource = focused ? Icons.calendar : Icons.calendarWhite;
              break;
            case 'MyPlans':
              iconSource = focused ? Icons.clipboard : Icons.clipboardWhite;
              break;
            case 'Profile':
              iconSource = focused ? Icons.profile : Icons.profileWhite;
              break;

            default:
              iconSource = Icons.house;
          }

          return (
            <View
              style={{
                backgroundColor: bgColor,
                padding: normalize(15),
                borderRadius: normalize(50),
              }}>
              <Image
                source={iconSource}
                style={{
                  width: normalize(22),
                  height: normalize(22),
                  resizeMode: 'contain',
                }}
              />
            </View>
          );
        },
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Colors.textColor,
          // bottom: normalize(15),
          bottom: bottomHeight,
          marginHorizontal: normalize(15),
          borderRadius: normalize(50),
          paddingTop: normalize(18),
          height: Platform.OS === 'android' ? normalize(70) : normalize(65),
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Appointments" component={Appointments} />
      <Tab.Screen name="MyPlans" component={MyPlans} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTab;
