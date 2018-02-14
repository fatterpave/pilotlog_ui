import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

@observer
export default class EditAddAircraft extends Component{

    constructor(args){
        super(args);

        this.state = {
            make:"",
            model:"",
            variant:"",           
        }
    }

    handleClose = () => {
        this.setState(
        {
            make:"",
            model:"",
            variant:"",           
        });
        this.props.appStore.openEditAddAircraftDialog = false;
    }

    handleSave = () => {
        if(this.state.make.length==0 || this.state.model.length==0 || this.state.variant.length==0 || this.props.appStore.exists) return;
        else
        {                    
            let req = {
                command:"INSERT_AIRCRAFT",
                params:{
                    make:this.state.make,
                    model:this.state.model,
                    variant:this.state.variant
                }
            }
            this.props.request(req);
        }     
    }

    handleChangeMake = (event) => {
        this.setState({make:event.target.value});
    }

    handleChangeModel = (event) => {
        this.setState({model:event.target.value});
    }

    handleChangeVariant = (event) => {
        this.setState({variant:event.target.value});
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
                contentStyle={{width:'40%',maxWidth: 'none',position:'absolute',top:'5%',height:'100%',left:'5%'}}               
                open={this.props.appStore.openEditAddAircraftDialog} 
                actions={actions}
                modal={true}
                title={
                        <div style={{lineHeight:'20%',fontSize:'16px',backgroundColor:'#da9129',color:'white'}}>
                            <div style={{backgroundColor:'#da9129',marginLeft:'10px'}}>{"ADD AIRCRAFT"}</div>
                            <div onClick={this.handleClose} style={{float:'right',lineHeight:'3%',margin:'-12px'}}>
                                <CloseIcon style={{cursor:'pointer',lineHeight:'3%',fontSize:'12px',color:'white'}}/>
                            </div>
                        </div>
                    }
            >
                <div style={{marginTop:'10px'}}>
                    <div>                        
                        <div style={{display:'flex',marginBottom:'5px'}}>
                            <div style={{color:'white',width:'150px'}}>Make</div>
                            <div style={{color:'white',width:'150px'}}>Model</div>
                            <div style={{color:'white',width:'150px'}}>Variant</div>
                        </div>
                        <div>
                            {
                                this.props.appStore.aircrafts && this.props.appStore.aircrafts.map((aircraft,index)=>                                
                                    <div key={index} style={{display:'flex'}}>
                                        <div key={"make_"+aircraft.Id} style={{width:'150px'}}>{aircraft.Make}</div>
                                        <div key={"model_"+aircraft.Id} style={{width:'150px'}}>{aircraft.Model}</div>
                                        <div key={"variant_"+aircraft.Id} style={{width:'150px'}}>{aircraft.Variant}</div>                               
                                    </div>
                                )
                            }
                        </div>                          
                    </div>
                    <div style={{display:'flex',marginTop:'10px'}}>
                        <div style={{width:'200px',marginRight:'10px'}}>
                            <TextField
                                        id="text-field-controlled1"
                                        value={this.state.make}
                                        onChange={this.handleChangeMake}
                                        style={{width:'150px'}}
                                        fullWidth={true}
                                        floatingLabelText={"Make"}
                                        floatingLabelFocusStyle={{color:'rgb(255,255,255,0.3'}}
                                        underlineFocusStyle={{borderColor:'#da9129'}}
                                        errorText={this.state.make.length==0 && "Cannot be empty"}
                            />
                        </div>
                        <div style={{width:'200px',marginRight:'10px'}}>
                            <TextField
                                        id="text-field-controlled2"
                                        value={this.state.model}
                                        onChange={this.handleChangeModel}
                                        style={{width:'150px'}}
                                        floatingLabelText={"Model"}
                                        fullWidth={true}
                                        floatingLabelFocusStyle={{color:'rgb(255,255,255,0.3'}}
                                        underlineFocusStyle={{borderColor:'#da9129'}}
                                        errorText={this.state.model.length==0 && "Cannot be empty"}
                            />
                        </div>
                        <div style={{width:'200px',marginRight:'10px'}}>
                            <TextField
                                        id="text-field-controlled3"
                                        value={this.state.variant}
                                        onChange={this.handleChangeVariant}
                                        style={{width:'150px'}}
                                        floatingLabelText={"Variant"}
                                        fullWidth={true}
                                        floatingLabelFocusStyle={{color:'rgb(255,255,255,0.3'}}
                                        underlineFocusStyle={{borderColor:'#da9129'}}
                                        errorText={(this.state.variant.length==0?"Cannot be empty":this.props.appStore.exists?"Variant exists":"")}
                            />
                        </div>
                    </div>
                </div>
            </Dialog>
        )
    }
}