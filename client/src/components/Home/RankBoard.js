import React, { Component } from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';
import './PossibleFriends.css';

class RankBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: []
        };
    }

    componentDidMount() {
        // send to back-end: 
        // {
        //     game: this.props.game
        // }
        // get from back-end:
        // {
        //     ranking: (a list of strings)
        // }
        // this.setState({ranking: back-end ranking});
        this.setState({ ranking: ['Julie', 'John', 'Josh', 'Roman', 'Emma']});
    }

    render() {
        const rankWithIdx = this.state.ranking.map((val, index) => ((index+1) + ". " + val));
        return (
            <div className='margins'>
                <List
                    size="large"
                    header={<div>{this.props.game}-Top Players</div>}
                    bordered
                    dataSource={rankWithIdx}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </div>
        );
    }
}
export default RankBoard;
