import { ThemeContext } from "./ContextProvider"

 const ThemeContextProvider=(props)=>{

    const themeValue={

    }
    return (
        <ThemeContext.Provider value={themeValue}>
          {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider