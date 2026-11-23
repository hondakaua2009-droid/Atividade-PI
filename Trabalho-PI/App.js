
import React, { useEffect, useState } from 'react';

import { View, ActivityIndicator, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import {
  NavigationContainer
} from '@react-navigation/native';

import {
  createNativeStackNavigator
} from '@react-navigation/native-stack';

import {
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs';

import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/services/firebase';

import { cores } from './src/theme/styles';

import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Home from './src/screens/Home';
import Tarefas from './src/screens/Tarefas';
import Calendario from './src/screens/Calendario';
import Perfil from './src/screens/Perfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const icones = {
  Home: 'home',
  Tarefas: 'checkbox',
  Calendario: 'calendar',
  Perfil: 'person'
};

function Abas() {
  const insets = useSafeAreaInsets();

  const espacoInferior =
    Platform.OS === 'web'
      ? 8
      : insets.bottom;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: cores.verde,
        tabBarInactiveTintColor: cores.textoSuave,

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2
        },

        tabBarItemStyle: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        },

        tabBarStyle: {
          backgroundColor: cores.branco,
          borderTopColor: cores.borda,
          borderTopWidth: 1,
          height: 62 + espacoInferior,
          paddingTop: 7,
          paddingBottom: Math.max(espacoInferior, 6),
          elevation: 8
        },

        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={
              focused
                ? icones[route.name]
                : `${icones[route.name]}-outline`
            }
            size={size}
            color={color}
          />
        )
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: 'Início' }}
      />

      <Tab.Screen
        name="Tarefas"
        component={Tarefas}
      />

      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{ title: 'Calendário' }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
      />
    </Tab.Navigator>
  );
}

function Navegacao() {
  const [user, setUser] = useState(null);
  const [authPronto, setAuthPronto] = useState(false);
  const [tempoSplash, setTempoSplash] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      setUser(usuario);
      setAuthPronto(true);
    });

    const timer = setTimeout(() => {
      setTempoSplash(true);
    }, 1500);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  if (!authPronto || !tempoSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="dark" />

      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {user ? (
            <Stack.Screen
              name="Abas"
              component={Abas}
            />
          ) : (
            <>
              <Stack.Screen
                name="Login"
                component={Login}
              />

              <Stack.Screen
                name="Register"
                component={Register}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Navegacao />
    </SafeAreaProvider>
  );
}
