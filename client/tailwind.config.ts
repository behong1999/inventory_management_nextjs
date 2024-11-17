import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import { createThemes } from 'tw-colors';

const baseColors = [
  'gray',
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
];

// E.g. light[50] : dark[900]
const shadeMapping = {
  '50': '900',
  '100': '800',
  '200': '700',
  '300': '600',
  '400': '500',
  '500': '400',
  '600': '300',
  '700': '200',
  '800': '100',
  '900': '50',
};

const generateThemeObject = (colors: any, mapping: any, light = true) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    // Convert the mapping object into an array of keys and values
    Object.entries(mapping).forEach(([key, value]: any) => {
      const shadeKey = light ? key : value;
      theme[color][key] = colors[color][shadeKey];
    });
  });
  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, false); 

const themes = {
  light: {
    ...lightTheme,
    white: '#ffffff',
  },
  dark: {
    ...darkTheme,
    white: colors.gray['950'],
  },
};

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [createThemes(themes)], // check tw-colors documentation for more info
};
export default config;
