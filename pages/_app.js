import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";

//_app.js -> Definicoes globais do NextJS
//  ThemeProvider -> Prove o temo para todo app
// ColorModeProvider -> Prove o state light/dark para todo mundo

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222",
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#FFFFFF",
    }
};

function ProviderWrapper(props) {

    return (
        <ColorModeProvider initialMode={"dark"}>
            {props.children}
        </ColorModeProvider>
    ) 
}

// Guarda o Status e Monitora evento para fazer setState
function MyApp({Component, pageProps}) {  

    const contexto = React.useContext(ColorModeContext);
    console.log(contexto.mode);

    return (
        <ThemeProvider theme= { theme[contexto.mode] } >
            <CSSReset />
            <Component {...pageProps} />
        </ThemeProvider>
        
    )

}

export default function _App(props){
    return (
        <ProviderWrapper>
            <MyApp {...props} /> 
        </ProviderWrapper>

    )
};