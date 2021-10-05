import { useEffect, useState, useRef } from "react";
import { toPng } from 'html-to-image';
import { Skeleton } from '@material-ui/lab';
import { makeStyles, Theme } from "@material-ui/core";
import Image from "next/image";

interface Props { }

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    position: 'relative'
  },
  skeletonWrapper: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.default,
  },
  skeleton: {
    height: '100%'
  }
}));

const QuestionNodeImageWrapper: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState('');
  const nodeRef = useRef(null);

  useEffect(() => {
    (async function () {
      const element = (nodeRef.current as unknown) as HTMLElement;
      if (element) {
        const value = await toPng(element, {
          width: element.clientWidth,
          height: element.clientHeight,
          pixelRatio: 1,
        });
        setImageSrc(value)
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }
    })()
  }, [nodeRef])


  return (
    <>
      {imageSrc && <Image
        src={imageSrc}
        alt="Node image"
        width={((nodeRef?.current as unknown) as HTMLElement)?.clientWidth}
        height={((nodeRef?.current as unknown) as HTMLElement)?.clientHeight}
      />}
      <div className={classes.wrapper}>
        <div className={classes.skeletonWrapper}>
          <Skeleton variant="rect" className={classes.skeleton} />
        </div>
        <div ref={nodeRef}>
          {children}
        </div>
      </div>
    </>
  )
};

export default QuestionNodeImageWrapper;