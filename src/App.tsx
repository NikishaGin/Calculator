import React, {useState} from 'react';
import './App.css';
import {Button, Container, Grid, Paper, styled} from "@mui/material";
import {theme} from "./theme";
import {GridOperationButton} from "./GridOperationButton";
import {GridButton} from "./GridButton";

const OutputContainer = styled('div')(({}) => ({
    width: "100%",
    textAlign: 'right',
    height: '2em',
    padding: theme.spacing(2),
    fontSize: '3em',
    overflow: 'hidden'
}))
const CalculatorBase = styled(Paper)(({theme}) => ({
    padding: theme.spacing(2),
    marginTop: theme.spacing(4),
    borderRadius: 15
}))

function App() {
    let [currentValue, setCurrentValue] = useState("0") // второе значение
    let [operation, setOperation] = useState('') // математический оператор
    let [prevValue, setPrevValue] = useState('') // первое значение
    let [overwrite, setOverwrite] = useState(true)

    const calculate = () => {
        if (!prevValue || !operation) return currentValue

        // присваивание выбраных значений
        const curr = parseFloat(currentValue)
        const prev = parseFloat(prevValue)

        let result
        switch (operation) {
            case '+':
                result = prev + curr
                break
            case '-':
                result = prev - curr
                break
            case '*':
                result = prev * curr
                break
            case '/':
                result = prev / curr
        }
        return result
    }

    const equals = () => {
        const val = calculate()
        setCurrentValue(`${val}`)
        setPrevValue('')
        setOperation('')
        setOverwrite(true)
    }

    const clear = () => {
        setPrevValue('')
        setOperation('')
        setCurrentValue('0')
        setOverwrite(true)
    }

    const del = () => {
        setCurrentValue('0')
        setOverwrite(true)
    }

    const percent = () => {
        const curr = parseFloat(currentValue)
        setCurrentValue((curr / 100).toString())
    }

    const selectOperation = (operation: string) => {
        if (prevValue) {
            const val = calculate()
            setCurrentValue(`${val}`)
            setPrevValue(`${val}`)
        } else {
            setPrevValue(currentValue)
        }
        setOperation(operation)
        setOverwrite(true)
    }

    const setDigit = (digit: string) => {// функция набора чисел
        if (currentValue[0] === '0' && digit === "0") return;
        if (currentValue.includes(".") && digit == ".") return;
        if (overwrite && digit !== ".") {
            setCurrentValue(digit)
        } else {
            setCurrentValue(`${currentValue}${digit}`)
        }
        setOverwrite(false)
    }

    return (
        <Container>
            <CalculatorBase elevation={3}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <OutputContainer>
                            {currentValue}
                        </OutputContainer>
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <GridOperationButton operation={'AC'} selectOperation={clear} selectedOperation={operation}/>
                        <GridOperationButton operation={'C'} selectOperation={del} selectedOperation={operation}/>
                        <GridOperationButton operation={'%'} selectOperation={percent}
                                             selectedOperation={operation}/>
                        <GridOperationButton operation={'/'} selectOperation={selectOperation}
                                             selectedOperation={operation}/>
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <GridButton digit={'7'} enterDigit={setDigit}/>
                        <GridButton digit={'8'} enterDigit={setDigit}/>
                        <GridButton digit={'9'} enterDigit={setDigit}/>
                        <GridOperationButton operation={'*'} selectOperation={selectOperation}
                                             selectedOperation={operation}/>
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <GridButton digit={'4'} enterDigit={setDigit}/>
                        <GridButton digit={'5'} enterDigit={setDigit}/>
                        <GridButton digit={'6'} enterDigit={setDigit}/>
                        <GridOperationButton operation={'-'} selectOperation={selectOperation}
                                             selectedOperation={operation}/>
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <GridButton digit={'1'} enterDigit={setDigit}/>
                        <GridButton digit={'2'} enterDigit={setDigit}/>
                        <GridButton digit={'3'} enterDigit={setDigit}/>
                        <GridOperationButton operation={'+'} selectOperation={selectOperation}
                                             selectedOperation={operation}/>
                    </Grid>
                    <Grid item container columnSpacing={1}>
                        <GridButton digit={'0'} enterDigit={setDigit} xs={6}/>
                        <GridButton digit={'.'} enterDigit={setDigit}/>
                        <Grid item xs={3}>
                            <Button fullWidth variant={'contained'} onClick={equals}>
                                =
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CalculatorBase>
        </Container>
    )
}

export default App;
