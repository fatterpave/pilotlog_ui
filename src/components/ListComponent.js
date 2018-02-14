/**
 * Created by obsjoa on 27.01.2017.
 */
/**
 * Created by obsjoa on 06.01.2017.
 */
import {observer} from 'mobx-react';
import React, { Component } from 'react';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Moment from 'react-moment';
import {computed} from 'mobx';

const tableHeaderData = [
    {
        text:'Date',
        width:'29px',
        textAlign: 'center',
        paddingRight:'2px',
        paddingLeft:'0px',
        sortKey:'Date'        
    },
    {
        text:'Callsign',
        width:'20px',
        textAlign: 'center',
        paddingRight:'0px',
        sortKey:'BakAircraft'
    },
    {
        text:'Dep.',
        width:'20px',
        textAlign: 'center',
        paddingRight:'0px',
        sortKey:'DepartureAirport'
    },
    {
        text:'Arr.',
        width:'20px',
        textAlign: 'center',
        paddingRight:'0px',
    },
    {
        text:'T/O',
        width:'20px',
        textAlign: 'center',
        paddingRight:'0px',
    },
    {
        text:'LND',
        width:'20px',
        textAlign: 'center',
        paddingRight:'0px',
    },
    {
        text:'Total',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'PIC',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Coop',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Dual',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Ifr',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Night',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Lnds',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Type',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    },
    {
        text:'Cmts',
        width:'20px',
        align: 'left',
        paddingRight:'0px',
    }
];

@observer
export default class ListComponent extends Component
{
    constructor(args)
    {
        super(args);
    }

    getBackColor = function(id,index){
    
        let back = index%2==0?"#f8c57b":"rgb(72,72,72)";
        return back;
    };

    getTimeFromMinutes = (minutes) => {
        let hrs = Math.floor(minutes/60);
        let min = minutes % 60;
        let sMin = "";
        if(min<10) sMin = "0"+min;
        else sMin = min;

        return hrs+":"+sMin;
    };

    getStyle = (rowid,index) => {
        return {backgroundColor:this.getBackColor(rowid,index),width:'20px',textAlign: 'center',paddingRight:'5px'}
    };

    handleSort = (sortKey) => {
        if(sortKey)
        {
            this.props.appStore.logEntries = this.props.appStore.logEntries.sort((a,b)=>a[sortKey]<b[sortKey])
        }
    }

    @computed
    get summary(){
        let totFlights = 0;
        let totTime = 0;
        let pic = 0;
        let coop = 0;
        let dual = 0;
        let ifr = 0;
        let night = 0;
        let landings = 0;

        this.props.appStore.logEntries.forEach((log) => {
            totFlights++;
            totTime += log.TimeTotal;
            pic += log.Pic;
            coop += log.Coop;
            dual += log.Dual;
            ifr += log.Ifr;
            night += log.Night;
            landings += log.Landings;
        });

        return {
            flights:totFlights,
            totTime:this.getTimeFromMinutes(totTime),
            pic:this.getTimeFromMinutes(pic),
            coop:this.getTimeFromMinutes(coop),
            dual:this.getTimeFromMinutes(dual),
            ifr:this.getTimeFromMinutes(ifr),
            night:this.getTimeFromMinutes(night),
            landings:landings
        }
    }

    render(){
        return(
            <div>
                <Table
                    height={this.props.tableHeight}
                    fixedHeader={true}
                    fixedFooter={false}
                    selectable={true}
                    multiSelectable={false}
                    className="alarm-table"
                    headerStyle={{height:'47px'}}
                >
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                    >
                        <TableRow>
                            {
                                tableHeaderData.map( (col,index) =>
                                    <TableHeaderColumn onTouchTap={this.handleSort.bind(this,col.sortKey)} style={{cursor:col.sortKey?'pointer':'',fontSize:'14px',width:col.width,color:'white',textAlign:col.align,paddingRight:col.paddingRight,paddingLeft:col.paddingLeft}} key={index}>{col.text}</TableHeaderColumn>
                                )
                            }
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                        deselectOnClickaway={true}
                        showRowHover={true}
                        stripedRows={true}
                    >

                        {this.props.appStore.logEntries && this.props.appStore.logEntries.map( (row, index) => (
                            <TableRow key={row.Id} data-id={row.Id}  selected={row.selected} className="table-row" onDoubleClick={this.props.onRowDoubleClick}>

                                <TableRowColumn key={"date_"+row.Id} data-id={row.Id} style={{backgroundColor:this.getBackColor(row.Id,index),width:'35px',textAlign: 'center',paddingRight:'5px'}}>
                                    <Moment data-id={row.Id} format="DD.MM.YYYY" date={(row.Date)}/>
                                </TableRowColumn>
                                <TableRowColumn key={"bak_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {row.BakAircraft}
                                </TableRowColumn>
                                <TableRowColumn key={"dep_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {row.DepartureAirport}
                                </TableRowColumn>
                                <TableRowColumn key={"arr_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {row.ArrivalAirport}
                                </TableRowColumn>
                                <TableRowColumn key={"timestart_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    <Moment data-id={row.Id} format="HH:mm" date={(row.TimeStart)}/>
                                </TableRowColumn>
                                <TableRowColumn key={"timeend_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    <Moment data-id={row.Id} format="HH:mm" date={(row.TimeEnd)}/>
                                </TableRowColumn>
                                <TableRowColumn key={"timetotal_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {this.getTimeFromMinutes(row.TimeTotal)}
                                </TableRowColumn>
                                <TableRowColumn key={"pic_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {this.getTimeFromMinutes(row.Pic)}
                                </TableRowColumn>
                                <TableRowColumn key={"coop_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {this.getTimeFromMinutes(row.Coop)}
                                </TableRowColumn>
                                <TableRowColumn key={"dual_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {this.getTimeFromMinutes(row.Dual)}
                                </TableRowColumn>
                                <TableRowColumn key={"ifr_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {this.getTimeFromMinutes(row.Ifr)}
                                </TableRowColumn>
                                <TableRowColumn key={"night_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {this.getTimeFromMinutes(row.Night)}
                                </TableRowColumn>
                                <TableRowColumn key={"landings_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {row.Landings}
                                </TableRowColumn>
                                <TableRowColumn key={"type_"+row.Id} data-id={row.Id} style={this.getStyle(row.Id,index)}>
                                    {row.Type}
                                </TableRowColumn>
                                <TableRowColumn title={row.Comments} key={"comments_"+row.Id} data-id={row.Id} style={{backgroundColor:this.getBackColor(row.Id,index),width:'30px',textAlign: 'left'}}>
                                    {row.Comments}
                                </TableRowColumn>                        
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn colSpan="15" style={{lineHeight:'48px',textAlign: 'center'}}>
                                <div style={{paddingLeft:'10px',display:'flex',justifyContent: 'space-between',paddingRight:'10px'}}>
                                    <div>No.of flights: {this.summary.flights}</div>
                                    <div>Acc.time: {this.summary.totTime}</div>
                                    <div>Pic.time: {this.summary.pic}</div>
                                    <div>Dual.time: {this.summary.dual}</div>
                                    <div>Ifr.time: {this.summary.ifr}</div>
                                    <div>Night time: {this.summary.night}</div>
                                    <div>Landings: {this.summary.landings}</div>
                                </div>
                            </TableRowColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        );
    };
}
