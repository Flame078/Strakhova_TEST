public class Dates_Validation {

	public Dates_Validation(){}
	public void CountDaysOfVacation(List<Vacation_Request__c> vacationRequests)
		{
			for (Vacation_Request__c vacation :vacationRequests) {
				Date start = vacation.StartDate__c;
				Date finish = vacation.EndDate__c;

				vacation.WorkingDays__c = Count(start, finish);
				if (vacation.WorkingDays__c == 0){
					vacation.addError(
							'The vacation beginning have to be earlier then EndDate and equal/later then the current date. Use another StartDate');
				}
		}}

	public Integer Count(Date start, Date finish){
		Datetime currdate = start;
		Integer result = 0;
		if (start.daysBetween(finish) < 0 || start.daysBetween(system.today()) > 0)
		{
			result = 0;

		} else if (start.daysBetween(finish) == 0 && currdate.format('EEEE')!='Saturday'
				&& currdate.format('EEEE')!='Sunday')
		{
			result = 1;
		} else
		{
			result = CalculateWorkingDays(start, finish);
		}
		return result;
	}

	private Integer CalculateWorkingDays(Date start, Date finish)
		{
			Integer result = 0;
			Datetime currdate;

			// if u need to use a calendar of holidays, uncomment the following
			///Set<Date> holidaysSet = new Set<Date>();
			// and fill it with corresponding dates

			for(Integer i = 0; i<=start.daysBetween(finish)+1; i++)
				{
					currdate = start + i;
					// use &&(!holidaysSet.contains(date)) for specialized holidays
					if (currdate.format('EEEE')!='Saturday'
							&& currdate.format('EEEE')!='Sunday')
					{
						result ++;
					}
				}
			return result;
		}
}