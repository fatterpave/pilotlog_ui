import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';

@observer
export default class EditAddLogEntry extends Component{

    constructor(args){
        super(args);
        this.state = {
            date:new Date(),
            callsign:"LN-BTS",
            depAirport:"ENBR",
            arrAirport:"ENBR",
            toTime:new Date(9999,12,31,(new Date().getHours()),0,0,0),
            landTime:new Date(9999,12,31,(new Date().getHours()+1),0,0,0),
            totalTime:60,
            flightType:"PRIV",
            picTime:60,
            coopTime:0,
            dualTime:0,
            ifrTime:0,
            nightTime:0,
            landings:1,
            comments:"",
            title:"ADD LOG ENTRY"
        }
    }

    handleSave = () => {

        if(this.state.totalTime<0 || this.isBeforeOrAfter || this.invalidTime) return;
        else
        {                    
            let cmd = this.props.edit?"UPDATE":"INSERT";
            let req = {
                command:cmd,
                log:{
                    Date:this.getDateAsString(),
                    DepartureAirport: this.state.depAirport,
                    ArrivalAirport: this.state.arrAirport,
                    TimeStart: this.getDateTimeAsString(this.state.toTime),
                    TimeEnd: this.getDateTimeAsString(this.state.landTime),
                    TimeTotal: this.state.totalTime,
                    Pic: this.state.picTime,
                    Coop: this.state.coopTime,
                    Dual: this.state.dualTime,
                    Ifr: this.state.ifrTime,
                    Night: this.state.nightTime,
                    Landings: this.state.landings,
                    Comments: this.state.comments,
                    BakAircraft: this.state.callsign,
                    Type: this.state.flightType
                }
            }
            if(this.props.edit) req.log.Id = this.props.appStore.logEntry.Id;
            //this.props.request(req);
            console.log(req);
            this.handleClose();
        }        
    }

    getDateAsString = () => {
        let d = this.state.date.getFullYear()+"-";
        let m = this.state.date.getMonth()+1;
        let day = this.state.date.getDate();
        m = m<10?("0"+m):m;
        day = day<10?("0"+day):day;
        d = d + m +"-"+day+" 00:00";
        return d;
    }

    getDateTimeAsString = (date) => {
        let d = "9999-12-31 "+date.getHours()+":"+date.getMinutes();
        return d;        
    }

    handleClose = () => {
        this.setState({
            date:new Date(),
            callsign:"LN-BTS",
            depAirport:"ENBR",
            arrAirport:"ENBR",
            toTime:new Date(9999,12,31,(new Date().getHours()),0,0,0),
            landTime:new Date(9999,12,31,(new Date().getHours()+1),0,0,0),
            totalTime:60,
            flightType:"PRIV",
            picTime:60,
            coopTime:0,
            dualTime:0,
            ifrTime:0,
            nightTime:0,
            landings:1,
            comments:"",
            title:"ADD LOG ENTRY"
        },function(){if(this.props.edit) this.props.appStore.logEntry.Id = null;});
        this.props.appStore.openEditAddLogEntryDialog = false;
    };

    handleChangeCallsign = (event,index,value) => {
        this.setState({callsign:value});
    }

    handleChangeDate = (event,date) => {
        this.setState({date:date})
    }

    handleChangeDepAirport = (event,index,value) => {
        this.setState({depAirport:value})
    }

    handleChangeArrAirport = (event,index,value) => {
        this.setState({arrAirport:value})
    }

    handleChangeToTime = (event,date) => {
        this.setState({toTime:date},function(){
            let diffMs = this.state.landTime.getTime() - this.state.toTime.getTime();
            var minutes = Math.floor((diffMs/1000)/60);
            this.setState({totalTime:minutes+10});
        });
        
    }

    handleChangeLandTime = (event,date) => {
        this.setState({landTime:date},function(){
            let diffMs = this.state.landTime.getTime() - this.state.toTime.getTime();
            var minutes = Math.floor((diffMs/1000)/60);
            this.setState({totalTime:minutes+10});
        });
        
    }

    handleChangeTotalTime = (event,index,value) => {
        this.setState({totalTime:value});
    }

    handleChangePicTime = (event,index,value) => {
        this.setState({picTime:value});
    }

    handleChangeCoopTime = (event,index,value) => {
        this.setState({coopTime:value});
    }

    handleChangeDualTime = (event,index,value) => {
        this.setState({dualTime:value});
    }

    handleChangeIfrTime = (event,index,value) => {
        this.setState({ifrTime:value});
    }

    handleChangeNightTime = (event,index,value) => {
        this.setState({nightTime:value});
    }

    handleChangeFlightType = (event,index,value) => {
        this.setState({flightType:value});
    }

    handleChangeLandings = (event,value) => {
        this.setState({landings:value});
    }

    handleChangeComments = (event) => {
        this.setState({comments:event.target.value});
    }

    getTimeList = () => {
        let list = [];
        for(let i=0;i<4;i++)
        {
            for(let j=0;j<60;j+=5)
            {
                list.push(i+":"+(j<10?("0"+j):j));
            }
        }
        return list;
    }

    getAsMinutes = (streng) => {
        let split = streng.split(":");
        let hrs = parseInt(split[0]) * 60;
        let min = parseInt(split[1]);
        return hrs + min;
    }

    componentWillReceiveProps = function(nextProps) {
        if(nextProps.edit)
        {
            this.setState({
                date:new Date(this.props.appStore.logEntry.Date),
                callsign:this.props.appStore.logEntry.BakAircraft,
                depAirport:this.props.appStore.logEntry.DepartureAirport,
                arrAirport:this.props.appStore.logEntry.ArrivalAirport,
                toTime:new Date(this.props.appStore.logEntry.TimeStart),
                landTime:new Date(this.props.appStore.logEntry.TimeEnd),
                totalTime:this.props.appStore.logEntry.TimeTotal,
                flightType:this.props.appStore.logEntry.Type,
                picTime:this.props.appStore.logEntry.Pic,
                coopTime:this.props.appStore.logEntry.Coop,
                dualTime:this.props.appStore.logEntry.Dual,
                ifrTime:this.props.appStore.logEntry.Ifr,
                nightTime:this.props.appStore.logEntry.Night,
                landings:this.props.appStore.logEntry.Landings,
                comments:this.props.appStore.logEntry.Comments,
                title:"EDIT LOG ENTRY"
            });
        }
    }

    render(){

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
                style={{color:'white',backgroundColor:'#da9129'}}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleSave}
                style={{float:'left',color:'white',backgroundColor:'#da9129'}}
            />,
        ];

        const sliderStyle = getMuiTheme({
            slider: {
                selectionColor: "#da9129",
                trackSize: 1
            }
        });

        const invalidTime = (this.state.picTime + this.state.coopTime + this.state.dualTime + this.state.ifrTime + this.state.nightTime) <= 0;
        const isBeforeOrAfter = this.state.landTime < this.state.toTime;
        const fieldStyle={padding:'10px',marginTop:'-24px',width:'125px'};

        return(
            <Dialog 
                contentStyle={{width:'80%',maxWidth: 'none',position:'absolute',top:'5%',height:'100%',left:'5%'}}               
                open={this.props.appStore.openEditAddLogEntryDialog} 
                actions={actions}
                modal={true}
                title={
                        <div style={{lineHeight:'20%',fontSize:'16px',backgroundColor:'#da9129',color:'white'}}>
                            <div style={{backgroundColor:'#da9129',marginLeft:'10px'}}>{this.state.title}</div>
                            <div onClick={this.handleClose} style={{float:'right',lineHeight:'3%',margin:'-12px'}}>
                                <CloseIcon style={{cursor:'pointer',lineHeight:'3%',fontSize:'12px',color:'white'}}/>
                            </div>
                        </div>
                    }
            >
                <div style={{padding:'20px'}}>
                    <div style={{display:'flex'}}>                                               
                        <div style={fieldStyle}>
                            <DatePicker 
                                container={'inline'} 
                                dialogContainerStyle={{backgroundColor:'rgb(48,48,48)'}} 
                                onChange={this.handleChangeDate} 
                                value={this.state.date}
                                hintText="Date"
                                floatingLabelText="Flight date"
                                textFieldStyle={{width:'125px'}}
                            />
                        </div>
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Callsign"
                                value={this.state.callsign}
                                onChange={this.handleChangeCallsign}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                            >
                                {
                                    this.props.appStore.bakAircrafts && this.props.appStore.bakAircrafts.map((aircraft,index)=>                                
                                        <MenuItem key={index} value={aircraft.Callsign} primaryText={aircraft.Callsign} />
                                    )
                                }                                 
                            </SelectField>
                        </div> 
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Departure airport"
                                value={this.state.depAirport}
                                onChange={this.handleChangeDepAirport}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                            >
                                {
                                    this.props.appStore.airports && this.props.appStore.airports.map((airport,index)=>                                
                                        <MenuItem key={index} value={airport.Icao} primaryText={airport.Icao} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <TimePicker
                                floatingLabelText="Takeoff time"
                                minutesStep={5}
                                format={'24hr'}
                                value={this.state.toTime}
                                textFieldStyle={{width:'125px'}}
                                onChange={this.handleChangeToTime}
                                errorText={isBeforeOrAfter && 'After landing'}
                                />
                        </div> 
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Arrival airport"
                                value={this.state.arrAirport}
                                onChange={this.handleChangeArrAirport}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                            >
                                {
                                    this.props.appStore.airports && this.props.appStore.airports.map((airport,index)=>                                
                                        <MenuItem key={index} value={airport.Icao} primaryText={airport.Icao} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <TimePicker
                                floatingLabelText="Landing time"
                                minutesStep={5}
                                format={'24hr'}
                                value={this.state.landTime}
                                textFieldStyle={{width:'125px'}}
                                onChange={this.handleChangeLandTime}
                                errorText={isBeforeOrAfter && 'Before T/O'}
                                />
                        </div> 
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Total time"
                                value={this.state.totalTime}
                                onChange={this.handleChangeTotalTime}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                                errorText={isBeforeOrAfter && 'Invalid'}
                            >
                                {
                                    this.getTimeList().map((item,index)=>                                
                                        <MenuItem key={index} value={this.getAsMinutes(item)} primaryText={item} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Flight type"
                                value={this.state.flightType}
                                onChange={this.handleChangeFlightType}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                            >
                                {
                                    this.props.appStore.flightTypes && this.props.appStore.flightTypes.map((type,index)=>                                
                                        <MenuItem key={index} value={type.Type} primaryText={type.Type} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                    </div>  
                    <div style={{display:'flex'}}>                                               
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="PIC"
                                value={this.state.picTime}
                                onChange={this.handleChangePicTime}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                                errorText={invalidTime && "Invalid"}
                            >
                                {
                                    this.getTimeList().map((item,index)=>                                
                                        <MenuItem key={index} value={this.getAsMinutes(item)} primaryText={item} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Coop"
                                value={this.state.coopTime}
                                onChange={this.handleChangeCoopTime}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                                errorText={invalidTime && "Invalid"}
                            >
                                {
                                    this.getTimeList().map((item,index)=>                                
                                        <MenuItem key={index} value={this.getAsMinutes(item)} primaryText={item} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Dual"
                                value={this.state.dualTime}
                                onChange={this.handleChangeDualTime}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                                errorText={invalidTime && "Invalid"}
                            >
                                {
                                    this.getTimeList().map((item,index)=>                                
                                        <MenuItem key={index} value={this.getAsMinutes(item)} primaryText={item} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Ifr"
                                value={this.state.ifrTime}
                                onChange={this.handleChangeIfrTime}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                                errorText={invalidTime && "Invalid"}
                            >
                                {
                                    this.getTimeList().map((item,index)=>                                
                                        <MenuItem key={index} value={this.getAsMinutes(item)} primaryText={item} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={fieldStyle}>
                            <SelectField
                                floatingLabelText="Night"
                                value={this.state.nightTime}
                                onChange={this.handleChangeNightTime}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'125px'}}
                                errorText={invalidTime && "Invalid"}
                            >
                                {
                                    this.getTimeList().map((item,index)=>                                
                                        <MenuItem key={index} value={this.getAsMinutes(item)} primaryText={item} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
                        <div style={{width:'49%',padding:'10px',marginTop:'20px'}}>
                            <MuiThemeProvider muiTheme={sliderStyle}>
                                <Slider
                                    min={0}
                                    max={30}
                                    step={1}
                                    value={this.state.landings}
                                    onChange={this.handleChangeLandings}
                                    style={{color:'#da9129',height:'5px'}}
                                />
                            </MuiThemeProvider>
                            <p>
                                <span style={{color:'rgba(255,255,255,0.3'}}>Landings: {this.state.landings}</span>
                            </p>
                        </div>
                        <div style={{width:'50%',marginLeft:'10px'}}>
                            <TextField
                                    id="text-field-controlled"
                                    value={this.state.comments}
                                    onChange={this.handleChangeComments}
                                    floatingLabelText={"Comments"}
                                    fullWidth={true}
                                    floatingLabelFocusStyle={{color:'rgb(255,255,255,0.3'}}
                                    underlineFocusStyle={{borderColor:'#da9129'}}
                            />
                        </div>
                    </div>
                </div>                
            </Dialog>
        )
    }

}