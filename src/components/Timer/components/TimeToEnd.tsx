import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

interface Props {
  onClick: () => void;
  linkClass: string;
}

const TimeToEnd: React.FC<Props> = (props) => {
  const { onClick, linkClass, children } = props;
  return (
    <Grid container direction="row" spacing={1}>
      <Grid item>
        <Typography variant="body1">
          Time to finalize{" "}
          <Link onClick={onClick} className={linkClass}>
            quiz
          </Link>
          :
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">{children}</Typography>
      </Grid>
    </Grid>
  );
};

export default TimeToEnd;
