import { css } from 'styled-components';

const root = css`
  :root {
    font-size: 16px;
    font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-family: 'Arvo', sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
`;

export default root;
