import { Alert } from 'react-native';

export function showError(error: unknown) {
    if (error instanceof Error) {
        Alert.alert('Error', error.message);
    } else {
        Alert.alert('Error', 'An unknown error occurred.');
    }
}