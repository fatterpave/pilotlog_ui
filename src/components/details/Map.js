import {observer} from 'mobx-react';
import {computed} from 'mobx';
import React, { Component } from 'react';
import GoogleMapPlace from '../common/GoogleMapPlace';
import GoogleMap from '../common/GoogleMap';
import TakeOffIcon from 'material-ui/svg-icons/action/flight-takeoff';
import LandIcon from 'material-ui/svg-icons/action/flight-land';
import Polyline from '../common/Polyline';

@observer
export default class Map extends Component{
    constructor(args){
        super(args);

        this.state = {
            map:null,
            maps:null,
            mapLoaded:null
        }
    }

    getLatLongFromCoords = (airport) =>{
        if(airport) {            
            let lat = "";
            let long = "";
            let idx = this.props.appStore.airports.map((airport) => airport.Icao).indexOf(airport);
            if(idx>-1)
            {
              lat = this.props.appStore.airports[idx].Latitude;
              long = this.props.appStore.airports[idx].Longitude;
            }
            
            return {lat: parseFloat(lat), long: parseFloat(long)};
        }
    }

    getAirportName(icao){
        let airport = this.props.appStore.airports.filter(function(ap) {
            return ap.Icao===icao;
        });
        return airport[0].Name;
    }

    @computed
    get googleMap(){
        if(this.props.appStore.logEntry)
        {
            const coordsDeparture = this.getLatLongFromCoords(this.props.appStore.logEntry.DepartureAirport);
            const coordsArrival = this.getLatLongFromCoords(this.props.appStore.logEntry.ArrivalAirport);
            
            if(this.props.appStore.logEntry.DepartureAirport == this.props.appStore.logEntry.ArrivalAirport)
            {
                return coordsDeparture && coordsArrival && 
                    <GoogleMap   
                        apiKey={this.props.appStore.googleApiKey}
                        center={[this.getLatLongFromCoords(this.props.appStore.logEntry.DepartureAirport).lat, 
                                this.getLatLongFromCoords(this.props.appStore.logEntry.DepartureAirport).long]}
                        markers={[
                            <GoogleMapPlace
                                key={0}
                                lat={coordsDeparture.lat}
                                lng={coordsDeparture.long}
                                text={this.getAirportName(this.props.appStore.logEntry.DepartureAirport) + " (" + this.props.appStore.logEntry.DepartureAirport+")"}
                                icon={<TakeOffIcon color={'blue'} size={'1.5em'}/>}/>,
                        ]}
                    />
            }
            else
            {
                return coordsDeparture && coordsArrival && 
                    <GoogleMap
                        apiKey={this.props.appStore.googleApiKey}
                        center={[this.getLatLongFromCoords(this.props.appStore.logEntry.DepartureAirport).lat, 
                                this.getLatLongFromCoords(this.props.appStore.logEntry.DepartureAirport).long]}
                        markers={[
                            <GoogleMapPlace
                                key={0}
                                lat={coordsDeparture.lat}
                                lng={coordsDeparture.long}
                                text={this.getAirportName(this.props.appStore.logEntry.DepartureAirport) + " (" + this.props.appStore.logEntry.DepartureAirport+")"}
                                icon={<TakeOffIcon color={'black'} size={'1.5em'}/>}/>,
                            <GoogleMapPlace
                                key={1}
                                lat={coordsArrival.lat}
                                lng={coordsArrival.long}
                                text={this.getAirportName(this.props.appStore.logEntry.ArrivalAirport) + " (" + this.props.appStore.logEntry.ArrivalAirport+")"}
                                icon={<LandIcon color={'black'} size={'1.5em'}/>}/>
                        ]}
                    />
            }
        }
    }

    render(){
        return(
            <div>
                {this.googleMap}
            </div>
        )
    }
}
