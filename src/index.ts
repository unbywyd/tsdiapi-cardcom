import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { CardComProvider } from "./provider.js";
export * from "./provider.js";
import type { FastifyInstance } from 'fastify';
declare module "fastify" {
    interface FastifyInstance {
        cardcom: CardComProvider;
    }
}

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
            ctx.fastify.log.warn("🚨 CardCom Plugin is already initialized. Skipping re-initialization.");
            return;
        }

        this.context = ctx;
        const config = ctx.projectConfig;

        this.config.apiUrl = config.get("CARDCOM_API_URL", this.config.apiUrl) as string;
        this.config.terminalId = config.get("CARDCOM_TERMINAL_ID", this.config.terminalId) as string;
        this.config.apiName = config.get("CARDCOM_API_NAME", this.config.apiName) as string;
        this.config.apiPassword = config.get("CARDCOM_API_PASSWORD", this.config.apiPassword) as string;
        this.config.successRedirectUrl = config.get("CARDCOM_SUCCESS_REDIRECT_URL", this.config.successRedirectUrl) as string;
        this.config.failedRedirectUrl = config.get("CARDCOM_FAILED_REDIRECT_URL", this.config.failedRedirectUrl) as string;
        this.config.webHookUrl = config.get("CARDCOM_WEBHOOK_URL", this.config.webHookUrl) as string;


        if (!this.config.terminalId || !this.config.apiName || !this.config.apiPassword) {
            throw new Error("❌ CardCom Plugin is missing required credentials.");
        }

        this.provider.init(this.config, ctx);
        cardComProvider = this.provider;
        ctx.fastify.decorate("cardcom", this.provider);
    }
}

export function useCardcomProvider(): CardComProvider {
    if (!cardComProvider) {
        throw new Error("❌ CardCom Plugin is not initialized. Use createPlugin() first.");
    }
    return cardComProvider;
}

export { CardComProvider };

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}
