/**
 * Created by obsjoa on 01.06.2017.
 */
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';
import css from '../../main.css';

export default class GoogleMapPlace extends Component {
    static propTypes = {
        text: PropTypes.string
    };

    static defaultProps = {};

    shouldComponentUpdate = shouldPureComponentUpdate;

    render() {
        return (
            <div style={{
                color:'blue',
                width:'100px',
                background: 'rgba(255,255,255,0.3)',
                textAlign: 'center',
                fontSize: 10,
                borderRadius:'10px',
                fontWeight: 'bold',
                padding: 4,
                display:'flex'}}>
                <div style={{lineHeight:'20px'}}>{this.props.icon}</div><div style={{lineHeight:'20px',textAlign:'center'}}>{this.props.text}</div>
            </div>
        );
    }
}
