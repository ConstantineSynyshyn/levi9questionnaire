import { useEffect, useState } from 'react';

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { Props } from "./types";
import { DEFAULT_TIME_TO_RESPOND } from '@constants/configuration';

const Timer: React.FC<Props> = ({
	timeLeft,
	timeForResponse = DEFAULT_TIME_TO_RESPOND,
}) => {
	const [timer, setTimer] = useState(timeForResponse);
	useEffect(() => {
		setTimer(Math.round(timeLeft / timeForResponse * 100));
	}, [timeLeft]);

	return (
		<Box position="relative" display="inline-flex">
			<CircularProgress variant="determinate" color="primary" value={timer} />
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
			>
				<Typography variant="caption" component="div" color="textSecondary">{timeLeft}</Typography>
			</Box>
		</Box>
	)
};

export default Timer;