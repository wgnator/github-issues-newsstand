import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`

:root {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  color: ${theme.fontColor};

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}
* {
  box-sizing: border-box;
}
a {
  font-weight: 500;
  color: inherit;
  text-decoration: inherit;
}
a:hover {
  color: ${theme.primaryColor};
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    list-style: none;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
    display: block;
}
body {
    line-height: 1;
    min-height: 100vh;
}
#root {
  height: 100%;
}
ol, ul {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
*{
    box-sizing: border-box;
}

  
*:focus, *:focus-visible {
  outline: none;

}

button {

  font-size: 1rem;
  font-weight: 500;
  font-family: inherit;
  background-color: inherit;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

textarea {
  font-family: inherit;
}
::-webkit-scrollbar {
  width: 0.5rem;  
}
::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.3);
}

::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.5);   
  border-radius: 5px;
}



@-webkit-keyframes skeleton-gradient {
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
}

@keyframes skeleton-gradient {
    0% {
        background-color: rgba(165, 165, 165, 0.1);
    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
    }
}
`;
