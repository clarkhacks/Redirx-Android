import AsyncStorage from '@react-native-async-storage/async-storage';

export const createShortURL = async (longURL: string, customDomain: string) => {
	try {
		const workerUrl = await AsyncStorage.getItem('worker-url');
		const apiKey = await AsyncStorage.getItem('api-key');
		console.log('Worker URL:', workerUrl);
		console.log('API Key:', apiKey);

		if (!workerUrl || !apiKey) {
			throw new Error('Worker URL or API Key not found in AsyncStorage.');
		}

		const response = await fetch(workerUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				url: longURL,
				api_key: apiKey,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to create short URL.');
		}

		const data = await response.json();
		console.log(JSON.stringify(data, null, 2));
		return customDomain + data.shortcode;
	} catch (error) {
		console.error('Error creating short URL:', error);
		throw error;
	}
};
