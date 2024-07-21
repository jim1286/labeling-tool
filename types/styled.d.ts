import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      disabled: string;
      success: string;
      danger: string;
      warning: string;
      information: string;
      brand: string;
    };
    icon: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      disabled: string;
      success: string;
      danger: string;
      warning: string;
      information: string;
      brand: string;
    };
    border: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
      disabled: string;
      success: string;
      danger: string;
      warning: string;
      information: string;
      brand: string;
    };
    bg: {
      inverse: string;
      overlay: string;
      surface: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
      };
      fill: {
        disabled: string;
        primary: {
          rest: string;
          hover: string;
          active: string;
        };
        secondary: {
          rest: string;
          hover: string;
          active: string;
        };
        tertiary: {
          rest: string;
          hover: string;
          active: string;
        };
        success: {
          rest: string;
          hover: string;
          active: string;
        };
        danger: {
          rest: string;
          hover: string;
          active: string;
        };
        warning: {
          rest: string;
          hover: string;
          active: string;
        };
        information: {
          rest: string;
          hover: string;
          active: string;
        };
        brand: {
          rest: string;
          hover: string;
          active: string;
        };
      };
    };
  }
}
