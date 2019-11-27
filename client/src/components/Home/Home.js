import React, { Component } from "react";
import PossibleFriends from './PossibleFriends';
import RankBoard from './RankBoard';
import 'antd/dist/antd.css';
import './Home.css';
class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const username = this.props.username;
        console.log(username);
        return (
            <div className='home'>
                <div className='column'>
                    <RankBoard game='Overwatch'/>
                </div>
                <div className='column'>
                    <PossibleFriends key={username} username={username} />
                </div>
                <div className='column'>
                    <RankBoard game='PUBG'/>
                </div>
            </div>
        );
    }
}
export default Home;
