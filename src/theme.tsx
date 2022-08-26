import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        mode: "dark", // цвет фона
        primary: {
            main: "#fff149"
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 25
                }
            }
        }
    },
    typography: {
        button: {
            fontSize: '1rem',
        }
    }
})