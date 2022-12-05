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
    padding: 50px 220px;
    background:  ${({ theme }) => theme.background};
    transition: all 0.50s linear;
    height: 100%;
    min-height: calc(100vh - 80px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    color: ${({ theme }) => theme.text};

}
`;

export default GlobalStyles;
