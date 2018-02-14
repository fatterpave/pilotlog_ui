import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

@observer
export default class Filter extends Component{

    constructor(args){
        super(args);
        this.state = {
            BakAircraft: null,
            DepartureAirport: null,
            ArrivalAirport: null,
            fromDate: null,
            toDate: null,
            Type:null
        };
    }

    handleFilter = () => {
        let self = this;
        this.props.appStore.logEntries = this.props.appStore.allLogEntries;
        ["BakAircraft", "DepartureAirport", "ArrivalAirport","fromDate","toDate","Type"].forEach(function(filterBy) {
            let filterValue = self.state[filterBy];
            if (filterValue) {
                if(filterBy==="toDate" || filterBy==="fromDate")
                {
                    let filterDate = new Date(filterValue);
                    self.props.appStore.logEntries = self.props.appStore.logEntries.filter(function(item) {
                        let logDate = new Date(item.Date);
                        return filterBy==="fromDate"?(logDate>filterDate):(logDate<=filterDate);
                    });
                }
                else
                {
                    self.props.appStore.logEntries = self.props.appStore.logEntries.filter(function(item) {
                        return item[filterBy] === filterValue;
                    });               
                }
            }
        });
    }

    handleChangeAircraft = (event, index, value) => {        
        this.setState({BakAircraft:value},function(){this.handleFilter();});
    } 

    handleChangeDepartureAirport = (event, index, value) => {        
        this.setState({DepartureAirport:value},function(){this.handleFilter();});
    }

    handleChangeArrivalAirport = (event, index, value) => {
        this.setState({ArrivalAirport:value},function(){this.handleFilter();});
    }
    
    handleFromDateChange = (event, date) => {
        this.setState({fromDate:date},function(){this.handleFilter();});
    }
    
    handleToDateChange = (event, date) => {
        this.setState({toDate:date},function(){this.handleFilter();});
    }

    handleChangeType = (event,index,value) => {
        this.setState({Type:value},function(){this.handleFilter();})
    }

    handleClearFilter = () => {
        this.setState(
            {
                BakAircraft: null,
                DepartureAirport: null,
                ArrivalAirport: null,
                fromDate: null,
                toDate: null,
                Type:null,
            },function(){
                this.props.appStore.logEntries = this.props.appStore.allLogEntries;
            }
        )       
    }

    @computed
    get earliestDate(){
        if(this.props.appStore.logEntries.length>0) this.setState({fromDate:new Date(this.props.appStore.logEntries[0].Date)});
    }

    render(){
        return(
            <div style={{padding:'10px'}}>
                <div>
                    <SelectField
                        floatingLabelText="Aircraft"
                        value={this.state.BakAircraft}
                        onChange={this.handleChangeAircraft}
                        selectedMenuItemStyle={{color:'#da9129'}}
                    >
                        <MenuItem value={null} primaryText="" />
                        {
                            this.props.appStore.bakAircrafts && this.props.appStore.bakAircrafts.map((aircraft,index)=>
                                <MenuItem key={index} value={aircraft.Callsign} primaryText={aircraft.Callsign} />
                            )
                        }                                 
                    </SelectField>
                    <SelectField
                        floatingLabelText="Departure airport"
                        value={this.state.DepartureAirport}
                        onChange={this.handleChangeDepartureAirport}
                        selectedMenuItemStyle={{color:'#da9129'}}
                    >
                        <MenuItem value={null} primaryText="" />
                        {
                            this.props.appStore.airports && this.props.appStore.airports.map((airport,index)=>
                                <MenuItem key={index} value={airport.Icao} primaryText={airport.Name + " (" + airport.Icao + ")"} />
                            )
                        }                                 
                    </SelectField>
                    <SelectField
                        floatingLabelText="Arrival airport"
                        value={this.state.ArrivalAirport}
                        onChange={this.handleChangeArrivalAirport}
                        selectedMenuItemStyle={{color:'#da9129'}}
                    >
                        <MenuItem value={null} primaryText="" />
                        {
                            this.props.appStore.airports && this.props.appStore.airports.map((airport,index)=>
                                <MenuItem key={index} value={airport.Icao} primaryText={airport.Name + " (" + airport.Icao + ")"} />
                            )
                        }                                 
                    </SelectField>
                    <SelectField
                        floatingLabelText="Fight type"
                        value={this.state.Type}
                        onChange={this.handleChangeType}
                        selectedMenuItemStyle={{color:'#da9129'}}
                    >
                        <MenuItem value={null} primaryText="" />
                        {
                            this.props.appStore.flightTypes && this.props.appStore.flightTypes.map((type,index)=>                                
                                <MenuItem key={index} value={type.Type} primaryText={type.Type} />
                            )
                        }                                 
                    </SelectField>
                </div>
                <div style={{marginTop:'20px'}}>
                    <DatePicker 
                        container={'inline'} 
                        dialogContainerStyle={{backgroundColor:'rgb(48,48,48)'}} 
                        onChange={this.handleFromDateChange} 
                        value={this.state.fromDate}
                        hintText="From date" 
                        onShow={this.handleDatePickerOnShow}
                        defaultDate={this.earliestDate}
                    />
                    <DatePicker 
                        container={'inline'} 
                        dialogContainerStyle={{backgroundColor:'rgb(48,48,48)'}} 
                        onChange={this.handleToDateChange} 
                        defaultDate={new Date()}
                        hintText="To date" />
                </div>
                <div style={{textAlign:'center',marginTop:'30px',marginBottom:'25px'}}>
                    <RaisedButton onTouchTap={this.handleClearFilter} overlayStyle={{backgroundColor:'#da9129'}} buttonStyle={{color:'white'}} label={"CLEAR"} />
                </div>
            </div>
        )
    }
}