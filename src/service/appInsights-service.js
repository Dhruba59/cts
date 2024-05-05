import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import {
  ReactPlugin,
  withAITracking
} from "@microsoft/applicationinsights-react-js";

const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.NEXT_PUBLIC_APPINSIGHTS_KEY,
    extensions: [reactPlugin]
  }
});

ai.loadAppInsights();

export const appInsights = ai.appInsights;
