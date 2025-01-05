import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Settings from './screens/Settings';
import { useFonts } from 'expo-font';
import Colors from './constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScreen from './screens/AddScreen';
import { ItemProvider } from './store/ItemContext';
import DetailScreen from './screens/DetailScreen';
import { useEffect } from 'react';
import { init } from './Databases';
import Toast from 'react-native-toast-message';
import { MenuProvider } from 'react-native-popup-menu';
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Tab Navigation
function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontFamily: 'mon-n',
          fontSize: 16,
          alignItems: 'center',
          paddingHorizontal: 3,
        },
        tabBarStyle: {
          backgroundColor: Colors.primary500,
          paddingVertical: 20,
          height: 60,
        },
        tabBarActiveTintColor: Colors.orange100,
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors.primary500,
        },
        headerTitleStyle: {
          color: Colors.orange100,
          fontFamily: 'mon-n',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerTitle: 'Bazar Lists',
          tabBarIcon: ({ size, color }) => <Ionicons name="home" size={size} color={color} />
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <SimpleLineIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

SplashScreen.preventAutoHideAsync();

// App Component
export default function App() {
  const [loaded] = useFonts({
    'mon-b': require('./assets/fonts/Montserrat-Bold.ttf'),
    'mon-n': require('./assets/fonts/Montserrat-Medium.ttf'),
    'mon-r': require('./assets/fonts/Montserrat-Regular.ttf'),
    'mon-sb': require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  useEffect(() => {
    async function func() {
      await init();
    }
    func();
  }, [])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MenuProvider>
        <ItemProvider>
          <StatusBar style="light" />
          <Stack.Navigator>
            {/* Show BottomNavigation first */}
            <Stack.Screen
              name="Main"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
            {/* Additional screens in the stack */}
            <Stack.Screen
              name="AddScreen"
              component={AddScreen}
              options={{
                title: 'Add Item',
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTitleStyle: {
                  color: Colors.orange100,
                  fontFamily: 'mon-sb'
                },
                headerTitleAlign: 'center',
              }}
            />
            <Stack.Screen
              name="DetailScreen"
              component={DetailScreen}
              options={{
                title: 'LIST OF ITEMS',
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTitleStyle: {
                  color: Colors.orange100,
                  fontFamily: 'mon-sb'
                },
                headerTitleAlign: 'center',
              }}
            />
          </Stack.Navigator>
          <Toast />
        </ItemProvider>
      </MenuProvider>
    </NavigationContainer>
  );
}
