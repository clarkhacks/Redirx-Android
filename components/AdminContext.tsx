import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdminContext = createContext({});

export type AdminContextType = {
	isAdminEnabled: boolean;
	toggleAdminStatus: (
		status: boolean | ((prevState: boolean) => boolean)
	) => void;
};

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAdminEnabled, setIsAdminEnabled] = useState(false);
	console.log('Admin mode enabled.');

	useEffect(() => {
		const fetchAdminStatus = async () => {
			const value = await AsyncStorage.getItem('enable-admin');
			if (value === 'enabled') {
				setIsAdminEnabled(true);
			} else {
				setIsAdminEnabled(false);
			}
		};

		fetchAdminStatus();
	}, []);

	const toggleAdminStatus = async (
		status: boolean | ((prevState: boolean) => boolean)
	) => {
		await AsyncStorage.setItem('enable-admin', status ? 'enabled' : 'disabled');
		setIsAdminEnabled(status);
	};

	return (
		<AdminContext.Provider value={{ isAdminEnabled, toggleAdminStatus }}>
			{children}
		</AdminContext.Provider>
	);
};

export const useAdmin = () => useContext(AdminContext);
