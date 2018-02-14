import {observer} from 'mobx-react';
import React, { Component } from 'react';
import Filter from './action/Filter';
import Paper from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';
import Edit from './action/Edit';

@observer
export default class ActionComponent extends Component{
    
    constructor(args) {
        super(args);
        this.state = {
            tab: 'filter',
        };
    }

    handleChange = (value) => {
        this.setState({
            tab: value,
        });
    };

    render(){

    const paperStyle = {
        height: '100%',
        textAlign: 'center',
        display: 'inline-block',
    };

        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                tabItemContainerStyle={{backgroundColor:'#da9129'}}   
                inkBarStyle={{backgroundColor:'rgb(200,200,200)',height:'5px'}}             
            >
                <Tab buttonStyle={{color:'white'}} label="FILTER" value="filter">
                    <Paper style={this.paperStyle} zDepth={4}>
                        <div style={{paddingLeft:'25px'}}>
                            <Filter appStore={this.props.appStore} />
                        </div>
                    </Paper>
                </Tab>
                <Tab buttonStyle={{color:'white'}} label="EDIT" value="edit">
                    <div style={{height:'50%'}}>
                        <Paper style={this.paperStyle} zDepth={4}>
                            <Edit request={this.props.request} appStore={this.props.appStore} />
                        </Paper>
                    </div>
                </Tab>
            </Tabs>
        );
    }
}