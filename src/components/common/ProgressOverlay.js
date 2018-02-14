/**
 * Created by obsjoa on 31.01.2017.
 */
import {observer} from 'mobx-react';
import React,{Component} from 'react';
import Dialog from 'material-ui/Dialog';
import CircularProgress from 'material-ui/CircularProgress';

@observer
class ProgressOverlay extends Component {

    constructor(args){
        super(args);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose = function(){
        this.props.loading = false;
    };

    render(){
        return(
            <div>
                <Dialog
                    title="Laster..."
                    contentStyle={{width:'10%',paddingRight:'17px'}}
                    modal={false}
                    open={this.props.loading}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    bodyStyle={{backgroundColor:'rgb(48,48,48)',textAlign:'center'}}
                    actionsContainerStyle={{backgroundColor:'rgb(48,48,48)',color:'white'}}
                    titleStyle={{lineHeight:'3%',fontSize:'15px',height:'1%',backgroundColor:'#da9129',color:'white'}}
                >
                    <CircularProgress style={{marginTop:'5px'}} size={80} thickness={10} />
                </Dialog>
            </div>
        )
    }

}

export default ProgressOverlay;