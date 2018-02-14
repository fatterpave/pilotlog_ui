/**
 * Created by obsjoa on 01.06.2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import GoogleMap from 'google-map-react';

export default class SimpleMapPage extends Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        googleMapPlaceCoords: PropTypes.any
    };

    static defaultProps = {
        center: [59.938043, 30.337157],
        zoom: 9,
        googleMapPlaceCoords: {lat: 59.724465, lng: 30.080121}
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GoogleMap
                bootstrapURLKeys={{key:this.props.apiKey}}
                center={this.props.center}
                zoom={this.props.zoom}>
                {this.props.markers && this.props.markers.map(function(marker,index){
                    return marker;
                })}
            </GoogleMap>
        );
    }
}