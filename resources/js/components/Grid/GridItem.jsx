import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

const style = {
  grid: {
    padding: "0 15px !important"
  }
};

function GridItem({ ...props }) {
  const { gridClass, classes, children, ...rest } = props;
  return (
    <Grid item {...rest} className={classNames(classes.grid, gridClass)}>
      {children}
    </Grid>
  );
}

export default withStyles(style)(GridItem);
