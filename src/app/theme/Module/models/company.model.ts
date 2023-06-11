export class Company {
    constructor() {
        let obj = new AdmCompanyLocation();
        this.adm_company_location.push(obj);
    }
    ID: number;
    CompanyName: string;
    CompanyTypeID: number;
    CompanyAddress1: string;
    CompanyAddress2: string;
    CompanyToken: string;
    CityDropDownId: number;
    Province: string;
    PostalCode: string;
    Phone: string;
    Fax: string;
    Website: string;
    LanguageID: number;
    GenderID: number;
    ContactPersonFirstName: string;
    ContactPersonLastName: string;
    Email: string;
    CompanyLogo: string;
    IsShowBillReceptionist: boolean = false;
    IsBackDatedAppointment: boolean = false;
    IsUpdateBillDate: boolean = false;
    TotalEmployeeID: string;
    IsCNICMandatory: boolean = false;
    DateFormatId: number;
    ReceiptFooter: string;
    WDMonday: boolean;
    WDTuesday: boolean;
    WDWednesday: boolean;
    WDThursday: boolean;
    WDFriday: boolean;
    WDSatuday: boolean;
    WDSunday: boolean;
    adm_company_location: Array<AdmCompanyLocation> = [];
}
export class AdmCompanyLocation {
    ID: number = 0;
    CompanyID: number = 0;
    LocationName: string;
    Address: string;
    CountryID: number = 0
    CityID: number = 0;
    ZipCode: string = "";
}