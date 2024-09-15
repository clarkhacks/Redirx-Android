import { type ButtonProps, Text, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = ButtonProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedButton({
	style,
	lightColor,
	darkColor,
	title,
	...otherProps
}: ThemedButtonProps) {
	const backgroundColor = useThemeColor(
		{ light: lightColor || '#f0f0f0', dark: darkColor || '#444' },
		'background'
	);
	const borderColor = useThemeColor({ light: '#ccc', dark: '#666' }, 'border');
	const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
	const shadowColor = useThemeColor({ light: '#aaa', dark: '#000' }, 'shadow');

	const buttonStyle = {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: borderColor,
		borderRadius: 8,
		backgroundColor: backgroundColor,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: shadowColor,
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 5, // Shadow on Android
	};

	const textStyle = {
		color: textColor,
		fontSize: 16,
		fontWeight: '600',
	};

	return (
		<TouchableOpacity style={[buttonStyle, style]} {...otherProps}>
			<Text style={textStyle}>{title}</Text>
		</TouchableOpacity>
	);
}
