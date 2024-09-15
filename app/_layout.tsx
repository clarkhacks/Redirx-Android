import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { ShareIntentProvider, useShareIntentContext } from 'expo-share-intent';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import Toast from 'react-native-toast-message';
import { AdminProvider } from '@/components/AdminContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const { hasShareIntent, shareIntent, resetShareIntent, error } =
		useShareIntentContext();
	const router = useRouter();
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	useEffect(() => {
		if (shareIntent.webUrl !== null && loaded) {
			// Ensure everything is loaded, then navigate to explore screen
			router.replace('/explore');
		}
	}, [shareIntent, loaded, router]);

	if (!loaded) {
		return null;
	}

	return (
		<ShareIntentProvider>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<AdminProvider>
					<Stack>
						<Stack.Screen
							name='(tabs)'
							options={{ headerShown: true, title: 'Home' }}
						/>
						<Stack.Screen name='+not-found' />
						<Stack.Screen
							name='explore'
							options={{ headerShown: true, title: 'Explore' }}
						/>
					</Stack>
					<Toast />
				</AdminProvider>
			</ThemeProvider>
		</ShareIntentProvider>
	);
}
