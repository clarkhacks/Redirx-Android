import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function TabTwoScreen() {
	const [adminUrl, setAdminUrl] = useState('');
	useEffect(() => {
		const loadAdminUrl = async () => {
			try {
				const savedAdminUrl = await AsyncStorage.getItem('admin-url');
				if (savedAdminUrl) {
					setAdminUrl(savedAdminUrl);
				}
			} catch (e) {
				console.error('Failed to load admin URL.', e);
			}
		};

		loadAdminUrl();
	}, []);
	return <WebView style={styles.container} source={{ uri: adminUrl }} />;
}

const styles = StyleSheet.create({
	headerImage: {
		color: '#808080',
		bottom: -90,
		left: -35,
		position: 'absolute',
	},
	titleContainer: {
		flexDirection: 'row',
		gap: 8,
	},
	container: {
		flex: 1,
	},
});
