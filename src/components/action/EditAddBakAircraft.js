import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

@observer
export default class EditAddBakAircraft extends Component{

    constructor(args){
        super(args);

        let years = [];
        for(let i=1965;i<new Date().getFullYear();i++) years.push(i);

        this.state = {
            callsign:"",
            built:1980,
            colors:"",
            aircraft:"",
            years:years,
            aircraftId:0,   
        }
    }

    handleClose = () => {
        this.setState(
        {
            callsign:"",
            built:1980,
            colors:"",
            aircraftId:null,
            aircraft:""    
        });
        this.props.appStore.openEditAddBakAircraftDialog = false;
    }

    handleSave = () => {
        if(this.state.callsign.length==0 || this.props.appStore.exists|| this.props.aircraftId==0) return;
        else
        {                    
            let req = {
                command:"INSERT_BAKAIRCRAFT",
                params:{
                    callsign:this.state.callsign,
                    built:this.state.built,
                    colors:this.state.colors,
                    aircraftId:this.state.aircraftId
                }
            }
            this.props.request(req);
        }     
    }

    handleChangeCallsign = (event) => {
        let text = event.target.value.toUpperCase();
        if(text.length==3 && this.state.callsign.length<3) text = text.substring(0,2) + "-" + text.substring(2);
        this.setState({callsign:text});
    }

    handleChangeBuilt = (event,index,value) => {
        this.setState({built:value});
    }

    handleChangeColors = (event) => {
        this.setState({colors:event.target.value});
    }

    handleChangeAircraft = (event,index,value) => {
        let a = this.props.appStore.aircrafts.filter(function(item) {
                return item.Id === value;
        })[0]; 
        this.setState({aircraft:a.Make+" "+a.Model+" ("+a.Variant+")"});
        this.setState({aircraftId:a.Id});
    }

    getAircraft = (id) => {
        if(this.props.appStore.aircrafts.length>0)
        {
            let a = this.props.appStore.aircrafts.filter(function(item){
                return item.Id===id;
            })[0];

            return a.Make + " " + a.Model + " (" + a.Variant + ")";
        }          
    }

    render(){

        const actions = [
            <FlatButton
                label="Close"
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

        return(
            <Dialog 
                contentStyle={{width:'50%',maxWidth: 'none',position:'absolute',top:'5%',height:'100%',left:'5%'}}               
                open={this.props.appStore.openEditAddBakAircraftDialog} 
                actions={actions}
                modal={true}
                title={
                        <div style={{lineHeight:'20%',fontSize:'16px',backgroundColor:'#da9129',color:'white'}}>
                            <div style={{backgroundColor:'#da9129',marginLeft:'10px'}}>{"ADD BAK AIRCRAFT"}</div>
                            <div onClick={this.handleClose} style={{float:'right',lineHeight:'3%',margin:'-12px'}}>
                                <CloseIcon style={{cursor:'pointer',lineHeight:'3%',fontSize:'12px',color:'white'}}/>
                            </div>
                        </div>
                    }
            >
                <div style={{marginTop:'10px'}}>
                    <div>                        
                        <div style={{display:'flex',marginBottom:'5px'}}>
                            <div style={{color:'white',width:'150px'}}>Callsign</div>
                            <div style={{color:'white',width:'150px'}}>Built</div>
                            <div style={{color:'white',width:'150px'}}>Colors</div>
                            <div style={{color:'white',width:'350px'}}>Aircraft</div>
                        </div>
                        <div>
                            {
                                this.props.appStore.bakAircrafts && this.props.appStore.bakAircrafts.map((bakAircraft,index)=>                                
                                    <div key={index} style={{display:'flex'}}>
                                        <div key={"callsign_"+bakAircraft.Id} style={{width:'150px'}}>{bakAircraft.Callsign}</div>
                                        <div key={"built_"+bakAircraft.Id} style={{width:'150px'}}>{bakAircraft.Built}</div>
                                        <div key={"colors_"+bakAircraft.Id} style={{width:'150px'}}>{bakAircraft.Colors}</div>
                                        <div key={"aircraftid_"+bakAircraft.Id} style={{width:'350px'}}>{this.getAircraft(bakAircraft.AircraftId)}</div>                               
                                    </div>
                                )
                            }
                        </div>                          
                    </div>
                    <div style={{display:'flex',marginTop:'10px'}}>
                        <div style={{width:'150px',marginRight:'10px'}}>
                            <TextField
                                        id="text-field-controlled1"
                                        value={this.state.callsign}
                                        onChange={this.handleChangeCallsign}
                                        style={{width:'100px'}}
                                        fullWidth={true}
                                        floatingLabelText={"Callsign"}
                                        floatingLabelFocusStyle={{color:'rgb(255,255,255,0.3'}}
                                        underlineFocusStyle={{borderColor:'#da9129'}}
                                        errorText={(this.state.callsign.length==0?"Cannot be empty":this.props.appStore.exists?"Callsign exists":"")}
                            />
                        </div>
                        <div style={{width:'150px',marginRight:'10px'}}>
                            <SelectField
                                floatingLabelText="Year built"
                                value={this.state.built}
                                onChange={this.handleChangeBuilt}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'100px'}}
                            >
                                {
                                    this.state.years.map((year,index)=>
                                        <MenuItem key={index} value={year} primaryText={year} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                        <div style={{width:'300px',marginRight:'10px'}}>
                            <TextField
                                        id="text-field-controlled3"
                                        value={this.state.colors}
                                        onChange={this.handleChangeColors}
                                        style={{width:'250px'}}
                                        floatingLabelText={"Colors"}
                                        fullWidth={true}
                                        floatingLabelFocusStyle={{color:'rgb(255,255,255,0.3'}}
                                        underlineFocusStyle={{borderColor:'#da9129'}}
                            />
                        </div>
                        <div style={{width:'300px',marginRight:'10px'}}>
                            <SelectField
                                floatingLabelText="Aircraft"
                                value={this.state.aircraftId}
                                onChange={this.handleChangeAircraft}
                                selectedMenuItemStyle={{color:'#da9129'}}
                                style={{width:'275px'}}
                                errorText={this.state.aircraft.length==0 && "Cannot be empty"}
                            >
                                {
                                    this.props.appStore.aircrafts && this.props.appStore.aircrafts.map((aircraft,index)=>                                
                                        <MenuItem key={index} value={aircraft.Id} primaryText={aircraft.Make+" "+aircraft.Model+" ("+aircraft.Variant+")"} />
                                    )
                                }                                 
                            </SelectField>
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }
}