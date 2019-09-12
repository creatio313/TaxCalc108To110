import React, { useState } from 'react';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 300,
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 300
  },
}));

function App() {
  const classes = useStyles();

  const [costbfr, setCostbfr] = useState(100);
  const [taxbfr, setTaxbfr] = useState(108);
  const [costafr, setCostafr] = useState(100);
  const [taxafr, setTaxafr] = useState(110);
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" component="h1" gutterBottom>
          便乗値上げチェッカー
        </Typography>
        <Typography variant="body1" gutterBottom>
          消費増税前後の値上げ幅を調べます。小数点以下の値は四捨五入して表示するため、1円未満の誤差があります。
        </Typography>
      </header>
      <hr/>
      <main className="App-body">
        <form noValidate autoComplete="off">
          <TextField
            id="costbfr"
            label="増税前税抜価格"
            type = "number"
            value={Math.round(costbfr)}
            onChange={e=>{setCostbfr(e.target.value); setTaxbfr(e.target.value * 1.08);}}
            margin="normal"
          />
          <TextField
            id="taxbfr"
            label="増税前税込価格"
            type = "number"
            value={Math.round(taxbfr)}
            onChange={e=>{setCostbfr(e.target.value/1.08); setTaxbfr(e.target.value);}}
            margin="normal"
          />
          <br/>
          <TextField
            id="costafr"
            label="増税後税抜価格"
            type = "number"
            value={Math.round(costafr)}
            onChange={e=>{setCostafr(e.target.value); setTaxafr(e.target.value * 1.1);}}
            margin="normal"
          />
          <TextField
            id="taxafr"
            label="増税後税込価格"
            type = "number"
            value={Math.round(taxafr)}
            onChange={e=>{setCostafr(e.target.value/1.1); setTaxafr(e.target.value);}}
            margin="normal"
          />
         </form>
         <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>比較基準</TableCell>
                <TableCell align="right">値上げ価格</TableCell>
                <TableCell align="right">値上げ率</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  単純な値上げ幅
                </TableCell>
                <TableCell align="right">{Math.round(costafr-costbfr)}</TableCell>
                <TableCell align="right">{Math.round((costafr-costbfr)/costbfr * 100)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  原価上昇を考慮
                </TableCell>
                <TableCell align="right">{Math.round(costafr-costbfr * 1.1 /1.08)}</TableCell>
                <TableCell align="right">{Math.round((costafr-costbfr * 1.1 / 1.08) /costbfr * 100)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </main>
    </div>
  );
}

export default App;
