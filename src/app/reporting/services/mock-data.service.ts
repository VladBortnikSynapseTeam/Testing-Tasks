import { Injectable } from '@angular/core';
import { IReport, IReportCategory } from '../interfaces/reports.interfaces';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  public categories: IReportCategory[] = [
    {
        "type": "reportCategory",
        "id": "1",
        "attributes": {
            "name": "Sales",
            "insertedUser": "Sa",
            "insertedTime": "6/2/2011 4:03:32 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "2",
        "attributes": {
            "name": "Finance",
            "insertedUser": "sa",
            "insertedTime": "5/27/2012 11:14:51 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "3",
        "attributes": {
            "name": "Events",
            "insertedUser": "sa",
            "insertedTime": "5/27/2012 11:14:51 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "4",
        "attributes": {
            "name": "Fulfilment",
            "insertedUser": "sa",
            "insertedTime": "5/27/2012 11:14:51 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "5",
        "attributes": {
            "name": "Miscellaneous",
            "insertedUser": "sa",
            "insertedTime": "5/27/2012 11:14:51 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "6",
        "attributes": {
            "name": "CRM",
            "insertedUser": "sa",
            "insertedTime": "5/27/2012 11:14:51 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "7",
        "attributes": {
            "name": "Marketing",
            "insertedUser": "sa",
            "insertedTime": "4/7/2017 6:40:28 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "8",
        "attributes": {
            "name": "User",
            "insertedUser": "sa",
            "insertedTime": "4/7/2017 6:40:28 PM"
        }
    },
    {
        "type": "reportCategory",
        "id": "9",
        "attributes": {
            "name": "Frequently Used",
            "insertedUser": "sa",
            "insertedTime": "4/7/2017 6:40:28 PM"
        }
    }
  ];

  public reports: IReport[] = [
    {
      "type": "report",
      "id": "47",
      "attributes": {
          "name": "Sales by Business Area and Package",
          "description": "A detail list contains sales information per business area and package along with a sales comparison on different sales periods",
          "active": true,
          "code": "",
          "physicalFileName": "Sales by Business Area and Product",
          "reportCategoryId": "1",
          "reportCategoryName": "Sales",
          "customReport": false
      }
    },
    {
        "type": "report",
        "id": "48",
        "attributes": {
            "name": "Sales by Sales Channel and Sales Assistant",
            "description": "A detail list contains sales information per associated sales channel and the sales assistant along with a sales comparison on given sales periods",
            "active": true,
            "code": "",
            "physicalFileName": "Sales by Sales Channel and Employee",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "49",
        "attributes": {
            "name": "Gross Profit",
            "description": "Current sales and profitability based on Estimated GP",
            "active": true,
            "code": "",
            "physicalFileName": "Gross Profit",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "50",
        "attributes": {
            "name": "Gross Profit Estimated Vs Actual",
            "description": "Spot diferrence between Estimated and Actual GP",
            "active": true,
            "code": "",
            "physicalFileName": "Gross Profit Estimated Vs Actual",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "51",
        "attributes": {
            "name": "Stock Requirements - Deliverables",
            "description": "Check what needs to be ordered for an event and what has already beed ordered ",
            "active": true,
            "code": "",
            "physicalFileName": "Stock Requirements - Deliverables",
            "reportCategoryId": "3",
            "reportCategoryName": "Events",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "52",
        "attributes": {
            "name": "Aged Debtors",
            "description": "A list of all trade debtors at a specific date analysed by length of time that they have been due",
            "active": true,
            "code": "",
            "physicalFileName": "Aged Debtors",
            "reportCategoryId": "2",
            "reportCategoryName": "Finance",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "53",
        "attributes": {
            "name": "Catering",
            "description": "Plan menues and be aware of the special requirements by the catering staff",
            "active": true,
            "code": "",
            "physicalFileName": "Catering",
            "reportCategoryId": "3",
            "reportCategoryName": "Events",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "54",
        "attributes": {
            "name": "Table Plan",
            "description": "Get table plan for the customers",
            "active": true,
            "code": "",
            "physicalFileName": "Table Plan",
            "reportCategoryId": "3",
            "reportCategoryName": "Events",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "55",
        "attributes": {
            "name": "Contact",
            "description": "A list contains the contacts with frequent interactions along with some contact information",
            "active": true,
            "code": "",
            "physicalFileName": "Contact",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "56",
        "attributes": {
            "name": "Payments Received",
            "description": "Used by accountants to reconcile daily takimgs with bank statements",
            "active": true,
            "code": "",
            "physicalFileName": "Payments Received",
            "reportCategoryId": "2",
            "reportCategoryName": "Finance",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "57",
        "attributes": {
            "name": "Standard Invoice",
            "description": "Display the Invoice generated for a particular booking",
            "active": true,
            "code": "",
            "physicalFileName": "InvoiceWithTax",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "58",
        "attributes": {
            "name": "FunctionSheet",
            "description": "Display the Function Sheet (Itinerary and Deliverables[ Tasks and Q&A])",
            "active": true,
            "code": "",
            "physicalFileName": "FunctionSheet",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "59",
        "attributes": {
            "name": "Sales Pipeline",
            "description": "To get an overview of pending sales in the pipeline",
            "active": true,
            "code": "",
            "physicalFileName": "Sales Pipeline",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "60",
        "attributes": {
            "name": "Enquiry Conversion",
            "description": "To measure how many enquiries are converted into bookings by different comparisons",
            "active": true,
            "code": "",
            "physicalFileName": "Enquiry Conversion",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "61",
        "attributes": {
            "name": "Top Clients",
            "description": "A list clients ranked based on the revenue / estimated GP generated",
            "active": true,
            "code": "",
            "physicalFileName": "Top Clients",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "62",
        "attributes": {
            "name": "Venue Utilisation",
            "description": "To view which facilities are utilized fully and which are under utilized",
            "active": true,
            "code": "",
            "physicalFileName": "Venue Utilisation",
            "reportCategoryId": "3",
            "reportCategoryName": "Events",
            "customReport": false
        }
    },
    {
        "type": "report",
        "id": "65",
        "attributes": {
            "name": "Sales by Business Area and Event Date",
            "description": "A detail list contains sales information per business area and event along with a sales comparison on given sales periods",
            "active": true,
            "code": "",
            "physicalFileName": "Sales by Business Area and Event Date",
            "reportCategoryId": "1",
            "reportCategoryName": "Sales",
            "customReport": false
        }
    },
  ];

  public rd = [
    {
        "type": "parameterField",
        "id": "1",
        "attributes": {
            "name": "businessArea",
            "displayName": "Business Area",
            "dataType": "singleChoice",
            "dataTypeId": "1",
            "source": "...api/v4.1/products/business-areas",
            "sequence": "1",
            "advanced": false,
            "description": "test",
            "defaultvalue": "2",
            "lastUsedValue": "3"
        }
    },
    {
        "type": "parameterField",
        "id": "2",
        "attributes": {
            "name": "venue",
            "displayName": "Venue",
            "dataType": "singleChoice",
            "dataTypeId": "1",
            "source": "...api/v4.1/venues",
            "sequence": "2",
            "advanced": false,
            "description": "test",
            "defaultvalue": "370",
            "lastUsedValue": "371"
        }
    },
    {
        "type": "parameterField",
        "id": "3",
        "attributes": {
            "name": "bookingStartStatus",
            "displayName": "Booking Invoice Report",
            "dataType": "multipleChoice",
            "dataTypeId": "2",
            "source": "...api/v4.1/bookings/booking-statuses",
            "sequence": "3",
            "advanced": true,
            "description": "test",
            "defaultvalue": "57",
            "lastUsedValue": "80"
        }
    },
    {
        "type": "parameterField",
        "id": "4",
        "attributes": {
            "name": "bookingEndStatus",
            "displayName": "Booking End Status",
            "dataType": "multipleChoice",
            "dataTypeId": "2",
            "source": "...api/v4.1/bookings/booking-statuses",
            "sequence": "4",
            "advanced": true,
            "description": "test",
            "defaultvalue": "80",
            "lastUsedValue": "57"
        }
    },
    {
        "type": "parameterField",
        "id": "5",
        "attributes": {
            "name": "bookingStartDate",
            "displayName": "Booking Start Date",
            "dataType": "date",
            "dataTypeId": "3",
            "sequence": "5",
            "advanced": false,
            "description": "test",
            "defaultvalue": "2022-05-31T08:02:51.6027688+01:03",
            "lastUsedValue": "2022-05-31T08:02:51.6027688+01:03"
        }
    },
    {
        "type": "parameterField",
        "id": "6",
        "attributes": {
            "name": "BookingEndDate",
            "displayName": "Booking End Date",
            "dataType": "date",
            "dataTypeId": "3",
            "sequence": "6",
            "advanced": true,
            "description": "test",
            "defaultvalue": "2021-01-21T08:02:51.6027688+01:00",
            "lastUsedValue": "2022-05-31T08:02:51.6027688+01:00"
        }
    },
    {
        "type": "parameterField",
        "id": "7",
        "attributes": {
            "name": "staffMamber",
            "displayName": "Staff Member",
            "dataType": "string",
            "dataTypeId": "4",
            "source": "...api/v4.1/users",
            "sequence": "7",
            "advanced": true,
            "description": "test",
            "defaultvalue": "0",
            "lastUsedValue": "23"
        }
    },
    {
        "type": "parameterField",
        "id": "8",
        "attributes": {
            "name": "excludeIntermediateStatuses",
            "displayName": "Exclude Intermediate Statuses",
            "dataType": "boolean",
            "dataTypeId": "5",
            "sequence": "8",
            "advanced": false,
            "description": "test",
            "defaultvalue": "",
            "lastUsedValue": true
        }
    },
    {
        "type": "parameterField",
        "id": "9",
        "attributes": {
            "name": "excludeIntermediateStatuses",
            "displayName": "Booking Start Time",
            "dataType": "time",
            "dataTypeId": "5",
            "sequence": "8",
            "advanced": false,
            "description": "test",
            "defaultvalue": "11:10",
            "lastUsedValue": '15:10'
        }
    },
    {
        "type": "parameterField",
        "id": "10",
        "attributes": {
            "name": "excludeIntermediateStatuses",
            "displayName": "Booking End Time",
            "dataType": "time",
            "dataTypeId": "5",
            "sequence": "8",
            "advanced": false,
            "description": "test",
            "defaultvalue": "10:35",
            "lastUsedValue": "14:35"
        }
    }
  ]

  constructor() { }
}
