import { createGlobalStyle } from 'styled-components';
import normalize from './normalize';
import root from './root';

const GlobalStyle = createGlobalStyle`
  ${normalize}
  ${root}
`;

export default GlobalStyle;
