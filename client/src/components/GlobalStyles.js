import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`


//Declare Global Style for entire site, colors are accessible by var(*color-name*)
*{
    --white: #F8F8F8;
    --dark-grey: #464646;
    font-family: "Roboto", sans-serif;
    box-sizing: border-box;
    margin: 0;
}

main{
    padding: 50px 200px;
    
    /* Background gradient fixed and centered */
    background: rgb(25,212,255);
    background: linear-gradient(180deg, rgba(25,212,255,1) 0%, rgba(81,226,240,1) 24%, rgba(236,242,209,1) 58%, rgba(213,197,126,1) 100%);height: 100%;
    min-height: calc(100vh - 80px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}
`;

export default GlobalStyles;
