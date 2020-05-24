import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

class Loading extends Component {
	render() {
		return <ActivityIndicator size="large" color="#3498db" style={{ marginTop: 300 }} />;
	}
}

export default Loading;
