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
            ctx.fastify.log.warn("🚨 CardCom Plugin is already initialized. Skipping re-initialization.");
            return;
        }
        this.context = ctx;
        const config = ctx.projectConfig;
        this.config.apiUrl = config.get("CARDCOM_API_URL", this.config.apiUrl);
        this.config.terminalId = config.get("CARDCOM_TERMINAL_ID", this.config.terminalId);
        this.config.apiName = config.get("CARDCOM_API_NAME", this.config.apiName);
        this.config.apiPassword = config.get("CARDCOM_API_PASSWORD", this.config.apiPassword);
        this.config.successRedirectUrl = config.get("CARDCOM_SUCCESS_REDIRECT_URL", this.config.successRedirectUrl);
        this.config.failedRedirectUrl = config.get("CARDCOM_FAILED_REDIRECT_URL", this.config.failedRedirectUrl);
        this.config.webHookUrl = config.get("CARDCOM_WEBHOOK_URL", this.config.webHookUrl);
        if (!this.config.terminalId || !this.config.apiName || !this.config.apiPassword) {
            throw new Error("❌ CardCom Plugin is missing required credentials.");
        }
        this.provider.init(this.config, ctx);
        cardComProvider = this.provider;
        ctx.fastify.decorate("cardcom", this.provider);
    }
}
export function useCardcomProvider() {
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