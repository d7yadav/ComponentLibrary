
// Typography types are part of the Theme interface in MUI v7
type TypographyOptions = {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  h1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h3: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h4: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h5: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  h6: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body1: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  body2: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  button: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    textTransform: string;
  };
  caption: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
  };
  overline: {
    fontSize: string;
    fontWeight: number;
    lineHeight: number;
    textTransform: string;
  };
};

export const typography: TypographyOptions = {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontSize: '2.125rem',
    fontWeight: 300,
    lineHeight: 1.167,
  },
  h2: {
    fontSize: '1.5rem',
    fontWeight: 400,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: '1.25rem',
    fontWeight: 400,
    lineHeight: 1.167,
  },
  h4: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.235,
  },
  h5: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.334,
  },
  h6: {
    fontSize: '0.75rem',
    fontWeight: 500,
    lineHeight: 1.6,
  },
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.43,
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.75,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 2.66,
    textTransform: 'uppercase',
  }
};