import "reflect-metadata";
import { CardComProvider } from "./provider.js";
export * from "./provider.js";
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
        this.provider = new CardComProvider();
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
export function getCardComProvider() {
    if (!cardComProvider) {
        throw new Error("❌ CardCom Plugin is not initialized. Use createPlugin() first.");
    }
    return cardComProvider;
}
export { CardComProvider };
export default function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map