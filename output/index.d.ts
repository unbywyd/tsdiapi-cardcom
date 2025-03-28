import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { CardComProvider } from "./provider.js";
export * from "./provider.js";
declare module "fastify" {
    interface FastifyInstance {
        cardcom: CardComProvider;
    }
}
export type PluginOptions = {
    apiUrl: string;
    terminalId: string;
    apiName: string;
    apiPassword: string;
    successRedirectUrl: string;
    failedRedirectUrl: string;
    webHookUrl: string;
};
declare class App implements AppPlugin {
    name: string;
    config: PluginOptions;
    context: AppContext;
    provider: CardComProvider;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export declare function useCardcomProvider(): CardComProvider;
export { CardComProvider };
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map