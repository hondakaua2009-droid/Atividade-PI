import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

const icones = { Home: 'home', Tarefas: 'checkbox', Calendario: 'calendar', Perfil: 'person' };

function Abas() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: cores.verde,
        tabBarInactiveTintColor: cores.textoSuave,
        tabBarStyle: { backgroundColor: cores.branco, borderTopColor: cores.borda },
        tabBarIcon: ({ color, size }) => <Ionicons name={icones[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: 'Início' }} />
      <Tab.Screen name="Tarefas" component={Tarefas} />
      <Tab.Screen name="Calendario" component={Calendario} options={{ title: 'Calendário' }} />
      <Tab.Screen name="Perfil" component={Perfil} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authPronto, setAuthPronto] = useState(false);
  const [tempoSplash, setTempoSplash] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthPronto(true); });
    const t = setTimeout(() => setTempoSplash(true), 1500);
    return () => { unsub(); clearTimeout(t); };
  }, []);

  if (!authPronto || !tempoSplash) return <SplashScreen />;

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <Stack.Screen name="Abas" component={Abas} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
