import {ChangeEvent, useContext, useEffect, useState} from "react";
import {Button, CircularProgress, styled} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {NotificationContext} from "../../context/NotificationContext.tsx";
import {api} from "../../services/apiService/apiService.ts";

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
  const { handleSetSnackBarError, handleErrorOpenSnackBar} = useContext(NotificationContext)


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
        handleSetSnackBarError('Choose image first')
        handleErrorOpenSnackBar()
        setFetching(false)
        return;
      }

      const formData = new FormData();
      formData.append('image', selectedFile);
      await api.uploadImage(formData)
      const path = `http://localhost:3001/${selectedFile.name}`;
      handleSetImagePath(path);
    } catch (error) {
      handleSetSnackBarError('upload false try again')
      handleErrorOpenSnackBar()
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
    </>
  )
};
