import React, { Component } from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';

class RankBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: ['Julie', 'Emma', 'John', 'Josh', 'Roman']
        };
        this.updateRanks = this.updateRanks.bind(this);
    }

    updateRanks() {
        //Should use this.props.game to get ranking from back end
        this.setState({ ranking: ['Julie', 'John', 'Josh', 'Roman', 'Emma']});
    }
    render() {
        return (
            <div>
                <List
                    size="large"
                    header={<div>{this.props.game}</div>}
                    bordered
                    dataSource={this.state.ranking}
                    renderItem={item => <List.Item>{item}</List.Item>}
                />
            </div>
        );
    }
}
export default RankBoard;
