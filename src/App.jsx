import React, { Component } from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MainComponent from './components/MainComponent';
import AlertContainer from 'react-alert';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import ProgressOverlay from './components/common/ProgressOverlay';
injectTapEventPlugin();

let wsurl = 'ws://localhost:51416/ws';
let ws;

@observer
class App extends Component {

    constructor(args)
    {
        super(args);
        this.initWebsocketConnection = this.initWebsocketConnection.bind(this);
        this.websocketRequest = this.websocketRequest.bind(this);
        //this.showAlert = this.showAlert.bind(this);
        this.restRequest = this.restRequest.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        ws = new WebSocket (wsurl);
    }

    websocketRequest = function(params)
    {
        this.props.appStore.loading = true;
        ws.send(JSON.stringify(params));        
    };

    restRequest = function(resource,params,loader,phonelist)
    {
        let header = new Headers();
        header.append('Content-Type','application/json');
        if(loader)this.props.appStore[loader] = true;

        var url = new URL(resturl+resource);
        if(params) Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        fetch(url,{
            method:'get',
            headers:header
        })
        .then(res=>res.json())
        .then(json=>{
            if(loader)this.props.appStore[loader] = false;

            this.props.appStore.searchResult = json;
        })
        .catch(err=>{
            console.error("Error getting user data",err);
        });
    };

    showAlert = (text,type) => {
        msg.show(text, {
            time: 5000,
            type: type,
        });  
    };

    initWebsocketConnection = function()
    {
        let self = this;
        
        ws.onmessage = function(response){

            let data = JSON.parse(response.data);
            self.props.appStore.exists = false;
            console.log("WS: ",data);
            switch(data.Type)
            {
                case "INIT":
                    console.log("Received init data");
                    self.props.appStore.logEntries = data.LogEntries;
                    self.props.appStore.allLogEntries = data.LogEntries;                  
                    self.props.appStore.bakAircrafts = data.BakAircrafts;
                    self.props.appStore.airports = data.Airports;
                    self.props.appStore.flightTypes = data.FlightTypes;
                    self.props.appStore.aircrafts = data.Aircrafts;
                    break;
                case "MESSAGE":
                    console.log(data.Message);
                    break;
                case "ERROR":
                    console.log(data.Error.Message);
                    self.showAlert("Error during request - "+data.Error.Message,"error");
                    if(data.Error.Ambigous) self.props.appStore.exists = true;
                    console.log(self.props.appStore.exists);
                    break;
                case "LIST":
                    console.log("Received log list");
                    self.props.appStore.logEntries = data.LogEntries;  
                    self.props.appStore.allLogEntries = data.LogEntries;        
                    if(data.Message) self.showAlert(data.Message,"success");             
                    break;
                case "DETAIL":
                    console.log("Received log detail");
                    self.props.appStore.logEntry = data.LogEntry;                    
                    break;
                case "AIRCRAFT":
                    self.props.appStore.aircrafts = data.Aircrafts;
                    if(data.Message) self.showAlert(data.Message,"success");
                    break;
                case "BAKAIRCRAFT":
                    self.props.appStore.bakAircrafts = data.BakAircrafts;
                    if(data.Message) self.showAlert(data.Message,"success");
                    break;
                default:
                    console.error("Unknown type",data.Type);
                    self.showAlert("Unknown type","error");
                    break;
            }        

            self.props.appStore.loading = false;
        };

        ws.onerror = function(err){
            console.error("WEBSOCKET ERROR",err);
        };

        ws.onopen = function(message){
            console.log("Subscribing...");
            self.showAlert("Koblet til server.","success");
            let openCommand = {command:'INIT'};
            ws.send(JSON.stringify(openCommand));
        };

        ws.onclose = function(message){
            console.log("WEBSOCKET LUKKET",message);
            self.showAlert("Koblet fra server, prøver å gjenopprette...","error");
            setTimeout(function(){
                ws = new WebSocket(wsurl);
                if(ws) self.initWebsocketConnection();
                else self.showAlert("Koblet fra server, prøver å gjenopprette...","error");
            }, 5000);
        };
    };

    updateDimensions(){
        let w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight|| e.clientHeight|| g.clientHeight;
        this.props.appStore.windowHeight = g.clientHeight;
    };

    componentDidMount() {
        this.props.appStore.loading = true;
        this.initWebsocketConnection();
    }

    render() {
        return (
          <div>
              <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />              
              <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                 <div>
                    <MainComponent restRequest={this.restRequest} request={this.websocketRequest} appStore={this.props.appStore}/>
                    <ProgressOverlay loading={this.props.appStore.loading} />
                 </div>                 
              </MuiThemeProvider>
              {/*<DevTools/>*/}
          </div>
        );
  }
}

export default App;
