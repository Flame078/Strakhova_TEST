import {LightningElement} from 'lwc';
import { deleteRecord} from 'lightning/uiRecordApi';
import getIdList from '@salesforce/apex/requestController.getIdList';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import Vacation_Request from '@salesforce/schema/Vacation_Request__c';
import ReqType from '@salesforce/schema/Vacation_Request__c.RequestType__c';
import StartDate from '@salesforce/schema/Vacation_Request__c.StartDate__c';
import EndDate from '@salesforce/schema/Vacation_Request__c.EndDate__c';
import Manager from '@salesforce/schema/Vacation_Request__c.Manager__c';
import WDays from '@salesforce/schema/Vacation_Request__c.WorkingDays__c';
import Status from '@salesforce/schema/Vacation_Request__c.Status__c';
import CreatedById from '@salesforce/schema/Vacation_Request__c.CreatedById';
import ManagerName from '@salesforce/schema/User.Manager.Name';
import currentUser from '@salesforce/schema/User.ProfileId'

export default class Manager_Vacation_Request extends LightningElement {

    requestRecordIds;
    user = CreatedById;
    areMy = true;
    Request_status = Status;
    working_days_output=WDays;
    vacationRequest = Vacation_Request;
    requestType=ReqType;
    startDate=StartDate;
    endDate=EndDate;
    manager=Manager;

    writeSuccessMessage(){
        const evt = new ShowToastEvent({
            title: 'Congrats',
            message: 'Request created successfully',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
}