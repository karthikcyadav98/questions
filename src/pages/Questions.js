import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Appbar, Card, Paragraph, Button, Divider } from 'react-native-paper';
import Loader from './Loader';
import axios from 'axios';

class Questions extends Component {
	state = {
		allQuestions: '',
		loader: false
	};

	componentDidMount() {
		this.setState({ loader: true });
		axios
			.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&site=stackoverflow')
			.then((res) => {
				console.log('jgad', res.data.items);
				this.setState({ allQuestions: res.data.items });
				this.setState({ loader: false });
			})
			.catch((err) => {
				console.log('ytjh', err);
			});
	}

	handleDetails = (value) => {
		console.log('view details', value);
		this.props.navigation.navigate('QuestionDet', { itemID: value });
	};

	render() {
		return (
			<ScrollView>
				<Appbar.Header>
					<Appbar.Content title="Questions" subtitle="30 questions" />
				</Appbar.Header>
				{this.state.loader ? (
					<Loader />
				) : (
					this.state.allQuestions != '' &&
					this.state.allQuestions.map((item, index) => {
						return (
							<View>
								<Card key={index}>
									{/* <Card.Cover source={{ uri: item.imageUrl }} /> */}
									<Card.Title title={`Question ${index + 1}`} />
									<Card.Content>
										<Paragraph style={{ fontWeight: 'bold', fontSize: 20 }}>{item.title}</Paragraph>
										<Paragraph style={{ fontSize: 15 }}>Tags: {item.tags}</Paragraph>
										<Paragraph style={{ fontWeight: 'bold' }}>
											Views: {item.view_count} Answers: {item.answer_count} Score: {item.score}
										</Paragraph>
										<Card.Actions>
											<Button onPress={() => this.handleDetails(item.question_id)}>
												View Details
											</Button>
										</Card.Actions>
									</Card.Content>
								</Card>
								<Divider />
							</View>
						);
					})
				)}
			</ScrollView>
		);
	}
}

export default Questions;
