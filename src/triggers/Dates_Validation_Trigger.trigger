trigger Dates_Validation_Trigger on Vacation_Request__c (before insert)
{
	Dates_Validation validation = new Dates_Validation();
	validation.CountDaysOfVacation(Trigger.new);
}