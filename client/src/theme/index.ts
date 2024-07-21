import { semantic, dark, light, SemanticColorProps, CustomTheme } from './color';

interface DefaultTheme {
  semantic: SemanticColorProps;
  dark: CustomTheme;
  light: CustomTheme;
}

export const theme: DefaultTheme = {
  semantic,
  dark,
  light,
};

export * from './typography';
