import { useEffect, useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as Clipboard from 'expo-clipboard';
import { createShortURL } from '@/components/createShort';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useShareIntentContext } from 'expo-share-intent';

export default function TabTwoScreen() {
	const [shortURL, setShortURL] = useState<string | null>(null);
	const { shareIntent } = useShareIntentContext();

	useEffect(() => {
		const handleShareIntent = async () => {
			if (shareIntent.webUrl && !shortURL) {
				try {
					const workerUrl = await AsyncStorage.getItem('worker-url');
					if (workerUrl) {
						const shortenedUrl = await createShortURL(
							shareIntent.webUrl,
							workerUrl
						);
						setShortURL(shortenedUrl);
						Clipboard.setStringAsync(shortenedUrl);
					}
				} catch (error) {
					Alert.alert('Error', 'Failed to create short URL');
				}
			}
		};

		handleShareIntent();
	}, [shareIntent.webUrl, shortURL]);

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<Ionicons size={310} name='code-slash' style={styles.headerImage} />
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type='title'>{shortURL}</ThemedText>
			</ThemedView>
			<ThemedText>Your short URL has been copied to the clipboard.</ThemedText>
		</ParallaxScrollView>
	);
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
});
