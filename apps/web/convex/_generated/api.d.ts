/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.7.1.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as characters from "../characters.js";
import type * as chats from "../chats.js";
import type * as helpers from "../helpers.js";
import type * as ingest_embed from "../ingest/embed.js";
import type * as messages from "../messages.js";
import type * as personas from "../personas.js";
import type * as serve from "../serve.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  characters: typeof characters;
  chats: typeof chats;
  helpers: typeof helpers;
  "ingest/embed": typeof ingest_embed;
  messages: typeof messages;
  personas: typeof personas;
  serve: typeof serve;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
