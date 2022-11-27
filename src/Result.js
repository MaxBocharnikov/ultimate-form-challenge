import React, { useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  ListItemIcon,
  ListItemText,
  makeStyles,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from "@material-ui/core";
import {
  List,
  ListItem,
  MuiThemeProvider,
  Table,
  TableBody,
  TableRow,
} from "material-ui";
import Paper from "@material-ui/core/Paper";
import MainContainer from "./components/MainContainer";
import { useData } from "./DataContext";
import { InsertDriveFile } from "@material-ui/icons";
import PrimaryButton from "./components/PrimaryButton";

const useStyles = makeStyles({
  root: {
    marginBottom: "30px",
  },
  table: {
    marginBottom: "30px",
  },
  link: {
    textAlign: "center",
    display: "block",
  },
});

const Result = () => {
  const [success, setSuccess] = useState(false);
  const { data } = useData();
  const styles = useStyles();

  const onSubmit = async () => {
    console.log("here");
    const formData = new FormData();
    if (data.files) {
      data.files.forEach((f) => {
        formData.append("files", f, f.name);
      });
    }
    entries.forEach((entry) => {
      formData.append(entry[0], entry[1]);
    });

    const res = await fetch("http://localhost:4000/", {
      method: "POST",
      body: formData,
    });

    if (res.status === 200) {
      Swal.fire("Great job!", "You've passed the challenge!", "success");
      setSuccess(true);
    }
  };

  const entries = Object.entries(data)
    .filter((entry) => entry[0] !== "files")
    .map(([k, v]) => [k, v.toString()]);
  const { files } = data;

  if (success) {
    return <Confetti />;
  }

  return (
    <MuiThemeProvider>
      <MainContainer>
        <Typography component="h2" variant="h5">
          📋 Form Values
        </Typography>
        <TableContainer className={styles.table} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody displayRowCheckbox={false}>
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell>{entry[0]}</TableCell>
                  <TableCell align="right">{entry[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {files && (
          <>
            <Typography component="h2" variant="h5">
              📦 Files
            </Typography>
            <List>
              {files.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} secondary={f.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </MainContainer>
      <PrimaryButton onClick={onSubmit}>Submit</PrimaryButton>
      <Link className={styles.link} to="/">
        Start over
      </Link>
    </MuiThemeProvider>
  );
};

export default Result;
