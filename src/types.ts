export type ApiProviderId = 'openai' | 'anthropic' | 'google' | 'youtube' | 'websearch';

export interface ApiProvider {
  id: ApiProviderId;
  name: string;
  logo: string;
  docsUrl: string;
}

export interface UsageData {
  day: string;
  [key: string]: number | string; // Allows for dynamic provider keys
}

export interface ApiConfig {
  openaiApiKey: string;
  serperApiKey: string;
  youtubeApiKey: string;
  webSearchApiKey: string;
}
