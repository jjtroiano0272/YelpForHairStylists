import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from '../firebaseConfig';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

// function AuthorizedStack() {
//   return (
//     <Stack>
//       <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
//       <Stack.Screen name='modal' options={{ presentation: 'card' }} />
//     </Stack>
//   );
// }

// function UnauthorizedStack() {
//   return (
//     <Stack>
//       <Stack.Screen name='register' />
//     </Stack>
//   );
// }

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerRight: () => (
              // <MaterialCommunityIcons
              //   name='airballoon'
              //   size={24}
              //   color='white'
              // />
              <AntDesign name='infocirlceo' size={24} color='white' />
            ),
          }}
        >
          {/* This displays whatever files are in the (tabs) dir as tabs itself */}
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='modal' options={{ presentation: 'card' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
