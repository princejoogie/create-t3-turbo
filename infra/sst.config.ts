/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "infra",
      removal: input?.stage === "prod" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const router = new sst.aws.Router("router");

    new sst.aws.Nextjs("nextjs", {
      router: { instance: router },
      path: "../apps/nextjs",
      environment: {
        AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID ?? "",
        AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET ?? "",
        AUTH_SECRET: process.env.AUTH_SECRET ?? "",
        POSTGRES_URL: process.env.POSTGRES_URL ?? "",
        NEXT_PUBLIC_URL: router.url,
      },
    });
  },
});
