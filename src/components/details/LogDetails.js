import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Map from './Map';
import FlatButton from 'material-ui/FlatButton';
import Moment from 'react-moment';
import RaisedButton from 'material-ui/RaisedButton';

@observer
export default class LogDetails extends Component{

    constructor(args){
        super(args);

        this.state = {
            confirmDeleteDialog:false
        }
    }

    handleClose = () => {
        this.setState({confirmDeleteDialog:false});
        this.props.appStore.openDetailsDialog = false;    
        this.props.appStore.logEntry.Id = null;    
    };

    handleCloseConfirmDeleteDialog = () => {
        this.setState({confirmDeleteDialog:false});
    }

    handleOpenConfirmDeleteDialog = () => {
        this.setState({confirmDeleteDialog:true});
    }

    handleDelete = () => {
        let req = {
            command:"DELETE",
            params:{
                id:this.props.appStore.logEntry.Id
            }
        }
        this.props.request(req);
        this.handleClose();
    };

    handleEditLogEntry = () => {
        this.props.appStore.openDetailsDialog = false;    
        this.props.appStore.openEditAddLogEntryDialog = true;
    };

    getTimeFromMinutes = (minutes) => {
        if(minutes==0 || !minutes) return "00:00";
        let hrs = Math.floor(minutes/60);
        let min = minutes % 60;
        let sMin = "";
        if(min<10) sMin = "0"+min;
        else sMin = min;

        return hrs+":"+sMin;
    };

    getAirportName = (icao) => {
        if(icao)
        {
            let airport = this.props.appStore.airports.filter(function(ap) {            
                return ap.Icao===icao;
            });
            return airport[0].Name;
        }
    };

    @computed
    get getAircraft(){
        if(this.props.appStore.logEntry.BakAircraft)
        {
            let callsign = this.props.appStore.logEntry.BakAircraft;
            let self = this;
            let aircraft;
            self.props.appStore.bakAircrafts.filter(function(b) {            
                if(b.Callsign===callsign)
                {
                    aircraft =  self.props.appStore.aircrafts.filter(function(a){
                        return a.Id==b.AircraftId;
                    });
                }
            });
            return aircraft[0];
        }
    };

    render(){
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
                style={{color:'white',backgroundColor:'#da9129'}}
            />,
        ];

        return(
            <Dialog 
                actions={actions}
                contentStyle={{width:'90%',maxWidth: 'none',position:'absolute',top:'2%',height:'100%',left:'5%'}}               
                open={this.props.appStore.openDetailsDialog} 
                modal={true}
                title={
                        <div style={{lineHeight:'20%',fontSize:'16px',backgroundColor:'#da9129',color:'white'}}>
                            <div style={{backgroundColor:'#da9129',marginLeft:'10px'}}>{"LOG ENTRY"}</div>
                            <div onClick={this.handleClose} style={{float:'right',lineHeight:'3%',margin:'-12px'}}>
                                <CloseIcon style={{cursor:'pointer',lineHeight:'3%',fontSize:'12px',color:'white'}}/>
                            </div>
                        </div>
                    }
            >
                <div style={{padding:'20px'}}>
                    <div style={{display:'flex'}}>
                        <div style={{width:'49%'}}>
                            <div style={{display:'flex'}}>
                                <div>
                                    <div style={{width:'200px'}}>Date</div>
                                    <div style={{width:'200px'}}>Aircraft</div>
                                    <div style={{width:'200px'}}>&nbsp;</div>
                                    <div style={{width:'200px'}}>&nbsp;</div>
                                    <div style={{width:'200px'}}>Takeoff time</div>
                                    <div style={{width:'200px'}}>Landing time</div>
                                    <div style={{width:'200px'}}>Departure airport</div>
                                    <div style={{width:'200px'}}>Arrival airport</div>
                                    <div style={{width:'200px'}}>Total time</div>
                                    <div style={{width:'200px'}}>Pic time</div>
                                    <div style={{width:'200px'}}>Coop time</div>
                                    <div style={{width:'200px'}}>Dual time</div>
                                    <div style={{width:'200px'}}>Ifr time</div>
                                    <div style={{width:'200px'}}>Night time</div>
                                    <div style={{width:'200px'}}>Landings</div>
                                    <div style={{width:'200px'}}>Type</div>
                                    <div style={{width:'200px'}}>Comments</div>
                                </div>
                                <div>
                                    <div><Moment format="DD.MM.YYYY" date={(this.props.appStore.logEntry.Date)}/></div>
                                    <div>
                                        <div>{this.props.appStore.logEntry.BakAircraft}</div>
                                        <div>{this.getAircraft && this.getAircraft.Make} {this.getAircraft && this.getAircraft.Model}</div>
                                        <div></div>
                                        <div>{this.getAircraft && this.getAircraft.Variant}</div>
                                    </div>
                                    <div><Moment format="HH:mm" date={(this.props.appStore.logEntry.TimeStart)}/></div>
                                    <div><Moment format="HH:mm" date={(this.props.appStore.logEntry.TimeEnd)}/></div>
                                    <div>{this.getAirportName(this.props.appStore.logEntry.DepartureAirport)+" ("+this.props.appStore.logEntry.DepartureAirport+")"}</div>
                                    <div>{this.getAirportName(this.props.appStore.logEntry.ArrivalAirport)+" ("+this.props.appStore.logEntry.ArrivalAirport+")"}</div>
                                    <div>{this.getTimeFromMinutes(this.props.appStore.logEntry.TimeTotal)}</div>
                                    <div>{this.getTimeFromMinutes(this.props.appStore.logEntry.Pic)}</div>
                                    <div>{this.getTimeFromMinutes(this.props.appStore.logEntry.Coop)}</div>
                                    <div>{this.getTimeFromMinutes(this.props.appStore.logEntry.Dual)}</div>
                                    <div>{this.getTimeFromMinutes(this.props.appStore.logEntry.Ifr)}</div>
                                    <div>{this.getTimeFromMinutes(this.props.appStore.logEntry.Night)}</div>
                                    <div>{this.props.appStore.logEntry.Landings}</div>
                                    <div>{this.props.appStore.logEntry.Type}</div>
                                    <div>{this.props.appStore.logEntry.Comments}</div>                                    
                                </div>
                            </div>   
                            <div style={{marginTop:'15px'}}>
                                <RaisedButton 
                                    onTouchTap={this.handleOpenConfirmDeleteDialog} 
                                    overlayStyle={{backgroundColor:'#da9129'}} 
                                    buttonStyle={{color:'white',width:'200px'}} 
                                    label={"DELETE"} 
                                />
                                <Dialog 
                                    actions={[
                                        <FlatButton
                                            label="DELETE"
                                            primary={true}
                                            onTouchTap={this.handleDelete}
                                            style={{float:'left',color:'white',backgroundColor:'#da9129'}}
                                        />,
                                        <FlatButton
                                            label="Cancel"
                                            primary={true}
                                            onTouchTap={this.handleCloseConfirmDeleteDialog}
                                            style={{color:'white',backgroundColor:'#da9129'}}
                                        />
                                    ]}                                                                   
                                    contentStyle={{width:'20%',maxWidth: 'none',position:'absolute',top:'40%',height:'100%',left:'15%'}}               
                                    open={this.state.confirmDeleteDialog} 
                                    modal={true}
                                    title={
                                            <div style={{lineHeight:'20%',fontSize:'16px',backgroundColor:'#da9129',color:'white'}}>
                                                <div style={{backgroundColor:'#da9129',marginLeft:'10px'}}>{"DELETE LOG ENTRY"}</div>
                                            </div>
                                        }
                                >
                                    <div style={{marginTop:'10px'}}>{"Really delete this entry?"}</div>
                                </Dialog>
                            </div>
                            <div style={{marginTop:'15px'}}>
                                <RaisedButton 
                                    onTouchTap={this.handleEditLogEntry} 
                                    overlayStyle={{backgroundColor:'#da9129'}} 
                                    buttonStyle={{color:'white',width:'200px'}} 
                                    label={"EDIT"} 
                                />
                            </div>
                        </div>
                        <div style={{width:'49%'}}>
                            <Map appStore={this.props.appStore} />
                        </div>                        
                    </div>
                </div>                
            </Dialog>
        )
    }

}