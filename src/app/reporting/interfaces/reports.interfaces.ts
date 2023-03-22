interface IBasicObject {
    id: string,
    type: string;
}

export interface IHttpParamData {
    key: string;
    value: string;
}

export interface IUserOverride {
    Username: string;
    Password: string;
    apiID: string;
}

export interface I2FAuthenticationData {
    'APId': string;
    '2FACode': string;
}

export interface IFilter {
    searchText?: string;
    filter?: any;
    reportCategoryId?: string;
}

export interface ICannedReportFavorite {
    data: {
        id: string;
        type: string;
        attributes: {
            favorite: boolean;
        };
    }
}

export interface IReportResponse {
    data?: IReportCategory[];
}

export interface IReportCategory extends IBasicObject {
    attributes?: {
        name: string;
        insertedUser: string;
        insertedTime: string;
    }
}

export interface IReport extends IBasicObject {
    attributes?: {
        favorite?: boolean;
        lastViewedTime?: string;
        active?: boolean;
        code?: string;
        customReport?: boolean;
        description?: string;
        category?: string;
        name?: string;
        physicalFileName?: string;
        reportCategoryId?: string;
        reportCategoryName?: string;
        thumbnailURL?: string;
        managerApprovalRequired?: boolean;
        SendManagerNotification?: boolean;
        "2FARequired"?: boolean;
    }
}

export interface IFilterPreference extends IBasicObject {
    attributes?: {
        advanced: boolean;
    }
}

export interface IBussinessArea extends IBasicObject {
    attributes?: {
        name?: string;
        auditInfo?: {
            insertedUser?: string;
            insertedTime?: string;
        }
    }
}

export interface IIncludedReportDetail extends IBasicObject {
    attributes: {
        name?: string;
        displayName?: string;
        dataType?: string;
        dataTypeId?: string;
        source?: string;
        sequence?: string;
        advanced?: boolean;
        description?: string;
        defaultvalue?: string | number | boolean;
        lastUsedValue?: string | number | boolean;
    }
}

export interface ICategorySearch {
    reportCategoryId: string;
    reportCategoryName: string;
}