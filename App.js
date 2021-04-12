import React from 'react';
import Home from './components/Home';

import { StyleSheet, View } from 'react-native';

export default function App() {
	return (
		<View style={styles.container}>
			<Home />

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		alignItems: 'center',
		justifyContent: 'center',
	}
});