import type {
  ModelDefinitionConfig,
  ModelProviderConfig,
} from "openclaw/plugin-sdk/provider-models";

export const STEPFUN_PROVIDER_ID = "stepfun";
export const STEPFUN_PLAN_PROVIDER_ID = "stepfun-plan";
export const STEPFUN_STANDARD_CN_BASE_URL = "https://api.stepfun.com/v1";
export const STEPFUN_STANDARD_INTL_BASE_URL = "https://api.stepfun.ai/v1";
export const STEPFUN_PLAN_CN_BASE_URL = "https://api.stepfun.com/step_plan/v1";
export const STEPFUN_PLAN_INTL_BASE_URL = "https://api.stepfun.ai/step_plan/v1";
export const STEPFUN_DEFAULT_MODEL_ID = "step-3.5-flash";
export const STEPFUN_DEFAULT_MODEL_REF = `${STEPFUN_PROVIDER_ID}/${STEPFUN_DEFAULT_MODEL_ID}`;
export const STEPFUN_PLAN_DEFAULT_MODEL_REF = `${STEPFUN_PLAN_PROVIDER_ID}/${STEPFUN_DEFAULT_MODEL_ID}`;

const STEPFUN_DEFAULT_COST = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

const STEPFUN_STANDARD_MODEL_CATALOG: ReadonlyArray<ModelDefinitionConfig> = [
  {
    id: "step-3.5-flash",
    name: "Step 3.5 Flash",
    reasoning: true,
    input: ["text"],
    cost: STEPFUN_DEFAULT_COST,
    contextWindow: 262144,
    maxTokens: 65536,
  },
  {
    id: "step-3",
    name: "Step 3",
    reasoning: true,
    input: ["text", "image"],
    cost: STEPFUN_DEFAULT_COST,
    contextWindow: 262144,
    maxTokens: 65536,
  },
  {
    id: "step-2-mini",
    name: "Step 2 Mini",
    reasoning: false,
    input: ["text"],
    cost: STEPFUN_DEFAULT_COST,
    contextWindow: 65536,
    maxTokens: 16384,
  },
  {
    id: "step-1o-turbo-vision",
    name: "Step 1o Turbo Vision",
    reasoning: false,
    input: ["text", "image"],
    cost: STEPFUN_DEFAULT_COST,
    contextWindow: 32768,
    maxTokens: 8192,
  },
];

const STEPFUN_PLAN_MODEL_CATALOG: ReadonlyArray<ModelDefinitionConfig> = [
  {
    id: "step-3.5-flash",
    name: "Step 3.5 Flash",
    reasoning: true,
    input: ["text"],
    cost: STEPFUN_DEFAULT_COST,
    contextWindow: 262144,
    maxTokens: 65536,
  },
];

function cloneCatalog(models: ReadonlyArray<ModelDefinitionConfig>) {
  return models.map((model) => ({ ...model }));
}

export function buildStepFunProvider(
  baseUrl: string = STEPFUN_STANDARD_INTL_BASE_URL,
): ModelProviderConfig {
  return {
    baseUrl,
    api: "openai-completions",
    models: cloneCatalog(STEPFUN_STANDARD_MODEL_CATALOG),
  };
}

export function buildStepFunPlanProvider(
  baseUrl: string = STEPFUN_PLAN_INTL_BASE_URL,
): ModelProviderConfig {
  return {
    baseUrl,
    api: "openai-completions",
    models: cloneCatalog(STEPFUN_PLAN_MODEL_CATALOG),
  };
}
