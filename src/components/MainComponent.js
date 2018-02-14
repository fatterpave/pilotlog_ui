/**
 * Created by obsjoa on 06.01.2017.
 */
import {observer} from 'mobx-react';
import React, { Component } from 'react';
import {GridList,GridTile} from 'material-ui/GridList';
import ListComponent from './ListComponent';
import ActionComponent from './ActionComponent';
import LogDetails from './details/LogDetails';

@observer
export default class MainComponent extends Component{

    constructor(args) {
        super(args);
        this.handleOnRowDoubleClick = this.handleOnRowDoubleClick.bind(this);
        this.handleOnResize = this.handleOnResize.bind(this);
    }

    handleOnRowDoubleClick = function(proxy,event){
        let id = event.target.dataset.id;        

        if(id) 
        {         
            let command = {
                command: 'DETAIL',
                params: {
                    id: id
                }
            };

            this.props.request(command);
            this.props.appStore.openDetailsDialog = true;
        }
        else console.log("no hit");
    };

    handleOnResize = function(sizeUpper)
    {
        let abs = sizeUpper - this.props.appStore.defaultSplitSize;
        this.props.appStore.tableHeightAssigned = (this.props.appStore.tableHeightAssignedInit+abs);
        this.props.appStore.tableHeightAccepted = (this.props.appStore.tableHeightAcceptedInit-abs);
    };

    render(){

        return (
            <div>                
                <GridList cols={5} padding={4} cellHeight={this.props.appStore.appHeight}>
                    <GridTile cols={1}>
                        <div style={{height:'100%'}}>
                            <ActionComponent request={this.props.request} appStore={this.props.appStore} />
                        </div>
                    </GridTile>
                    <GridTile cols={4}>
                        <div style={{height:'100%'}}>                            
                            <ListComponent 
                                tableHeight={(this.props.appStore.windowHeight-50)+'px'} 
                                onRowDoubleClick={this.handleOnRowDoubleClick.bind(null,this)} 
                                appStore={this.props.appStore}/>                
                        </div>
                    </GridTile>
                </GridList>
                {this.props.appStore.logEntries && <LogDetails request={this.props.request} appStore={this.props.appStore} />}
            </div>
        );
    }

}
