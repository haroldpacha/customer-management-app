import React, {useContext} from 'react';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import NewClient from '../screens/NewCustomerScreen';
import ClientDetail from '../screens/CustomerDetailScreen';

import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {userInfo, splashLoading} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.token ? (
            <>
                <Stack.Screen
                    name='HomeScreen'
                    component={HomeScreen}
                    options={{
                    title: 'Inicio'
                    }}
                />

                <Stack.Screen
                    name='NewClient'
                    component={NewClient}
                    options={{
                    title: 'Nuevo Cliente'
                    }}
                />
                <Stack.Screen
                    name='ClientDetail'
                    component={ClientDetail}
                    options={{
                    title: 'Detalle de Cliente'
                    }}
                />
            </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;