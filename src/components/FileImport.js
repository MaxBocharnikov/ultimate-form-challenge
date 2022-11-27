import React from "react";
import { Controller } from "react-hook-form";
import Dropzone from "react-dropzone";
import { List, ListItem, Paper } from "material-ui";
import { ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { CloudUpload, InsertDriveFile } from "@material-ui/icons";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    color: "#333",
    padding: "10px",
    marginTop: "20px",
  },
  icon: {
    marginTop: "16px",
    color: "#888888",
    fontSize: "42px",
  },
}));

const FileImport = ({ control, name }) => {
  const styles = useStyles();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <MuiThemeProvider>
            <Dropzone onDrop={field.onChange} multiple>
              {({ getRootProps, getInputProps }) => (
                <Paper
                  variant="outlined"
                  className={styles.root}
                  {...getRootProps()}
                >
                  <CloudUpload className={styles.icon} />
                  <input
                    {...getInputProps()}
                    name={name}
                    onBlur={field.onBlur}
                  />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </Paper>
              )}
            </Dropzone>
            <List>
              {field.value.map((f, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={f.name} size={f.size} />
                </ListItem>
              ))}
            </List>
          </MuiThemeProvider>
        );
      }}
    ></Controller>
  );
};

export default FileImport;
