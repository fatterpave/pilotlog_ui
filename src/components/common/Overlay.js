/**
 * Created by obsjoa on 01.02.2017.
 */
import {observer} from 'mobx-react';
import React,{Component} from 'react';

@observer
class Overlay extends Component {

    constructor(args){
        super(args);
    }

    render(){
        return(
            <div style={{
                height:this.props.height,
                width:'100%',
                zIndex:'10',
                opacity:'0.7',
                position:'absolute',
                top:0,
                left:0,
                backgroundColor:'rgba(100,100,100,0.7)',
                display:this.props.show?"block":"none"
            }}>
            </div>
        )
    }

}

export default Overlay;