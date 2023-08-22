import { IPage } from '@core';

export interface IEmailTemplate {
  content: IPage;
  subject?: string;
  subTitle?: string;
  defaultData?: Record<string, any>;
}

declare global {
  function t(key: string): string;
  function t(key: string, placeholder: React.ReactNode): JSX.Element;

  interface Window {
    // translation

    t: (key: string, placeholder?: React.ReactNode) => JSX.Element;
  }
}
