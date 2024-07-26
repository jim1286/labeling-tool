export type SemanticColorProps = {
  [key: string]: {
    0?: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
};

export type DefectTypeProps = {
  [shade: string]: string;
};

export type ColorPaletteProps = {
  [key: string]: {
    [key: number]: {
      light: string;
      dark: string;
    };
  };
};

export interface CustomTheme {
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
    quaternary?: string;
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

const semantic: SemanticColorProps = {
  primary: {
    100: "#FFF4E6",
    200: "#FFE8CC",
    300: "#FFD8A8",
    400: "#FFC078",
    500: "#FFA94D",
    600: "#FF922B",
    700: "#FD7E14",
    800: "#F76707",
    900: "#E8590C",
    1000: "#D9480F",
  },
  secondary: {
    0: "#FFFFFF",
    100: "#F8F9FA",
    200: "#F1F3F5",
    300: "#E9ECEF",
    400: "#DEE2E6",
    500: "#CED4DA",
    600: "#ADB5BD",
    700: "#868E96",
    800: "#495057",
    900: "#343A40",
    1000: "#212529",
  },
  success: {
    100: "#EBFBEE",
    200: "#D3F9D8",
    300: "#B2F2BB",
    400: "#8CE99A",
    500: "#69DB7C",
    600: "#51CF66",
    700: "#40C057",
    800: "#37B24D",
    900: "#2F9E44",
    1000: "#2B8A3E",
  },
  danger: {
    100: "#FFF5F5",
    200: "#FFE3E3",
    300: "#FFC9C9",
    400: "#FFA8A8",
    500: "#FF8787",
    600: "#FF6B6B",
    700: "#FA5252",
    800: "#F03E3E",
    900: "#E03131",
    1000: "#C92A2A",
  },
  warning: {
    100: "#FFF9DB",
    200: "#FFF3BF",
    300: "#FFEC99",
    400: "#FFE066",
    500: "#FFD43B",
    600: "#FCC419",
    700: "#FAB005",
    800: "#F59F00",
    900: "#F08C00",
    1000: "#E67700",
  },
  information: {
    100: "#E7F5FF",
    200: "#D0EBFF",
    300: "#A5D8FF",
    400: "#74C0FC",
    500: "#4DABF7",
    600: "#339AF0",
    700: "#228BE6",
    800: "#1C7ED6",
    900: "#1971C2",
    1000: "#1864AB",
  },
};

const color: ColorPaletteProps = {
  neutral: {
    0: {
      light: "#FFFFFF",
      dark: "#1D2125",
    },
    100: {
      light: "#F8F9FA",
      dark: "#22272B",
    },
    200: {
      light: "#F1F3F5",
      dark: "#2C333A",
    },
    300: {
      light: "#E9ECEF",
      dark: "#454F59",
    },
    400: {
      light: "#DEE2E6",
      dark: "#596773",
    },
    500: {
      light: "#CED4DA",
      dark: "#738496",
    },
    600: {
      light: "#ADB5BD",
      dark: "#8C9BAB",
    },
    700: {
      light: "#868E96",
      dark: "#9FADBC",
    },
    800: {
      light: "#495057",
      dark: "#B6C2CF",
    },
    900: {
      light: "#343A40",
      dark: "#C7D1DB",
    },
    1000: {
      light: "#212529",
      dark: "#DEE4EA",
    },
  },
  red: {
    100: { light: "#FFF5F5", dark: "#C92A2A" },
    200: { light: "#FFE3E3", dark: "#E03131" },
    300: { light: "#FFC9C9", dark: "#F03E3E" },
    400: { light: "#FFA8A8", dark: "#FA5252" },
    500: { light: "#FF8787", dark: "#FF6B6B" },
    600: { light: "#FF6B6B", dark: "#FF8787" },
    700: { light: "#FA5252", dark: "#FFA8A8" },
    800: { light: "#F03E3E", dark: "#FFC9C9" },
    900: { light: "#E03131", dark: "#FFE3E3" },
    1000: { light: "#C92A2A", dark: "#FFF5F5" },
  },
  orange: {
    100: { light: "#FFF4E6", dark: "#D9480F" },
    200: { light: "#FFE8CC", dark: "#E8590C" },
    300: { light: "#FFD8A8", dark: "#F76707" },
    400: { light: "#FFC078", dark: "#FD7E14" },
    500: { light: "#FFA94D", dark: "#FF922B" },
    600: { light: "#FF922B", dark: "#FFA94D" },
    700: { light: "#FD7E14", dark: "#FFC078" },
    800: { light: "#F76707", dark: "#FFD8A8" },
    900: { light: "#E8590C", dark: "#FFE8CC" },
    1000: { light: "#D9480F", dark: "#FFF4E6" },
  },
  yellow: {
    100: { light: "#FFF9DB", dark: "#E67700" },
    200: { light: "#FFF3BF", dark: "#F08C00" },
    300: { light: "#FFEC99", dark: "#F59F00" },
    400: { light: "#FFE066", dark: "#FAB005" },
    500: { light: "#FFD43B", dark: "#FCC419" },
    600: { light: "#FCC419", dark: "#FFD43B" },
    700: { light: "#FAB005", dark: "#FFE066" },
    800: { light: "#F59F00", dark: "#FFEC99" },
    900: { light: "#F08C00", dark: "#FFF3BF" },
    1000: { light: "#E67700", dark: "#FFF9DB" },
  },
  lime: {
    100: { light: "#F4FCE3", dark: "#5C940D" },
    200: { light: "#E9FAC8", dark: "#66A80F" },
    300: { light: "#D8F5A2", dark: "#74B816" },
    400: { light: "#C0EB75", dark: "#82C91E" },
    500: { light: "#A9E34B", dark: "#94D82D" },
    600: { light: "#94D82D", dark: "#A9E34B" },
    700: { light: "#82C91E", dark: "#C0EB75" },
    800: { light: "#74B816", dark: "#D8F5A2" },
    900: { light: "#66A80F", dark: "#E9FAC8" },
    1000: { light: "#5C940D", dark: "#F4FCE3" },
  },
  grape: {
    100: { light: "#F8F0FC", dark: "#862E9C" },
    200: { light: "#F3D9FA", dark: "#9C36B5" },
    300: { light: "#EEBEFA", dark: "#AE3EC9" },
    400: { light: "#E599F7", dark: "#BE4BDB" },
    500: { light: "#DA77F2", dark: "#CC5DE8" },
    600: { light: "#CC5DE8", dark: "#DA77F2" },
    700: { light: "#BE4BDB", dark: "#E599F7" },
    800: { light: "#AE3EC9", dark: "#EEBEFA" },
    900: { light: "#9C36B5", dark: "#F3D9FA" },
    1000: { light: "#862E9C", dark: "#F8F0FC" },
  },
  violet: {
    100: { light: "#F3F0FF", dark: "#5F3DC4" },
    200: { light: "#E5DBFF", dark: "#6741D9" },
    300: { light: "#D0BFFF", dark: "#7048E8" },
    400: { light: "#B197FC", dark: "#7950F2" },
    500: { light: "#9775FA", dark: "#845EF7" },
    600: { light: "#845EF7", dark: "#9775FA" },
    700: { light: "#7950F2", dark: "#B197FC" },
    800: { light: "#7048E8", dark: "#D0BFFF" },
    900: { light: "#6741D9", dark: "#E5DBFF" },
    1000: { light: "#5F3DC4", dark: "#F3F0FF" },
  },
  indigo: {
    100: { light: "#EDF2FF", dark: "#364FC7" },
    200: { light: "#DBE4FF", dark: "#3B5BDB" },
    300: { light: "#BAC8FF", dark: "#4263EB" },
    400: { light: "#91A7FF", dark: "#4C6EF5" },
    500: { light: "#748FFC", dark: "#5C7CFA" },
    600: { light: "#5C7CFA", dark: "#91A7FF" },
    700: { light: "#4C6EF5", dark: "#91A7FF" },
    800: { light: "#4263EB", dark: "#BAC8FF" },
    900: { light: "#3B5BDB", dark: "#DBE4FF" },
    1000: { light: "#364FC7", dark: "#EDF2FF" },
  },
  blue: {
    100: { light: "#E7F5FF", dark: "#1864AB" },
    200: { light: "#D0EBFF", dark: "#1971C2" },
    300: { light: "#A5D8FF", dark: "#1C7ED6" },
    400: { light: "#74C0FC", dark: "#228BE6" },
    500: { light: "#4DABF7", dark: "#339AF0" },
    600: { light: "#339AF0", dark: "#4DABF7" },
    700: { light: "#228BE6", dark: "#74C0FC" },
    800: { light: "#1C7ED6", dark: "#A5D8FF" },
    900: { light: "#1971C2", dark: "#D0EBFF" },
    1000: { light: "#1864AB", dark: "#E7F5FF" },
  },
  cyan: {
    100: { light: "#E3FAFC", dark: "#0B7285" },
    200: { light: "#C5F6FA", dark: "#0C8599" },
    300: { light: "#99E9F2", dark: "#1098AD" },
    400: { light: "#66D9E8", dark: "#15AABF" },
    500: { light: "#3BC9DB", dark: "#22B8CF" },
    600: { light: "#22B8CF", dark: "#3BC9DB" },
    700: { light: "#15AABF", dark: "#66D9E8" },
    800: { light: "#1098AD", dark: "#99E9F2" },
    900: { light: "#0C8599", dark: "#C5F6FA" },
    1000: { light: "#0B7285", dark: "#E3FAFC" },
  },
  green: {
    100: { light: "#E6FCF5", dark: "#087F5B" },
    200: { light: "#C3FAE8", dark: "#099268" },
    300: { light: "#96F2D7", dark: "#0CA678" },
    400: { light: "#63E6BE", dark: "#12B886" },
    500: { light: "#38D9A9", dark: "#20C997" },
    600: { light: "#20C997", dark: "#38D9A9" },
    700: { light: "#12B886", dark: "#63E6BE" },
    800: { light: "#0CA678", dark: "#96F2D7" },
    900: { light: "#099268", dark: "#C3FAE8" },
    1000: { light: "#087F5B", dark: "#E6FCF5" },
  },
  pink: {
    100: { light: "#FFF0F6", dark: "#A61E4D" },
    200: { light: "#FFDEEB", dark: "#C2255C" },
    300: { light: "#FCC2D7", dark: "#D6336C" },
    400: { light: "#FAA2C1", dark: "#E64980" },
    500: { light: "#F783AC", dark: "#F06595" },
    600: { light: "#F06595", dark: "#F783AC" },
    700: { light: "#E64980", dark: "#FAA2C1" },
    800: { light: "#D6336C", dark: "#FCC2D7" },
    900: { light: "#C2255C", dark: "#FFDEEB" },
    1000: { light: "#A61E4D", dark: "#FFF0F6" },
  },
};

const dark: CustomTheme = {
  text: {
    primary: color.neutral[1000].dark,
    secondary: color.neutral[800].dark,
    tertiary: color.neutral[700].dark,
    inverse: color.neutral[0].dark,
    disabled: color.neutral[600].dark,
    success: semantic.success[700],
    danger: semantic.danger[700],
    warning: semantic.warning[700],
    information: semantic.information[700],
    brand: semantic.primary[800],
  },
  icon: {
    primary: color.neutral[1000].dark,
    secondary: color.neutral[800].dark,
    tertiary: color.neutral[700].dark,
    inverse: color.neutral[0].dark,
    disabled: color.neutral[600].dark,
    success: semantic.success[700],
    danger: semantic.danger[700],
    warning: semantic.warning[700],
    information: semantic.information[700],
    brand: semantic.primary[800],
  },
  border: {
    primary: color.neutral[300].dark,
    secondary: color.neutral[400].dark,
    tertiary: color.neutral[500].dark,
    quaternary: color.neutral[600].dark,
    inverse: color.neutral[0].dark,
    disabled: color.neutral[300].dark,
    success: semantic.success[700],
    danger: semantic.danger[700],
    warning: semantic.warning[700],
    information: semantic.information[700],
    brand: semantic.primary[800],
  },
  bg: {
    inverse: color.neutral[1000].dark,
    overlay: "rgba(222, 228, 234, 0.7)",
    surface: {
      primary: color.neutral[0].dark,
      secondary: color.neutral[100].dark,
      tertiary: color.neutral[200].dark,
      quaternary: color.neutral[300].dark,
    },
    fill: {
      disabled: color.neutral[200].dark,
      primary: {
        rest: "transparent",
        hover: color.neutral[200].dark,
        active: color.neutral[300].dark,
      },
      secondary: {
        rest: color.neutral[300].dark,
        hover: color.neutral[400].dark,
        active: color.neutral[500].dark,
      },
      tertiary: {
        rest: color.neutral[600].dark,
        hover: color.neutral[700].dark,
        active: color.neutral[800].dark,
      },
      success: {
        rest: semantic.success[800],
        hover: semantic.success[700],
        active: semantic.success[600],
      },
      danger: {
        rest: semantic.danger[800],
        hover: semantic.danger[700],
        active: semantic.danger[600],
      },
      warning: {
        rest: semantic.warning[800],
        hover: semantic.warning[700],
        active: semantic.warning[600],
      },
      information: {
        rest: semantic.information[800],
        hover: semantic.information[700],
        active: semantic.information[600],
      },
      brand: {
        rest: semantic.primary[800],
        hover: semantic.primary[700],
        active: semantic.primary[600],
      },
    },
  },
};

const light: CustomTheme = {
  text: {
    primary: color.neutral[1000].light,
    secondary: color.neutral[800].light,
    tertiary: color.neutral[700].light,
    inverse: color.neutral[0].light,
    disabled: color.neutral[600].light,
    success: semantic.success[900],
    danger: semantic.danger[900],
    warning: semantic.warning[900],
    information: semantic.information[900],
    brand: semantic.primary[800],
  },
  icon: {
    primary: color.neutral[1000].light,
    secondary: color.neutral[800].light,
    tertiary: color.neutral[700].light,
    inverse: color.neutral[0].light,
    disabled: color.neutral[600].light,
    success: semantic.success[900],
    danger: semantic.danger[900],
    warning: semantic.warning[900],
    information: semantic.information[900],
    brand: semantic.primary[800],
  },
  border: {
    primary: color.neutral[300].light,
    secondary: color.neutral[400].light,
    tertiary: color.neutral[500].light,
    quaternary: color.neutral[600].light,
    inverse: color.neutral[0].light,
    disabled: color.neutral[300].light,
    success: semantic.success[900],
    danger: semantic.danger[900],
    warning: semantic.warning[900],
    information: semantic.information[900],
    brand: semantic.primary[800],
  },
  bg: {
    inverse: color.neutral[1000].light,
    overlay: "rgba(33, 37, 41, 0.5)",
    surface: {
      primary: color.neutral[0].light,
      secondary: color.neutral[100].light,
      tertiary: color.neutral[200].light,
      quaternary: color.neutral[300].light,
    },
    fill: {
      disabled: color.neutral[200].light,
      primary: {
        rest: "transparent",
        hover: color.neutral[200].light,
        active: color.neutral[300].light,
      },
      secondary: {
        rest: color.neutral[300].light,
        hover: color.neutral[400].light,
        active: color.neutral[500].light,
      },
      tertiary: {
        rest: color.neutral[600].light,
        hover: color.neutral[700].light,
        active: color.neutral[800].light,
      },
      success: {
        rest: semantic.success[800],
        hover: semantic.success[900],
        active: semantic.success[1000],
      },
      danger: {
        rest: semantic.danger[800],
        hover: semantic.danger[900],
        active: semantic.danger[1000],
      },
      warning: {
        rest: semantic.warning[800],
        hover: semantic.warning[900],
        active: semantic.warning[1000],
      },
      information: {
        rest: semantic.information[800],
        hover: semantic.information[900],
        active: semantic.information[1000],
      },
      brand: {
        rest: semantic.primary[800],
        hover: semantic.primary[900],
        active: semantic.primary[1000],
      },
    },
  },
};

const defectTypeColors: DefectTypeProps = {
  0: color.red[700].light,
  1: color.lime[700].light,
  2: color.indigo[700].light,
  3: color.green[700].light,
  4: color.yellow[700].light,
  5: color.cyan[700].light,
  6: color.pink[700].light,
  7: color.grape[700].light,
  8: color.violet[700].light,
  9: color.orange[700].light,
};

export { semantic, dark, light, defectTypeColors };
