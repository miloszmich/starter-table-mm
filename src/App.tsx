import React from 'react';
import './App.css';
import { Checkbox, FormControlLabel, FormGroup, Paper, Typography } from '@material-ui/core';
import { firstStep, fourthStep, secondStep, thirdStep } from './helpers/standardData';
import { getBook } from './helpers/setScore';
import { booksData } from './helpers/booksData'
import axios from 'axios';
import { pointConverter } from './helpers/countPoints';
import { PrettoSlider } from './PrettoSlider';
import { CustomTextField } from './TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const App = () => {
  const [stepFirstValue, setStepFirstValue] = React.useState<number | null>(0);
  const [stepSecondValue, setStepSecondValue] = React.useState<number | null>(0);
  const [stepThirdValues, setStepThirdValues] = React.useState<number[]>([0]);
  const [stepFourthValue, setStepFourthValue] = React.useState<number | null>(1);
  const [stepFifthValue, setStepFifthValue] = React.useState<number>(0);
  const [booksScore, setBooksScore] = React.useState<Record<string, Record<string, string | number>>>({});
  const [result, setResult] = React.useState<Record<string, number>>({});

  const disciplineStepValueHandler = (value: number) => {
    const copiedValues = [...stepThirdValues];
    if (!stepThirdValues.includes(value)) {
      copiedValues.push(value);
      setStepThirdValues(copiedValues);
    } else {
      const index = copiedValues.findIndex(v => v === value);
      copiedValues.splice(index, 1);
      setStepThirdValues(copiedValues);
    }
  }

  React.useEffect(() => {
    const getData = async () => {
      const tableData = await axios.get('https://gsx2json.com/api?id=15UiwuXR6eQkPFBdDVaZTDARw1LoMX_UpWm2S1e94-d0');    


      const booksScore = pointConverter(tableData.data.rows);
      setBooksScore(booksScore);
    }

    getData();
  }, []);

  React.useEffect(() => {
    if (Object.keys(booksScore).length > 0) {
      const depositInfo = booksData.map(b => {
        return { buk: b.buk, minDep: b.minDep }
      })

      const result = getBook(
        {
          firstStep: firstStep[stepFirstValue as number].result,
          secondStep: secondStep[stepSecondValue as number].result,
          thirdStep: stepThirdValues.map(v => thirdStep[v].result),
          fourthStep: fourthStep[stepFourthValue as number].result,
          fifthStep: stepFifthValue,
        }, 
        booksScore,
        depositInfo,
        stepFourthValue === 0 || stepFourthValue === 1
      )

      setResult({...result.result});
    }
    }, [stepFirstValue, stepSecondValue, stepThirdValues, stepFourthValue, stepFifthValue, booksScore]);




  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1" >Starter bukmacherski - trial</Typography>

      </header>
      <div className="App-body">
        <div className="App-data-handlers">
        <Paper variant="outlined" square className="App-paper">
          <Typography variant="h3" >Skill</Typography>
          <FormGroup row className="App-formGroup">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepFirstValue === 0}
                  onChange={(): void => setStepFirstValue(0)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Debiutant"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepFirstValue === 1}
                  onChange={(): void => setStepFirstValue(1)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Średniozaawansowany"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepFirstValue === 2}
                  onChange={(): void => setStepFirstValue(2)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Legenda"
            />
          </FormGroup>
        </Paper>
        <Paper variant="outlined" square className="App-paper">
          <Typography variant="h3" >Urządzenie</Typography>
          <FormGroup row className="App-formGroup">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepSecondValue === 0}
                  onChange={(): void => setStepSecondValue(0)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Mobile"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepSecondValue === 1}
                  onChange={(): void => setStepSecondValue(1)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Desktop"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepSecondValue === 2}
                  onChange={(): void => setStepSecondValue(2)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Both"
            />
          </FormGroup>
        </Paper>
        <Paper variant="outlined" square className="App-paper">
          <Typography variant="h3">Dyscypliny</Typography>

          <FormGroup row className="App-formGroup">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(0)}
                  onChange={(): void => disciplineStepValueHandler(0)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Piłkę nożną"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(1)}
                  onChange={(): void => disciplineStepValueHandler(1)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Koszykówkę"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(2)}
                  onChange={(): void => disciplineStepValueHandler(2)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Tenis ziemny"
            />
          </FormGroup>
          <FormGroup row className="App-formGroup">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(3)}
                  onChange={(): void => disciplineStepValueHandler(3)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Hokej"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(4)}
                  onChange={(): void => disciplineStepValueHandler(4)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Sporty walki"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(5)}
                  onChange={(): void => disciplineStepValueHandler(5)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Siatkówkę"
            />
          </FormGroup>
          <FormGroup row className="App-formGroup">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(6)}
                  onChange={(): void => disciplineStepValueHandler(6)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="eSport"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(7)}
                  onChange={(): void => disciplineStepValueHandler(7)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Wirtualne sporty"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepThirdValues.includes(8)}
                  onChange={(): void => disciplineStepValueHandler(8)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Inne"
            />
          </FormGroup>
        </Paper>
        <Paper variant="outlined" square className="App-paper">
          <Typography variant="h3" >Info o depozycie</Typography>
          <FormGroup row className="App-formGroup">
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepFourthValue === 0}
                  onChange={(): void => setStepFourthValue(0)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Bonus do depozytu"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepFourthValue === 1}
                  onChange={(): void => setStepFourthValue(1)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Bonus bez depozytu"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={stepFourthValue === 2}
                  onChange={(): void => setStepFourthValue(2)}
                  name="checkedB"
                  color="secondary"
                />
              }
              label="Nie chcę bonusu"
            />
          </FormGroup>
        </Paper>
        {stepFourthValue === 0 && <Paper variant="outlined" square className="App-paper" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Typography variant="h3">Bonus do depozytu</Typography>
        <CustomTextField 
          inputProps={{style: {fontSize: 24}}}
          InputLabelProps={{style: {fontSize: 24}}}
          label="Bonus do depozytu" value={stepFifthValue} onChange={(e) => setStepFifthValue(Number(e.target.value))}/>
        <PrettoSlider 
          min={0} 
          max={5000} 
          valueLabelDisplay="auto" 
          aria-label="pretto slider" 
          value={stepFifthValue} 
          onChange={(e: object, value: number | number[]) => setStepFifthValue(Array.isArray(value) ? value[0] : value)} />
        </Paper>}
      </div>
      <div className="App-data-display">
      <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Miejsce</TableCell>
            <TableCell>Bukmacher</TableCell>
            <TableCell>Liczba punktów</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(result).sort(([, a],[, b]) => b - a).map(([book, points], index) => (
            <TableRow key={book}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{book}</TableCell>
              <TableCell>{points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      </div>
    </div>
  );
}

export default App;
