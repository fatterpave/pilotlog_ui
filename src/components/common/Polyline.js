import React,{Component,PureComponent} from 'react';

class Polyline extends PureComponent {

  componentWillUpdate() {
    this.line.setMap(null)
  }

  componentWillUnmount() {
    this.line.setMap(null)
  }

  getPaths() {
    const { origin, destination } = this.props;
    console.log("piss",origin);

    return [
      { lat: Number(origin.lat), lng: Number(origin.long) },
      { lat: Number(destination.lat), lng: Number(destination.long) }
    ];
  }

  render() {
    const Polyline = this.props.maps.Polyline

    const renderedPolyline = this.renderPolyline()
    const paths = { path: this.getPaths() }

    this.line = new Polyline(Object.assign({}, renderedPolyline, paths))

    this.line.setMap(this.props.map)

    return null
  }

  renderPolyline() {
    return {
      geodesic: true,
      strokeColor: this.props.color || '#ffffff',
      strokeOpacity: 1,
      strokeWeight: 8
    }
  }

}
