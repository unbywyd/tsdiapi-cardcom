import axios from "axios";
export class CardComProvider {
    http;
    config;
    ctx;
    logger;
    constructor() { }
    init(config, ctx) {
        if (!config.apiUrl || !config.terminalId || !config.apiName || !config.apiPassword) {
            throw new Error("❌ CardCom API configuration is missing required fields.");
        }
        this.config = config;
        this.ctx = ctx;
        this.logger = ctx.fastify.log;
        this.http = axios.create({
            baseURL: config.apiUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
    async getAccountInfoById(accountId) {
        try {
            const payload = {
                ApiName: this.config.apiName,
                ApiPassword: this.config.apiPassword,
                AccountId: accountId,
            };
            const response = await this.http.post(`/Account/GetByAccountId`, payload);
            return response.data;
        }
        catch (error) {
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
    async listTransactions(fromDate, toDate, page, pageSize, tranStatus = "Success", limitForTerminal) {
        try {
            const payload = {
                ApiName: this.config.apiName,
                ApiPassword: this.config.apiPassword,
                FromDate: fromDate,
                ToDate: toDate,
                TranStatus: tranStatus,
                Page: page,
                Page_size: pageSize,
                LimitForTerminal: limitForTerminal ?? null
            };
            const response = await this.http.post(`/Transactions/ListTransactions`, payload);
            return response.data;
        }
        catch (error) {
            this.logger.error("❌ CardCom List Transactions Error:", error);
            return null;
        }
    }
    async getLowProfileResult(lowProfileId) {
        try {
            const payload = {
                TerminalNumber: parseInt(this.config.terminalId),
                ApiName: this.config.apiName,
                LowProfileId: lowProfileId,
            };
            const response = await this.http.post(`/LowProfile/GetLpResult`, payload);
            return response.data;
        }
        catch (error) {
            this.logger.error("❌ CardCom Get Low Profile Result Error:", error);
            return null;
        }
    }
    /**
     * Fetches transaction details by its InternalDealNumber.
     * @param internalDealNumber The transaction ID to search.
     */
    async getTransactionById(internalDealNumber) {
        try {
            const payload = {
                TerminalNumber: parseInt(this.config.terminalId),
                UserName: this.config.apiName,
                UserPassword: this.config.apiPassword,
                InternalDealNumber: internalDealNumber
            };
            const response = await this.http.post(`/Transactions/GetTransactionInfoById`, payload);
            return response.data;
        }
        catch (error) {
            this.logger.error("❌ CardCom Get Transaction Info Error:", error);
            return null;
        }
    }
    /**
        * Executes a transaction via CardCom API
        * @param transactionRequest Transaction request payload
        * @returns Transaction response data
        */
    async doTransaction(transactionRequest) {
        try {
            const response = await this.http.post(`/Transactions/Transaction`, transactionRequest);
            return response.data;
        }
        catch (error) {
            this.logger.error("❌ CardCom Do Transaction Error:", error);
            return null;
        }
    }
    /**
     * Refunds a payment transaction.
     * @param transactionId The transaction ID to refund.
     * @param options Optional parameters for partial refunds, multiple refunds, etc.
     */
    async refundTransaction(transactionId, options) {
        try {
            const payload = {
                ApiName: this.config.apiName,
                ApiPassword: this.config.apiPassword,
                TransactionId: transactionId,
                ...options
            };
            const response = await this.http.post(`/Transactions/RefundByTransactionId`, payload);
            return response.data;
        }
        catch (error) {
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
    async authorizePayment(amount, token, cardExpirationMMYY) {
        try {
            const response = await this.http.post(`/Transactions/Transaction`, {
                TerminalNumber: this.config.terminalId,
                ApiName: this.config.apiName,
                Amount: amount,
                Token: token,
                CardExpirationMMYY: cardExpirationMMYY,
                Advanced: {
                    JValidateType: 5,
                    ApiPassword: this.config.apiPassword,
                },
            });
            return response.data;
        }
        catch (error) {
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
    async chargePayment(amount, token, cardExpirationMMYY, approvalNumber, clientData) {
        try {
            const payload = {
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
            const response = await this.http.post(`/Transactions/Transaction`, payload);
            return response.data;
        }
        catch (error) {
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
    async checkCard(amount, token, cardExpirationMMYY) {
        try {
            const response = await this.http.post(`/Transactions/Transaction`, {
                TerminalNumber: this.config.terminalId,
                ApiName: this.config.apiName,
                Amount: amount,
                Token: token,
                CardExpirationMMYY: cardExpirationMMYY,
                Advanced: {
                    JValidateType: 2,
                    ApiPassword: this.config.apiPassword,
                },
            });
            return response.data;
        }
        catch (error) {
            this.logger.error("❌ CardCom Check Card Error:", error);
            return null;
        }
    }
    /**
     * Initiates a new card registration process.
     */
    async requestNewCard(requestId) {
        try {
            const _requestId = requestId || 'req_' + Math.floor(Math.random() * 1000000);
            const webhookUrl = this.config.webHookUrl?.endsWith("/") ? this.config.webHookUrl : this.config.webHookUrl + "/";
            const response = await this.http.post(`/LowProfile/Create`, {
                SuccessRedirectUrl: this.config.successRedirectUrl,
                FailedRedirectUrl: this.config.failedRedirectUrl,
                WebHookUrl: webhookUrl + _requestId,
                TerminalNumber: this.config.terminalId,
                ApiName: this.config.apiName,
                Operation: "CreateTokenOnly",
                Amount: 1,
            });
            return response.data;
        }
        catch (error) {
            this.logger.error("❌ CardCom Request New Card Error:", error);
            return null;
        }
    }
}
//# sourceMappingURL=provider.js.map