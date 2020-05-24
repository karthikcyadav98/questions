import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import Questions from './src/pages/Questions';
import QuestionDet from './src/pages/QuestionDet';

const Stack = createStackNavigator();
NavBar = (props) => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{/* Get Questions*/}
				<Stack.Screen
					name="Questions"
					options={{
						title: 'Questions',
						headerShown: false
					}}
				>
					{(props) => <Questions {...props} />}
				</Stack.Screen>

				{/* Get QuestionDet*/}
				<Stack.Screen
					name="QuestionDet"
					options={{
						title: 'QuestionDet',
						headerShown: false
					}}
				>
					{(props) => <QuestionDet {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
export default NavBar;
