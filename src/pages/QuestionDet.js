import React, { Component } from 'react';
import { ScrollView, View, Linking } from 'react-native';
import { Appbar, Card, Paragraph, Text } from 'react-native-paper';
import axios from 'axios';
import Loader from './Loader';
class QuestionDet extends Component {
	state = {
		loader: false,
		question: '',
		owner: ''
	};

	componentDidMount() {
		this.setState({ loader: true });
		axios
			.get(
				`https://api.stackexchange.com/2.2/questions/${this.props.route.params
					.itemID}?order=desc&sort=activity&site=stackoverflow`
			)
			.then(async (res) => {
				console.log('resrsrsrs', res.data.items);
				await this.setState({ question: res.data.items[0] });
				await this.setState({ owner: this.state.question.owner });
				this.setState({ loader: false });
			})
			.catch((err) => {
				console.log('err', err);
			});
	}

	handleBack = () => {
		this.props.navigation.navigate('Questions');
	};

	render() {
		return (
			<ScrollView>
				<Appbar.Header>
					<Appbar.BackAction onPress={this.handleBack} />
					<Appbar.Content
						title="Questions Details"
						subtitle={`Views: ${this.state.question.view_count} Answers: ${this.state.question
							.answer_count} Score: ${this.state.question.score}`}
					/>
				</Appbar.Header>
				{this.state.loader ? (
					<Loader />
				) : (
					<Card key={this.state.question.is_answered}>
						{/* <Card.Title title={`Question ${index + 1}`} /> */}
						{console.log('eorakjdf', this.state.owner.profile_image)}
						<Card.Cover source={{ uri: this.state.owner.profile_image }} />

						<Card.Content style={{ marginTop: 10 }}>
							<Paragraph style={{ fontWeight: 'bold', fontSize: 20 }}>
								{this.state.question.title}
							</Paragraph>
							<Paragraph style={{ fontSize: 15 }}>Tags: {this.state.question.tags}</Paragraph>
							<View style={{ textAlign: 'left', fontSize: 15 }}>
								<Paragraph style={{ fontWeight: 'bold' }}>
									By: {this.state.owner.display_name}
								</Paragraph>
								<Paragraph style={{ fontWeight: 'bold' }}>
									Reputation: {this.state.owner.reputation}
								</Paragraph>
								<Paragraph>View on StackOverflow:</Paragraph>
								<Text
									style={{ color: 'blue' }}
									onPress={() => Linking.openURL(this.state.question.link)}
								>
									{this.state.question.link}
								</Text>
							</View>
						</Card.Content>
					</Card>
				)}
			</ScrollView>
		);
	}
}

export default QuestionDet;
