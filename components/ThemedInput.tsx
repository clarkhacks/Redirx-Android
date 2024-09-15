import { TextInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedTextInput({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedTextInputProps) {
	const textColor = useThemeColor(
		{ light: lightColor, dark: darkColor },
		'text'
	);
	const backgroundColor = useThemeColor(
		{ light: '#f9f9f9', dark: '#333' },
		'background'
	);
	const borderColor = useThemeColor({ light: '#ccc', dark: '#444' }, 'text');
	const placeholderColor = useThemeColor(
		{ light: '#999', dark: '#666' },
		'text'
	);

	const inputStyle = {
		color: textColor,
		backgroundColor: backgroundColor,
		borderColor: borderColor,
		padding: 10,
		borderWidth: 1,
		borderRadius: 8,
		shadowColor: borderColor,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 3, // For Android shadow
	};

	return (
		<TextInput
			style={[inputStyle, style]}
			placeholderTextColor={placeholderColor}
			{...otherProps}
		/>
	);
}
