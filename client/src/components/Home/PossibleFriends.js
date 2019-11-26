import React, { Component } from "react";
import { Form, Button, Checkbox, Row, List } from 'antd';
import 'antd/dist/antd.css';
import './PossibleFriends.css';
class PossibleFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
            possibleFriends: ['John', 'Ailce', 'Kevin', 'Lucy', 'Ted', 'Amy']
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateFriendList = this.updateFriendList.bind(this);
    }

    updateFriendList() {
        //get new list of friends here
        this.setState({ possibleFriends: ['John', 'Ailce', 'Kevin', 'Lucy', 'Ted', 'Amy'] });
    }

    handleSubmit(e) {
        console.log('handleSubmit in PossibleFriends');
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Possible Friends values: ', values);
                //values.checkbox-group is an array of names of added friends
                //values['checkbox-group']
                console.log(values['checkbox-group']);
                this.updateFriendList();
            }
        });
    }

    render() {
        console.log('this.state.possibleFriends: ', this.state.possibleFriends);
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='margins'>
                <Form onSubmit={this.handleSubmit} className='pf'>
                    <Form.Item className='pf'>
                        {getFieldDecorator('checkbox-group')(
                            <Checkbox.Group className='pf'>
                                <List
                                    size="large"
                                    header={<div>Add Friends!</div>}
                                    bordered
                                    dataSource={this.state.possibleFriends}
                                    renderItem={
                                        item =>
                                            <List.Item>
                                                <Checkbox value={item}>
                                                    {item}
                                                </Checkbox>
                                            </List.Item>
                                    }
                                >
                                </List>
                            </Checkbox.Group>,
                        )}
                    </Form.Item>
                    <Form.Item className='pf-button'>
                        <Button type="primary" htmlType="submit" className='recommendation-button'>
                            Add
                    </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
export default Form.create({ name: 'PossibleFriends' })(PossibleFriends);
