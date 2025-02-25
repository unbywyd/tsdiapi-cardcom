import axios, { AxiosInstance } from "axios";
import { PluginOptions } from ".";
import { AppContext } from "@tsdiapi/server";

// ========================== BASE RESPONSE ==========================
export interface CardComBaseResponse {
    ResponseCode: number;
    Description: string;
}

export interface CardComCustomField {
    Id: number;
    Value: string;
}

// ========================== ACCOUNT REQUEST & RESPONSE ==========================

export interface CardComGetAccountRequest {
    ApiName: string;
    ApiPassword: string;
    AccountId: number;
}

export interface CardComAccountInfo {
    AccountId: number;
    AccountName: string;
    Email?: string | null;
    Phone?: string | null;
    Address?: string | null;
    City?: string | null;
    ZipCode?: string | null;
    Country?: string | null;
}

export interface CardComGetAccountResponse extends CardComBaseResponse {
    Account?: CardComAccountInfo | null;
}

// ========================== TRANSACTION REQUEST & RESPONSE ==========================

export interface CardComTransactionRequest {
    TerminalNumber: number;
    ApiName: string;
    Amount: number;
    CardNumber?: string | null;
    Token?: string | null;
    CardExpirationMMYY?: string | null;
    CVV2?: string | null;
    ExternalUniqTranId?: string | null;
    ExternalUniqUniqTranIdResponse?: boolean | null;
    NumOfPayments?: number;
    CardOwnerInformation?: {
        Phone?: string;
        FullName?: string;
        IdentityNumber?: string;
        CardOwnerEmail?: string;
        AvsZip?: string;
        AvsAddress?: string;
        AvsCity?: string;
    } | null;
    ISOCoinId?: number | null;
    CustomFields?: CardComCustomField[] | null;
    Advanced?: {
        ApiPassword: string;
        IsRefund?: boolean;
        ISOCoinName?: string;
        JValidateType?: number;
        SapakMutav?: string;
        CreditType?: number;
        MTI?: number;
        AccountIdToGetCardNumber?: number;
        ApprovalNumber?: string;
        FirstPayment?: number;
        ConstPayment?: number;
        IsAutoRecurringPayment?: boolean;
        IsCreateToken?: boolean;
        SendNote?: boolean;
    } | null;
    Document?: {
        DocumentTypeToCreate?: "Auto" | string;
        Name?: string;
        TaxId?: string;
        Email?: string;
        IsSendByEmail?: boolean;
        AddressLine1?: string;
        AddressLine2?: string;
        City?: string;
        Mobile?: string;
        Phone?: string;
        Comments?: string;
        IsVatFree?: boolean;
        DepartmentId?: number;
        AdvancedDefinition?: {
            IsAutoCreateUpdateAccount?: "auto" | string;
            AccountForeignKey?: string;
            SiteUniqueId?: string;
            AccountID?: number;
            IsLoadInfoFromAccountID?: boolean;
        };
        Products?: {
            ProductID?: string;
            Description: string;
            Quantity: number;
            UnitCost: number;
            TotalLineCost?: number;
            IsVatFree?: boolean;
        }[];
        ExternalId?: string;
        ManualNumber?: string;
        DocumentDateDDMMYYYY?: string;
        ValueDate?: string;
        Language?: string;
        IsSendSMS?: boolean;
    } | null;
}

export interface CardComTransactionInfo extends CardComBaseResponse {
    TranzactionId: number;
    TerminalNumber: number;
    Amount: number;
    CoinId: number;
    CouponNumber?: string;
    CreateDate: string; // ISO Date string
    Last4CardDigits?: number;
    Last4CardDigitsString?: string;
    FirstCardDigits?: number;
    JParameter?: string;
    CardMonth: number;
    CardYear: number;
    ApprovalNumber?: string;
    FirstPaymentAmount?: number;
    ConstPaymentAmount?: number;
    NumberOfPayments?: number;
    CardInfo: "Israeli" | "NonIsraeli" | "FuelCard" | "ImmediateChargeCard" | "GiftCard";
    CardOwnerName?: string;
    CardOwnerPhone?: string;
    CardOwnerEmail?: string;
    CardOwnerIdentityNumber?: string;
    Token?: string;
    CardName?: string;
    SapakMutav?: string;
    Uid?: string;
    ConcentrationNumber?: string;
    DocumentNumber?: number;
    DocumentType?: string;
    Rrn?: string;
    Brand: "PrivateCard" | "MasterCard" | "Visa" | "Maestro" | "AmericanExpress" | "Isracard" | "JBC" | "Discover" | "Diners";
    Acquire: "Unknown" | "Isracard" | "CAL" | "Diners" | "AmericanExpress" | "Laumicard" | "CardCom" | "PayPal" | "Upay" | "PayMe";
    Issuer: "NonIsrael" | "Isracard" | "CAL" | "Diners" | "AmericanExpress" | "JCB" | "Laumicard";
    PaymentType: string;
    CardNumberEntryMode: string;
    DealType: string;
    IsRefund: boolean;
    DocumentUrl?: string;
    CustomFields?: CardComCustomField[];
    IsAbroadCard: boolean;
}

export interface CardComTransactionResponse extends CardComTransactionInfo { }

// ========================== REFUND REQUEST & RESPONSE ==========================

export interface CardComRefundRequest {
    ApiName: string;
    ApiPassword: string;
    TransactionId: number;
    PartialSum?: number | null;
    CancelOnly?: boolean | null;
    SapakMutav?: string | null;
    AllowMultipleRefunds?: boolean | null;
    CustomFields?: CardComCustomField[] | null;
}

export interface CardComRefundResponse extends Pick<CardComBaseResponse, "ResponseCode" | "Description"> {
    NewTranzactionId?: number | null;
}

// ========================== LOW PROFILE REQUEST & RESPONSE ==========================

export interface CardComGetLowProfileResultRequest {
    TerminalNumber: number;
    ApiName: string;
    LowProfileId: string;
}

export interface CardComTokenInfo {
    Token: string; // Credit card token for future charges (GUID format)
    TokenExDate: string; // Expiration date of the token in 'yyyyMMdd' format
    CardYear: number; // Year of the credit card expiration (int32)
    CardMonth: number; // Month of the credit card expiration (int32)
    TokenApprovalNumber: string; // Issuer approval number for capture operation
    CardOwnerIdentityNumber: string; // Identity number of the card owner
}

export interface CardComSuspendedInfo {
    SuspendedDealId: number; // Unique deal ID in the CardCom system
}

export interface CardComDocumentInfo {
    ResponseCode: number; // If equal to zero, then success
    Description: string; // Description of the response
    DocumentType: string; // Type of the document created
    DocumentNumber: number; // Unique number for this document type
    AccountId: number; // Unique account ID in the CardCom system
    ForeignAccountNumber?: string | null; // Optional foreign account number
    SiteUniqueId?: string | null; // Optional unique site ID
    DocumentUrl?: string | null; // URL to access the document
}

export interface CardComGetLowProfileResultResponse extends CardComBaseResponse {
    TerminalNumber: number;
    LowProfileId: string;
    TranzactionId?: number;
    ReturnValue?: string;
    Operation?: string;
    UIValues?: Record<string, any>;
    DocumentInfo?: CardComDocumentInfo | null;
    TokenInfo?: CardComTokenInfo | null;
    SuspendedInfo?: CardComSuspendedInfo | null;
    TranzactionInfo?: CardComTransactionInfo | null;
}

// ========================== CREATE IFRAME REQUEST & RESPONSE ==========================

export interface CardComCreateIframeResponse extends CardComBaseResponse {
    LowProfileId: string;
    Url: string;
    UrlToPayPal: string;
    UrlToBit: string;
}

// ========================== LIST TRANSACTIONS REQUEST & RESPONSE ==========================
export interface CardComListTransactionsResponse extends CardComBaseResponse {
    Tranzactions: CardComTransactionInfo[] | null; // List of transactions (or null if none)
    Page: number; // Current page
    Page_size: number; // Page size
}
export interface CardComListTransactionsRequest {
    ApiName: string; // API name for authentication
    ApiPassword: string; // API password for authentication
    FromDate: string; // Start date in DDMMYYYY format
    ToDate: string; // End date in DDMMYYYY format
    TranStatus?: "Success" | "Pending" | "Failed" | "Refunded" | "Cancelled"; // Transaction status (default is "Success")
    Page: number; // Page number (starting from 1)
    Page_size: number; // Page size (10 - 2000)
    LimitForTerminal?: number | null; // Filter by terminal (if applicable)
}

export interface CardComTransactionInfoResponse extends CardComBaseResponse {
    NewTranzactionId?: number | null; // ID of the new transaction (if applicable to refund)
}

export interface CardComTransactionInfoRequest {
    TerminalNumber: number; // Terminal number for authentication
    UserName: string; // API username for authentication
    UserPassword: string; // API password for authentication
    InternalDealNumber: number; // Internal deal number for search
}

export class CardComProvider {
    private http: AxiosInstance;
    private config: PluginOptions;
    private logger: AppContext["logger"];

    constructor() { }

    init(config: PluginOptions, logger: AppContext["logger"]) {
        if (!config.apiUrl || !config.terminalId || !config.apiName || !config.apiPassword) {
            throw new Error("❌ CardCom API configuration is missing required fields.");
        }

        this.config = config;
        this.logger = logger;
        this.http = axios.create({
            baseURL: config.apiUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });

        logger.info("✅ CardCom Provider initialized.");
    }

    async getAccountInfoById(accountId: number): Promise<CardComGetAccountResponse | null> {
        try {
            const payload: CardComGetAccountRequest = {
                ApiName: this.config.apiName,
                ApiPassword: this.config.apiPassword,
                AccountId: accountId,
            };

            const response = await this.http.post<CardComGetAccountResponse>(
                `/Account/GetByAccountId`,
                payload
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Get Account Info Error:", error);
            return null;
        }
    }


    /**
   * Fetches a list of transactions based on date range.
   * @param fromDate Start date (format: DDMMYYYY)
   * @param toDate End date (format: DDMMYYYY)
   * @param page Page number (starting from 1)
   * @param pageSize Number of transactions per page (10 - 2000)
   * @param tranStatus (Optional) Transaction status filter, default is "Success"
   * @param limitForTerminal (Optional) Restrict transactions to a specific terminal
   */
    async listTransactions(
        fromDate: string,
        toDate: string,
        page: number,
        pageSize: number,
        tranStatus: "Success" | "Pending" | "Failed" | "Refunded" | "Cancelled" = "Success",
        limitForTerminal?: number
    ): Promise<CardComListTransactionsResponse | null> {
        try {
            const payload: CardComListTransactionsRequest = {
                ApiName: this.config.apiName,
                ApiPassword: this.config.apiPassword,
                FromDate: fromDate,
                ToDate: toDate,
                TranStatus: tranStatus,
                Page: page,
                Page_size: pageSize,
                LimitForTerminal: limitForTerminal ?? null
            };

            const response = await this.http.post<CardComListTransactionsResponse>(
                `/Transactions/ListTransactions`,
                payload
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom List Transactions Error:", error);
            return null;
        }
    }

    async getLowProfileResult(lowProfileId: string): Promise<CardComGetLowProfileResultResponse | null> {
        try {
            const payload: CardComGetLowProfileResultRequest = {
                TerminalNumber: parseInt(this.config.terminalId),
                ApiName: this.config.apiName,
                LowProfileId: lowProfileId,
            };

            const response = await this.http.post<CardComGetLowProfileResultResponse>(
                `/LowProfile/GetLpResult`,
                payload
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Get Low Profile Result Error:", error);
            return null;
        }
    }


    /**
     * Fetches transaction details by its InternalDealNumber.
     * @param internalDealNumber The transaction ID to search.
     */
    async getTransactionById(internalDealNumber: number): Promise<CardComTransactionInfoResponse | null> {
        try {
            const payload: CardComTransactionInfoRequest = {
                TerminalNumber: parseInt(this.config.terminalId),
                UserName: this.config.apiName,
                UserPassword: this.config.apiPassword,
                InternalDealNumber: internalDealNumber
            };

            const response = await this.http.post<CardComTransactionInfoResponse>(
                `/Transactions/GetTransactionInfoById`,
                payload
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Get Transaction Info Error:", error);
            return null;
        }
    }


    /**
        * Executes a transaction via CardCom API
        * @param transactionRequest Transaction request payload
        * @returns Transaction response data
        */
    async doTransaction(transactionRequest: CardComTransactionRequest): Promise<CardComTransactionResponse | null> {
        try {
            const response = await this.http.post<CardComTransactionResponse>(
                `/Transactions/Transaction`,
                transactionRequest
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Do Transaction Error:", error);
            return null;
        }
    }


    /**
     * Refunds a payment transaction.
     * @param transactionId The transaction ID to refund.
     * @param options Optional parameters for partial refunds, multiple refunds, etc.
     */
    async refundTransaction(
        transactionId: number,
        options?: Partial<Omit<CardComRefundRequest, "ApiName" | "ApiPassword" | "TransactionId">>
    ): Promise<CardComRefundResponse | null> {
        try {
            const payload: CardComRefundRequest = {
                ApiName: this.config.apiName,
                ApiPassword: this.config.apiPassword,
                TransactionId: transactionId,
                ...options
            };

            const response = await this.http.post<CardComRefundResponse>(
                `/Transactions/RefundByTransactionId`,
                payload
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Refund Transaction Error:", error);
            return null;
        }
    }




    /**
     * Authorizes a payment transaction.
     * @param amount Payment amount.
     * @param token Card token.
     * @param cardExpirationMMYY Card expiration date in MMYY format.
     */
    async authorizePayment(amount: number, token: string, cardExpirationMMYY: string): Promise<CardComTransactionResponse | null> {
        try {
            const response = await this.http.post<CardComTransactionResponse>(
                `/Transactions/Transaction`,
                {
                    TerminalNumber: this.config.terminalId,
                    ApiName: this.config.apiName,
                    Amount: amount,
                    Token: token,
                    CardExpirationMMYY: cardExpirationMMYY,
                    Advanced: {
                        JValidateType: 5,
                        ApiPassword: this.config.apiPassword,
                    },
                }
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Authorize Payment Error:", error);
            return null;
        }
    }

    /**
     * Charges a previously authorized payment.
     * @param amount Payment amount.
     * @param token Card token.
     * @param cardExpirationMMYY Card expiration date in MMYY format.
     * @param approvalNumber Approval number from the authorization step.
     * @param clientData Optional client data for invoice generation.
     */
    async chargePayment(
        amount: number,
        token: string,
        cardExpirationMMYY: string,
        approvalNumber: string,
        clientData?: { name: string; email: string; mobile: string; productDescription: string }
    ): Promise<CardComTransactionResponse> {
        try {
            const payload: any = {
                TerminalNumber: this.config.terminalId,
                ApiName: this.config.apiName,
                Amount: amount,
                Token: token,
                CardExpirationMMYY: cardExpirationMMYY,
                Advanced: {
                    ApprovalNumber: approvalNumber,
                    ApiPassword: this.config.apiPassword,
                },
            };

            if (clientData && clientData.email) {
                payload.Document = {
                    Name: clientData.name,
                    Email: clientData.email,
                    Mobile: clientData.mobile,
                    IsVatFree: false,
                    Products: [
                        {
                            Description: clientData.productDescription,
                            UnitCost: amount,
                        },
                    ],
                };
            }

            const response = await this.http.post<CardComTransactionResponse>(
                `/Transactions/Transaction`,
                payload
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Charge Payment Error:", error);
            return null;
        }
    }

    /**
     * Checks if a card is valid for the given amount.
     * @param amount Amount to check.
     * @param token Card token.
     * @param cardExpirationMMYY Card expiration date in MMYY format.
     */
    async checkCard(amount: number, token: string, cardExpirationMMYY: string): Promise<CardComTransactionResponse> {
        try {
            const response = await this.http.post<CardComTransactionResponse>(
                `/Transactions/Transaction`,
                {
                    TerminalNumber: this.config.terminalId,
                    ApiName: this.config.apiName,
                    Amount: amount,
                    Token: token,
                    CardExpirationMMYY: cardExpirationMMYY,
                    Advanced: {
                        JValidateType: 2,
                        ApiPassword: this.config.apiPassword,
                    },
                }
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Check Card Error:", error);
            return null;
        }
    }

    /**
     * Initiates a new card registration process.
     */
    async requestNewCard(requestId?: string | number): Promise<CardComCreateIframeResponse> {
        try {
            const _requestId = requestId || 'req_' + Math.floor(Math.random() * 1000000);
            const webhookUrl = this.config.webHookUrl?.endsWith("/") ? this.config.webHookUrl : this.config.webHookUrl + "/";
            const response = await this.http.post<CardComCreateIframeResponse>(
                `/LowProfile/Create`,
                {
                    SuccessRedirectUrl: this.config.successRedirectUrl,
                    FailedRedirectUrl: this.config.failedRedirectUrl,
                    WebHookUrl: webhookUrl + _requestId,
                    TerminalNumber: this.config.terminalId,
                    ApiName: this.config.apiName,
                    Operation: "CreateTokenOnly",
                    Amount: 1,
                }
            );

            return response.data;
        } catch (error) {
            this.logger.error("❌ CardCom Request New Card Error:", error);
            return null;
        }
    }
}
