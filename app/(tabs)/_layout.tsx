import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAdmin } from '@/components/AdminContext';

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { isAdminEnabled } = useAdmin() as { isAdminEnabled: boolean };

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Configure',
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? 'settings' : 'settings-outline'}
							color={color}
						/>
					),
				}}
			/>
			{isAdminEnabled ? (
				<Tabs.Screen
					name='admin'
					options={{
						title: 'Admin',
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? 'code-slash' : 'code-slash-outline'}
								color={color}
							/>
						),
					}}
				/>
			) : (
				<Tabs.Screen
					name='admin'
					options={{
						title: 'Admin',
						href: null,
						tabBarIcon: ({ color, focused }) => (
							<TabBarIcon
								name={focused ? 'code-slash' : 'code-slash-outline'}
								color={color}
							/>
						),
					}}
				/>
			)}
		</Tabs>
	);
}
