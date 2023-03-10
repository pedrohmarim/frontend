/* eslint @typescript-eslint/no-empty-interface: "off" */

import theme from 'globalStyles/theme';
import 'styled-components';

export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
