import React, { Component } from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';
import './PossibleFriends.css';

class RankBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: ['Julie', 'Emma', 'John', 'Josh', 'Roman']
        };
        this.updateRanks = this.updateRanks.bind(this);
    }

    updateRanks() {
        //TODO: Should use this.props.game to get ranking from back end
        this.setState({ ranking: ['Julie', 'John', 'Josh', 'Roman', 'Emma']});
    }
    render() {
        const rankWithIdx = this.state.ranking.map((val, index) => ((index+1) + ". " + val));
        return (
            <div className='margins'>
                <List
                    size="large"
                    header={<div>{this.props.game}</div>}
                    bordered
                    dataSource={rankWithIdx}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </div>
        );
    }
}
export default RankBoard;