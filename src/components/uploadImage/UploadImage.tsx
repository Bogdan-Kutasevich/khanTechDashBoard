import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Button, CircularProgress, styled} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {NotificationSuccess} from "../notificationSuccess/NotificationSuccess.tsx";

type UploadImageProps = {
  handleSetImagePath: (path: string) => void;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const UploadImage = ({handleSetImagePath}: UploadImageProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFetching, setFetching] = useState(false)
  const [fetchError, setFetchError] = useState('')
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file)
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUpload();
    }
  }, [selectedFile]);
  const handleUpload = async () => {
    setFetching(true)
    try {
      if (!selectedFile) {
        setFetchError('Choose image first')
        handleOpenSnackBar()
        setFetching(false)
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const path = `http://localhost:3001/${selectedFile.name}`;
      handleSetImagePath(path);
      setFetching(false)
    } catch (error) {
      setFetchError('upload false')
      handleOpenSnackBar()
    } finally {
      setFetching(false)
    }
  };

  return (
    <>
      <Button component="label" variant="outlined" startIcon={<CloudUploadIcon />}>
        Choose image
        <VisuallyHiddenInput type="file" onChange={(event) => handleFileChange(event)}/>
      </Button>
      {isFetching && <CircularProgress />}
      <NotificationSuccess handleCloseSnackBar={handleCloseSnackBar} message={fetchError} openSnackBar={openSnackBar} />
    </>
  )
};
