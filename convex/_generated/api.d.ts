/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as authHelpers from "../authHelpers.js";
import type * as auth_actions from "../auth_actions.js";
import type * as caseStudies from "../caseStudies.js";
import type * as contact from "../contact.js";
import type * as crons from "../crons.js";
import type * as documents from "../documents.js";
import type * as leads from "../leads.js";
import type * as messages from "../messages.js";
import type * as profile from "../profile.js";
import type * as projectRequests from "../projectRequests.js";
import type * as projects from "../projects.js";
import type * as quotes from "../quotes.js";
import type * as rentableApps from "../rentableApps.js";
import type * as teamMembers from "../teamMembers.js";
import type * as validation from "../validation.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  authHelpers: typeof authHelpers;
  auth_actions: typeof auth_actions;
  caseStudies: typeof caseStudies;
  contact: typeof contact;
  crons: typeof crons;
  documents: typeof documents;
  leads: typeof leads;
  messages: typeof messages;
  profile: typeof profile;
  projectRequests: typeof projectRequests;
  projects: typeof projects;
  quotes: typeof quotes;
  rentableApps: typeof rentableApps;
  teamMembers: typeof teamMembers;
  validation: typeof validation;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
