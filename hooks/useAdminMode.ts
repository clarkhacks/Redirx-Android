import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // New

export const useAdminMode = () => {
	const [isAdminEnabled, setIsAdminEnabled] = useState(false);
	useEffect(() => {
		const fetchAdminStatus = async () => {
			const value = await AsyncStorage.getItem('enable-admin');
			if (value === 'enabled') {
				setIsAdminEnabled(true);
				console.log('Admin mode enabled.');
			}
		};

		fetchAdminStatus();
	}, []);

	return isAdminEnabled;
};
