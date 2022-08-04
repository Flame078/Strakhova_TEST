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
import ManagerName from '@salesforce/schema/User.ManagerId';
import currentUserId from '@salesforce/user/Id';


export default class User_Vacation_Request extends LightningElement {

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


    showMy(event){
        if(event.currentTarget.dataset.user===currentUserId) {
            this.areMy = event.target.checked;
        }
        else this.areMy = !event.target.checked;
    }

    changeStatusToSubmitted(event) {
            let evt = new ShowToastEvent({
                title: 'Success',
                message: 'Request updated. Reload the page to see the changes',
                variant: 'success'
            });
            this.dispatchEvent(evt);}

    writeErrorMessage(){
        let evt = new ShowToastEvent({
            title: 'Error',
            message: 'something went wrong',
            variant: 'error'
        });
        this.dispatchEvent(evt);}



    getIdList(){
        getIdList().then(result => {this.requestRecordIds = result});
    }

    isSubmitPossible = true;

    SubmitIfOk(event){
        if(this.isSubmitPossible===false)
        event.preventDefault();
    }
    checkForSubmmit(event){
        let createdBy = event.currentTarget.dataset.user;
        let status = event.target.value;
        if(status!=="New"||createdBy!==currentUserId){
            this.isSubmitPossible = false;
            let evt = new ShowToastEvent({
                title: 'Error',
                message: 'record cannot be submitted',
                variant: 'error'});
            this.dispatchEvent(evt);
            }
        else this.isSubmitPossible = true;
    }
    isApprovingPossible = true;
    ApproveIfOk(event){
        if(this.isApprovingPossible===false)
            event.preventDefault();
    }
    checkForApprove(event){
        let status = event.target.value;
        console.log(event.currentTarget.dataset.manager);
        console.log(currentUserId);
        if(status!=="Submitted" || event.currentTarget.dataset.manager!==currentUserId){
            this.isApprovingPossible = false;
            let evt = new ShowToastEvent({
                title: 'Error',
                message: 'record cannot be approved',
                variant: 'error'});
            this.dispatchEvent(evt);
        }
        else this.isSubmitPossible = true;
    }

    deleteRequest(event) {
        let createdBy = event.currentTarget.dataset.user;
        let status = event.currentTarget.dataset.status;
        if(createdBy === currentUserId && status==="New")
        deleteRecord(event.target.value)
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record is deleted successfully. Please, reload the page to see the changes',
                        variant: 'success'
                    })
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: 'failed to delete the record',
                        variant: 'error'
                    })
                );
            });
         else{
          let evt =  new ShowToastEvent({
                title: 'Error deleting record',
                message: 'You are able to delete your New requests only.',
                variant: 'error'
            })
            this.dispatchEvent(evt);
        }
    }


    writeSuccessMessage(){
        const evt = new ShowToastEvent({
            title: 'Congrats',
            message: 'Request created successfully',
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    writeErrorMessage(){
        const evt = new ShowToastEvent({
            title: 'Error',
            message: 'Failed to create a request. Check the dates',
            variant: 'error',
        });
        this.dispatchEvent(evt);
    }

    checkManager(){
            console.log("hey there");
            if (ManagerName.value === undefined) {
                const evt = new ShowToastEvent({
                    title: 'Notice',
                    message: 'Manager have to be specified',
                    variant: 'alert',
                });
                this.dispatchEvent(evt);
                console.log("hey there again");
            }
            else {
                this.manager = ManagerName;
                console.log(ManagerName.value);
            }

    }
    areDetailsVisible = false;
    showForm(event){
        this.areDetailsVisible = true;
        this.checkManager();

    }
    hideForm(event){
        this.areDetailsVisible = false;
    }
/*
    start_global = new Date();
    global_finish = new Date();
    WorkingDays = 0;

    get workingDays(){
        let result = 0;
        let start = new Date(this.start_global);
        let finish = new Date(this.global_finish);
        let today = new Date();
        if ((start > finish) || start < today+86400000) {
            this.startDate = new Date();
            this.endDate = new Date(); // if date is incorrect, set current date
            return 1;
        }
        else {
            let days_remain = ((finish-start)/ 86400000)%7;
            result = (finish-start)/(86400000) - Math.floor(((finish-start)/(86400000))/7)*2 - days_remain; //take the weekends of full weeks
            for (let i = 0; i<1 + days_remain; i ++) {
                let currdate = (start.getDay() + i)%7;
                if (currdate !== 0 && currdate !== 6)
                { result++;}
            }
        }
        return result;
    }
    checkDays(){
        if(this.WorkingDays === 0){
            const evt = new ShowToastEvent({
                title: 'Error',
                message: 'Working Days = 0. Set another dates, please',
                variant: 'error',
            });
            this.dispatchEvent(evt);
        }
    }*/
}