import {observable} from 'mobx';
import React from 'react';

export default class AppStore {

    @observable logEntries = [];
    @observable allLogEntries = [];
    @observable bakAircrafts = [];
    @observable aircrafts = [];
    @observable flightTypes = [];
    @observable airports = [];
    @observable logEntry = [];
    @observable openDetailsDialog = false;
    @observable openEditAddLogEntryDialog = false;
    @observable openEditAddAircraftDialog = false;
    @observable openEditAddBakAircraftDialog = false;
    @observable loading = false;
    @observable exists = false;

    @observable alarmTableAssignedData = [];
    @observable standardCauseList = [];
    @observable standardActionList = [];
    @observable standardRemarkList = [];
    @observable alarmDetail = [];
    @observable alarmPreviousDetail = [];
    @observable currentOpenedNim = "";
    
    @observable searchResult = [];
    @observable globalSearchLoader = false;
    
    @observable alarmIsClosing = false;
    orgTreeView = [];

    specialChars = /^[æøåÆØÅa-zA-Z0-9,._ ]*$/g;
    numberChars = /^[0-9]*$/g;

    tableHeightAssignedInit = 445;
    tableHeightAcceptedInit = 340;
    defaultSplitSize = 550;
    @observable appHeight = 1000;
    @observable windowHeight = this.appHeight;
    @observable tableHeightAssigned = this.tableHeightAssignedInit;
    @observable tableHeightAccepted = this.tableHeightAcceptedInit;

    @observable userinfo = [];
    @observable systemSymbol;
    @observable systemMessage;
    @observable systemHeader;
    @observable leftScreenSplitSize = 1000;
    @observable deviceToTrack = null;
    @observable userToAccept = null;

    @observable mobileAppUsers = [];
    @observable mobileAppLowConnectedOrgs = [];
    @observable mobileAppLowConnections = 0;
    @observable mobileAppLowConnectionThreshold = 0;
    @observable mobileAppOrgsDialogOpen = false;
    @observable mobileAppUserDialogOpen = false;
    @observable thisIP;

    googleApiKey = "AIzaSyCWdpyEzy2RkKuyEwFffc6nsZWGRxEQ-bc";
}