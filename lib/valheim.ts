#!/usr/bin/env node
import * as cdk from "@aws-cdk/core";
import { DiscordInteractionsStack } from "./interactions-stack";
import { ValheimWorldStack } from "./valheim-world-stack";
import VALHEIM_PLUS_ENV from "./valheim-plus-config";

const app = new cdk.App();

const env: cdk.Environment = {
  account: "752071775095",
  region: "ap-southeast-2",
};

const muncheimValheimServerStack = new ValheimWorldStack(app, "MuncheimWorld", {
  env,
  passwordSecretId: "muncheimServerPass",
  adminlistSecretId: "adminlistValheim",
  environment: {
    SERVER_NAME: "Muncheim2 Dedicated Server",
    WORLD_NAME: "Muncheim2",
  },
});

new DiscordInteractionsStack(app, "DiscordInteractionsStack", {
  env,
  clientIdSecretId: "discordValheimBotClientPublicKey",
  servers: {
    muncheim: muncheimValheimServerStack.world,
  },
});
