import {observer} from 'mobx-react';
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import EditAddLogEntry from './EditAddLogEntry';
import EditAddAircraft from './EditAddAircraft';
import EditAddBakAircraft from './EditAddBakAircraft';

@observer
export default class Edit extends Component{

    constructor(args){
        super(args);

        this.state = {
            selectedAircraft: null,
            departureAirport: null,
            arrivalAirport: null,

        };
    }

    handleAddLogEntry = () => {
        this.props.appStore.openEditAddLogEntryDialog = true;
    }

    handleAddAircraft = () => {
        this.props.appStore.openEditAddAircraftDialog = true;
    }

    handleAddBakAircraft = () => {
        this.props.appStore.openEditAddBakAircraftDialog = true;
    }    

    render(){
        return(
            <div style={{padding:'10px'}}>
                <div style={{textAlign:'center',marginTop:'25px'}}>
                    <RaisedButton 
                        onTouchTap={this.handleAddLogEntry} 
                        overlayStyle={{backgroundColor:'#da9129'}} 
                        buttonStyle={{width:'250px',color:'white'}} label={"ADD LOG ENTRY"} 
                    />
                </div>
                <div style={{textAlign:'center',marginTop:'25px'}}>
                    <RaisedButton 
                        onTouchTap={this.handleAddAircraft} 
                        overlayStyle={{backgroundColor:'#da9129'}} 
                        buttonStyle={{width:'250px',color:'white'}} label={"ADD AIRCRAFT"} 
                    />
                </div>
                <div style={{textAlign:'center',marginTop:'25px',marginBottom:'25px'}}>
                    <RaisedButton 
                        onTouchTap={this.handleAddBakAircraft} 
                        overlayStyle={{backgroundColor:'#da9129'}} 
                        buttonStyle={{width:'250px',color:'white'}} label={"ADD BAK AIRCRAFT"} 
                    />
                </div>
                <EditAddLogEntry edit={this.props.appStore.logEntry.Id!=null} request={this.props.request} appStore={this.props.appStore}/>
                <EditAddAircraft request={this.props.request} appStore={this.props.appStore}/>
                <EditAddBakAircraft request={this.props.request} appStore={this.props.appStore}/>
            </div>            
        )
    }
}