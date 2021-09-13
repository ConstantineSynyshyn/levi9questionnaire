import React from "react";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import usePostFile from "./usePostFile";

// @TODO will be splited on component-container way of working
const FileUploadButton: React.FC = () => {
  const [fileSrc, setFileSrc] = React.useState("");
  const name = "file";
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);
  const [uploadInfo, handleUpload] = usePostFile();
  const onButtonClick = React.useCallback(
    (e) => {
      inputRef?.current?.click();
    },
    [inputRef]
  );
  const handleChange = React.useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (target?.files) {
        setFileSrc(target?.files?.[0].name);
        const file = target?.files?.[0];
        const formData = new FormData();

        formData.append(target?.name, file);

        handleUpload(formData);

        formRef.current?.reset();
        return;
      }
      setFileSrc("");
    },
    [handleUpload]
  );
  return (
    <form ref={formRef}>
      <Button onClick={onButtonClick} variant="contained" color="primary">
        Upload questions
      </Button>
      <label htmlFor={name}>
        <Box>
          <input
            name={name}
            type="file"
            id={name}
            src={fileSrc}
            ref={inputRef}
            onChange={handleChange}
            style={{ display: "none" }}
            multiple={false}
          />
        </Box>
      </label>
    </form>
  );
};

export default FileUploadButton;
