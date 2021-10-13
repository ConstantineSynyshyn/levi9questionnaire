import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React  from 'react';

import { OrderDirection } from '@constants/configuration';

interface Props {
  active: boolean;
  direction?: OrderDirection;
  title: string;
  onClick: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const SortableCell: React.FC<Props> = (props) => {
  const { active, direction, title, onClick } = props;
  const classes = useStyles();
  return (
    <TableCell>
      <TableSortLabel
        active={active}
        direction={direction || OrderDirection.ASC}
        onClick={onClick}
      >
        {title}
        {active && (
          <span className={classes.visuallyHidden}>
            {direction === OrderDirection.DESC ? 'sorted descending' : 'sorted ascending'}
          </span>
        )}
      </TableSortLabel>
    </TableCell>
  )
}

export default React.memo(SortableCell)
