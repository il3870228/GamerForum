import React, { Component } from "react";
import Forum from "../Forum/Forum";
import Recommendations from "../Forum/Recommendations/Recommendations";
import 'antd/dist/antd.css';
import './GamePage.css'
class GamePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const game = this.props.game;
        const username = this.props.username;
        console.log(username);
        return (
            <div>
                <div className='rec'>
                    <Recommendations game={game} username={username}/>
                </div>
                <div className='forum'>
                    <Forum username={username} />
                </div>
            </div>
        );
    }
}
export default GamePage;
