import { useState, useEffect } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useShareIntent } from 'expo-share-intent';
import Toast from 'react-native-toast-message';
import { useAdmin, AdminContextType } from '@/components/AdminContext';
import { useRouter } from 'expo-router';
import { Link } from 'expo-router';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedTextInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/ThemedButton';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function App() {
	const { hasShareIntent, shareIntent, resetShareIntent, error } =
		useShareIntent({
			debug: true,
			resetOnBackground: true,
		});
	const { isAdminEnabled, toggleAdminStatus } = useAdmin() as AdminContextType;
	const router = useRouter();

	const [workerUrl, setWorkerUrl] = useState('');
	const [apiKey, setApiKey] = useState('');
	const [enableAdmin, setEnableAdmin] = useState(false);
	const [adminUrl, setAdminUrl] = useState('');

	const showToast = (type: string, title: string, message: string) => {
		Toast.show({
			type,
			text1: title,
			text2: message,
			visibilityTime: 1750,
		});
	};

	useEffect(() => {
		if (shareIntent.webUrl) {
			router.replace('/explore');
		}
	}, [shareIntent, router]);

	useEffect(() => {
		const loadSettings = async () => {
			try {
				const savedUrl = await AsyncStorage.getItem('worker-url');
				const savedKey = await AsyncStorage.getItem('api-key');
				const savedAdmin = await AsyncStorage.getItem('enable-admin');
				const savedAdminUrl = await AsyncStorage.getItem('admin-url');

				if (savedUrl) setWorkerUrl(savedUrl);
				if (savedKey) setApiKey(savedKey);
				if (savedAdmin) setEnableAdmin(savedAdmin === 'true');
				if (savedAdminUrl) setAdminUrl(savedAdminUrl);
			} catch (e) {
				console.error('Failed to load settings.', e);
				showToast('error', 'Failed to load settings.', '');
			}
		};

		loadSettings();
	}, []);

	const saveSetting = async (
		key: string,
		value: string,
		successMessage: string
	) => {
		try {
			await AsyncStorage.setItem(key, value);
			console.log(`${key} saved successfully.`);
			showToast('success', successMessage, '');
		} catch (e) {
			console.error(`Failed to save ${key}.`, e);
			showToast('error', `Failed to save ${key}.`, '');
		}
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
			headerImage={
				<Image
					source={require('@/assets/images/partial-react-logo.png')}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='title'>Welcome to Redirx,</ThemedText>
				<ThemedText type='subtitle'>The open source URL shortener.</ThemedText>
				<ThemedText type='default'>
					If you need help setting Redirx up please visit the{' '}
					<Link
						href='https://github.com/clarkhacks/Redirx-Android'
						style={styles.link}
					>
						Github Repo
					</Link>
				</ThemedText>
			</ThemedView>

			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>
					Step 1: Enter your Cloudflare Worker URL
				</ThemedText>
				<View style={styles.inputButtonContainer}>
					<ThemedTextInput
						placeholder='Worker URL'
						lightColor='black'
						darkColor='white'
						style={styles.input}
						value={workerUrl}
						onChangeText={setWorkerUrl}
					/>
					<ThemedButton
						title='Save'
						lightColor='white'
						darkColor='black'
						onPress={() =>
							saveSetting(
								'worker-url',
								workerUrl,
								'Worker URL saved successfully.'
							)
						}
					/>
				</View>
			</ThemedView>

			{/* Step 2: Enter API Key */}
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>
					Step 2: Enter your API Key for Redirx
				</ThemedText>
				<View style={styles.inputButtonContainer}>
					<ThemedTextInput
						placeholder='API Key'
						lightColor='black'
						darkColor='white'
						secureTextEntry
						style={styles.input}
						value={apiKey}
						onChangeText={setApiKey}
					/>
					<ThemedButton
						title='Save'
						lightColor='white'
						darkColor='black'
						onPress={() =>
							saveSetting('api-key', apiKey, 'API Key saved successfully.')
						}
					/>
				</View>
			</ThemedView>

			{/* Step 3: Enable Admin Settings */}
			<ThemedView style={styles.stepContainer}>
				<ThemedText type='subtitle'>Step 3: Enable Admin Settings</ThemedText>
				<View style={styles.switchContainer}>
					<ThemedText>Enable Admin Settings</ThemedText>
					<ThemedButton
						title={isAdminEnabled ? 'Disable' : 'Enable'}
						lightColor='white'
						darkColor='black'
						onPress={() => toggleAdminStatus(!isAdminEnabled)}
					/>
				</View>
				{isAdminEnabled && (
					<View style={styles.inputButtonContainer}>
						<ThemedTextInput
							placeholder='Admin URL'
							lightColor='black'
							darkColor='white'
							style={styles.input}
							value={adminUrl}
							onChangeText={setAdminUrl}
						/>
						<ThemedButton
							title='Save'
							lightColor='white'
							darkColor='black'
							onPress={() =>
								saveSetting(
									'admin-url',
									adminUrl,
									'Admin settings saved successfully.'
								)
							}
						/>
					</View>
				)}
			</ThemedView>
		</ParallaxScrollView>
	);
}
const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 2,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	link: {
		textDecorationLine: 'underline',
		color: textColor,
	},
	reactLogo: {
		height: '100%',
		width: '100%',
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	inputButtonContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	input: {
		width: '80%',
		padding: 10,
	},
	switchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
});
