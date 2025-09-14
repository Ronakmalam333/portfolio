export interface ThemeConfig {
  colors: {
    primary: {
      50: string;
      500: string;
      600: string;
      700: string;
    };
    accent: {
      blue: string;
      purple: string;
      cyan: string;
    };
  };
}

export const themeConfig: ThemeConfig = {
  colors: {
    primary: {
      50: '#f0f9ff',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
    },
    accent: {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      cyan: '#06b6d4',
    }
  }
};

export const themes = {
  default: 'blue',
  options: [
    { name: 'blue', color: '#3b82f6', label: 'Blue' },
    { name: 'purple', color: '#8b5cf6', label: 'Purple' },
    { name: 'cyan', color: '#06b6d4', label: 'Cyan' },
  ]
};