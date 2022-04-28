// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        // outline: 1px solid green !important
    }

    body {
        background: #c9c9c9;
        text-rendering: optimize-legibility;
        font-family: 'Lato', sans-serif;
    }
`;
 
export default GlobalStyle;