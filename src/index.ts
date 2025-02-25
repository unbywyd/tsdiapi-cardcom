import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { CardComProvider } from "./provider";
export * from "./provider";
let cardComProvider: CardComProvider | null = null;

export type PluginOptions = {
    apiUrl: string;
    terminalId: string;
    apiName: string;
    apiPassword: string;
    successRedirectUrl: string;
    failedRedirectUrl: string;
    webHookUrl: string;
};

const defaultConfig: PluginOptions = {
    apiUrl: "https://secure.cardcom.solutions/api/v11",
    terminalId: "",
    apiName: "",
    apiPassword: "",
    successRedirectUrl: "",
    failedRedirectUrl: "",
    webHookUrl: "",
};

class App implements AppPlugin {
    name = "tsdiapi-cardcom";
    config: PluginOptions;
    context: AppContext;
    provider: CardComProvider;

    constructor(config?: PluginOptions) {
        this.config = { ...defaultConfig, ...config };
        this.provider = new CardComProvider();
    }

    async onInit(ctx: AppContext) {
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

export function getCardComProvider(): CardComProvider {
    if (!cardComProvider) {
        throw new Error("❌ CardCom Plugin is not initialized. Use createPlugin() first.");
    }
    return cardComProvider;
}

export { CardComProvider };

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}
