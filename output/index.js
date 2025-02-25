"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardComProvider = void 0;
exports.getCardComProvider = getCardComProvider;
exports.default = createPlugin;
require("reflect-metadata");
const provider_1 = require("./provider");
Object.defineProperty(exports, "CardComProvider", { enumerable: true, get: function () { return provider_1.CardComProvider; } });
__exportStar(require("./provider"), exports);
let cardComProvider = null;
const defaultConfig = {
    apiUrl: "https://secure.cardcom.solutions/api/v11",
    terminalId: "",
    apiName: "",
    apiPassword: "",
    successRedirectUrl: "",
    failedRedirectUrl: "",
    webHookUrl: "",
};
class App {
    name = "tsdiapi-cardcom";
    config;
    context;
    provider;
    constructor(config) {
        this.config = { ...defaultConfig, ...config };
        this.provider = new provider_1.CardComProvider();
    }
    async onInit(ctx) {
        if (cardComProvider) {
            ctx.logger.warn("🚨 CardCom Plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const appConfig = ctx.config.appConfig || {};
        this.config.apiUrl = this.config.apiUrl || appConfig["CARDCOM_API_URL"];
        this.config.terminalId = this.config.terminalId || appConfig["CARDCOM_TERMINAL_ID"];
        this.config.apiName = this.config.apiName || appConfig["CARDCOM_API_NAME"];
        this.config.apiPassword = this.config.apiPassword || appConfig["CARDCOM_API_PASSWORD"];
        this.config.successRedirectUrl = this.config.successRedirectUrl || appConfig["CARDCOM_SUCCESS_REDIRECT_URL"];
        this.config.failedRedirectUrl = this.config.failedRedirectUrl || appConfig["CARDCOM_FAILED_REDIRECT_URL"];
        this.config.webHookUrl = this.config.webHookUrl || appConfig["CARDCOM_WEBHOOK_URL"];
        if (!this.config.terminalId || !this.config.apiName || !this.config.apiPassword) {
            throw new Error("❌ CardCom Plugin is missing required credentials.");
        }
        this.provider.init(this.config, ctx.logger);
        cardComProvider = this.provider;
        ctx.logger.info("✅ CardCom Plugin initialized.");
    }
}
function getCardComProvider() {
    if (!cardComProvider) {
        throw new Error("❌ CardCom Plugin is not initialized. Use createPlugin() first.");
    }
    return cardComProvider;
}
function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map