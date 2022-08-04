public class requestController {
	@AuraEnabled(cacheable=true)
	public static List<Vacation_Request__c> getIdList() {
		return [
				SELECT Id, Status__c, CreatedById, Manager__c
				FROM Vacation_Request__c
		];
	}

}