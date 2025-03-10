import { AppContext } from "@tsdiapi/server";
import { PluginOptions } from "./index.js";
export interface CardComBaseResponse {
    ResponseCode: number;
    Description: string;
}
export interface CardComCustomField {
    Id: number;
    Value: string;
}
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
    CreateDate: string;
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
export interface CardComTransactionResponse extends CardComTransactionInfo {
}
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
export interface CardComGetLowProfileResultRequest {
    TerminalNumber: number;
    ApiName: string;
    LowProfileId: string;
}
export interface CardComTokenInfo {
    Token: string;
    TokenExDate: string;
    CardYear: number;
    CardMonth: number;
    TokenApprovalNumber: string;
    CardOwnerIdentityNumber: string;
}
export interface CardComSuspendedInfo {
    SuspendedDealId: number;
}
export interface CardComDocumentInfo {
    ResponseCode: number;
    Description: string;
    DocumentType: string;
    DocumentNumber: number;
    AccountId: number;
    ForeignAccountNumber?: string | null;
    SiteUniqueId?: string | null;
    DocumentUrl?: string | null;
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
export interface CardComCreateIframeResponse extends CardComBaseResponse {
    LowProfileId: string;
    Url: string;
    UrlToPayPal: string;
    UrlToBit: string;
}
export interface CardComListTransactionsResponse extends CardComBaseResponse {
    Tranzactions: CardComTransactionInfo[] | null;
    Page: number;
    Page_size: number;
}
export interface CardComListTransactionsRequest {
    ApiName: string;
    ApiPassword: string;
    FromDate: string;
    ToDate: string;
    TranStatus?: "Success" | "Pending" | "Failed" | "Refunded" | "Cancelled";
    Page: number;
    Page_size: number;
    LimitForTerminal?: number | null;
}
export interface CardComTransactionInfoResponse extends CardComBaseResponse {
    NewTranzactionId?: number | null;
}
export interface CardComTransactionInfoRequest {
    TerminalNumber: number;
    UserName: string;
    UserPassword: string;
    InternalDealNumber: number;
}
export declare class CardComProvider {
    private http;
    private config;
    private logger;
    constructor();
    init(config: PluginOptions, logger: AppContext["logger"]): void;
    getAccountInfoById(accountId: number): Promise<CardComGetAccountResponse | null>;
    /**
   * Fetches a list of transactions based on date range.
   * @param fromDate Start date (format: DDMMYYYY)
   * @param toDate End date (format: DDMMYYYY)
   * @param page Page number (starting from 1)
   * @param pageSize Number of transactions per page (10 - 2000)
   * @param tranStatus (Optional) Transaction status filter, default is "Success"
   * @param limitForTerminal (Optional) Restrict transactions to a specific terminal
   */
    listTransactions(fromDate: string, toDate: string, page: number, pageSize: number, tranStatus?: "Success" | "Pending" | "Failed" | "Refunded" | "Cancelled", limitForTerminal?: number): Promise<CardComListTransactionsResponse | null>;
    getLowProfileResult(lowProfileId: string): Promise<CardComGetLowProfileResultResponse | null>;
    /**
     * Fetches transaction details by its InternalDealNumber.
     * @param internalDealNumber The transaction ID to search.
     */
    getTransactionById(internalDealNumber: number): Promise<CardComTransactionInfoResponse | null>;
    /**
        * Executes a transaction via CardCom API
        * @param transactionRequest Transaction request payload
        * @returns Transaction response data
        */
    doTransaction(transactionRequest: CardComTransactionRequest): Promise<CardComTransactionResponse | null>;
    /**
     * Refunds a payment transaction.
     * @param transactionId The transaction ID to refund.
     * @param options Optional parameters for partial refunds, multiple refunds, etc.
     */
    refundTransaction(transactionId: number, options?: Partial<Omit<CardComRefundRequest, "ApiName" | "ApiPassword" | "TransactionId">>): Promise<CardComRefundResponse | null>;
    /**
     * Authorizes a payment transaction.
     * @param amount Payment amount.
     * @param token Card token.
     * @param cardExpirationMMYY Card expiration date in MMYY format.
     */
    authorizePayment(amount: number, token: string, cardExpirationMMYY: string): Promise<CardComTransactionResponse | null>;
    /**
     * Charges a previously authorized payment.
     * @param amount Payment amount.
     * @param token Card token.
     * @param cardExpirationMMYY Card expiration date in MMYY format.
     * @param approvalNumber Approval number from the authorization step.
     * @param clientData Optional client data for invoice generation.
     */
    chargePayment(amount: number, token: string, cardExpirationMMYY: string, approvalNumber: string, clientData?: {
        name: string;
        email: string;
        mobile: string;
        productDescription: string;
    }): Promise<CardComTransactionResponse>;
    /**
     * Checks if a card is valid for the given amount.
     * @param amount Amount to check.
     * @param token Card token.
     * @param cardExpirationMMYY Card expiration date in MMYY format.
     */
    checkCard(amount: number, token: string, cardExpirationMMYY: string): Promise<CardComTransactionResponse>;
    /**
     * Initiates a new card registration process.
     */
    requestNewCard(requestId?: string | number): Promise<CardComCreateIframeResponse>;
}
//# sourceMappingURL=provider.d.ts.map