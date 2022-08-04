@IsTest
private class Dates_Validation_Test {
@isTest static void CreateInPast(){
	Date start = Date.newInstance(2022, 4,2);
	Date finish = Date.newInstance(2022, 4,9);
	Dates_Validation val = new Dates_Validation();
	Integer test = val.Count(start, finish);
	System.assertEquals(0, test);
}
	@isTest static void CreateStartDateAfterEndDate(){
		Date start = Date.newInstance(2022, 12,10);
		Date finish = Date.newInstance(2022, 11,1);
		Dates_Validation val = new Dates_Validation();
		Integer test = val.Count(start, finish);
		System.assertEquals(0, test);
	}
	@isTest static void CreateStartIsEnd(){
		Date start = Date.newInstance(2022, 12,10);
		Date finish = Date.newInstance(2022, 12,10);
		Dates_Validation val = new Dates_Validation();
		Integer test = val.Count(start, finish);
		System.assertEquals(1, test);
	}
	@isTest static void CreateNormalRequest(){
		Date start = Date.newInstance(2022, 12,11);
		Date finish = Date.newInstance(2022, 12,17);
		Dates_Validation val = new Dates_Validation();
		Integer test = val.Count(start, finish);
		System.assertEquals(5, test);
	}
}