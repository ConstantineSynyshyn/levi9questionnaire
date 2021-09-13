import { useCallback, useState } from "react";

interface UploadInfoType {
  result?: ReadonlyArray<any>;
  isLoading: boolean;
  isSuccess?: boolean;
  error?: any;
}

const UPLOAD_QUESTION_URL = "/api/upload-questions";

const initialState = { isLoading: false };

const usePostFile = (): [UploadInfoType, (formData: FormData) => void] => {
  const [uploadInfo, setUploadInfo] = useState<UploadInfoType>(initialState);
  const handleUpload = useCallback((formData: FormData) => {
    setUploadInfo({ isLoading: true, result: [] });
    fetch(UPLOAD_QUESTION_URL, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.body)
      .then((body) => {
        setUploadInfo({ isLoading: false, isSuccess: true });
      })
      .catch((error) => {
        setUploadInfo({ error, isLoading: false, isSuccess: false });
        console.log("upload failed", error);
      });
  }, []);
  return [uploadInfo, handleUpload];
};

export default usePostFile;
