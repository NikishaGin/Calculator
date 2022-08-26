import {Button, Grid} from "@mui/material";

interface GridButtonProps {
    digit: string
    enterDigit: (digit: string) => void
    xs?: number
}

export const GridButton: React.FC<GridButtonProps> = ({
    digit,
    enterDigit,
    xs = 3
}) => {
    return (
        <Grid item xs={xs}>
                <Button fullWidth variant={'outlined'} onClick={()=> enterDigit(digit)}>
                    {digit}
                </Button>
        </Grid>
    )
}