import React, { Component } from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';
import './PossibleFriends.css';
import axios from 'axios';
const home_url = "http://Ec2-3-135-223-12.us-east-2.compute.amazonaws.com:3000/";
class RankBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: [],
            score:[]
        };
    }

    componentDidMount() {
        // send to back-end: 
        // {
        //     game: this.props.game
        // }
        //overwatch = 0
        //pubg = 1
        var temp;
        if(this.props.game == "Overwatch"){
            temp = 0
        }
        else{
            temp = 1
        }
        const send = {
            game: temp
        }
        console.log("top rank send data: ", send);
        axios.post(home_url + "api/toprank", send)
        .then(res=>{
            console.log("response data", res.data)
            // this.setState({ranking: res.data.ranking});
            this.setState({ ranking: res.data.ranking});
            this.setState({ score: res.data.score});
        })
        // get from back-end:
        // {
        //     ranking: (a list of strings)
        // }
        // this.setState({ranking: back-end ranking});
        // this.setState({ ranking: ['Julj', 'John', 'Josh', 'Roman', 'Emma']});
        // this.setState({ score: ['Julie', 'John', 'Josh', 'Roman', 'Emma']});
    }

    render() {
        var rankWithIdx = this.state.ranking.map((val, index) => ((index+1) + ". " + val));
        for (let i in rankWithIdx){
            rankWithIdx[i] = rankWithIdx[i]+ " " + this.state.score[i]
        }
        return (
            <div className='margins'>
                <List
                    size="large"
                    header={<div className="lgrey">{this.props.game}-Top Players</div>}
                    bordered
                    dataSource={rankWithIdx}
                    renderItem={item => <List.Item className="lgrey">{item}</List.Item>}
                />
            </div>
        );
    }
}
export default RankBoard;
