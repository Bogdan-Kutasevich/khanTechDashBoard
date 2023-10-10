import {useForm} from "react-hook-form";
import {Box, Button, LinearProgress, TextField, Typography} from '@mui/material';
import {UploadImage} from "../../components/uploadImage/UploadImage.tsx";
import styles from './CreatePostPage.module.css'
import {useEffect, useState} from "react";
import axios from "axios";
import {NotificationSuccess} from "../../components/notificationSuccess/NotificationSuccess.tsx";
import {isTypicalError} from "../../utils/errorTypeHelper.ts";
import {NotificationError} from "../../components/notificationError/NotificationError.tsx";

type CreatePostFields = {
  title: string;
  categories: string,
  postText: string;
  readTime: string;
  image: string;
 }

export const CreatePostPage = () => {
  const [imagePath, setImagePath] = useState('');
  const [fetchingData, setFetchingData] = useState(false);
  const [fetchingError, setFetchingError] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('')
  const [openErrorSnackBar, setErrorOpenSnackBar] = useState(false);

  const handleOpenSnackBar = () => {
    setOpenSnackBar(true);
  };
  const handleCloseSnackBar = () => {
    setOpenSnackBar(false);
  };

  const handleErrorOpenSnackBar = () => {
    setErrorOpenSnackBar(true);
  };
  const handleErrorCloseSnackBar = () => {
    setErrorOpenSnackBar(false);
  };

  const handleSetImagePath = (path: string) => {
    setImagePath(path)
  }

  const {
    register,
    setValue, watch,
    handleSubmit, reset,
    formState: { errors }
  } = useForm<CreatePostFields>({
    defaultValues: {
      title: '',
      categories: '',
      postText: '',
      readTime: '',
      image: ''
    }
  });

  const selectValue = watch('image');

  const onSubmit = async (
    data : CreatePostFields
  ) => {
    try {
      const token = localStorage.getItem('khanAuthToken');
      setFetchingData(true)
      await axios({
        method: 'POST',
        url: 'http://localhost:3001/post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data
      });
      setSnackBarMessage('created successfully')
      handleOpenSnackBar()
      reset();
      setImagePath('')
      setFetchingData(false)
    } catch (error) {
      if (isTypicalError(error)) {

        setFetchingError(error.data.message);
      } else {
        setFetchingError('sorry, something went wrong');
      }
      handleErrorOpenSnackBar()
      setFetchingData(false)
    }
  };

  useEffect(() => {
    setValue('image', imagePath);
  }, [imagePath]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        <Typography component="h1" variant="h5">
          Create post
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            gap: 2,
            width: '100%'
          }}
        >
          <TextField
            {...register('title', {
              required: 'Required field',
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoComplete="title"
            disabled={fetchingData}
          />
          <TextField
            {...register('categories', {
              required: 'Required field',
            })}
            error={!!errors.categories}
            helperText={errors.categories?.message}
            required
            fullWidth
            name="categories"
            label="Categories"
            type="categories"
            id="categories"
            autoComplete="categories"
            disabled={fetchingData}
          />
          <TextField
            {...register('readTime', {
              required: 'Required field',
            })}
            error={!!errors.readTime}
            helperText={errors.readTime?.message}
            required
            fullWidth
            name="readTime"
            label="Read Time"
            type="readTime"
            id="readTime"
            autoComplete="readTime"
            disabled={fetchingData}
          />
          <TextField
            {...register('postText', {
              required: 'Required field',
            })}
            error={!!errors.postText}
            helperText={errors.postText?.message}
            multiline
            maxRows={4}
            required
            aria-label="postText"
            name="postText"
            label="Post Text"
            type="postText"
            id="postText"
            autoComplete="postText"
            disabled={fetchingData}
            style={{width: '100%'}}
           />
          <TextField
            {...register('image', {
              required: 'Required field',
            })}
            error={!!errors.image}
            helperText={errors.image?.message}
            required
            fullWidth
            name="image"
            label="Upload image to get path"
            type="imagePath"
            id="image"
            autoComplete="image"
            value={selectValue}
          />
          <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}>
            <UploadImage handleSetImagePath={handleSetImagePath}/>
            <Button
              type="submit"
              variant="outlined"
            >
              CREATE
            </Button>
          </Box>
          {imagePath && (
            <Box sx={{borderRadius: '5px', justifySelf: 'start'}}>
              <img src={imagePath} alt='image' className={styles.image}/>
            </Box>
          )}

          {fetchingData && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          )}
        </Box>
      </Box>
      <NotificationSuccess handleCloseSnackBar={handleCloseSnackBar} message={snackBarMessage} openSnackBar={openSnackBar} />
      <NotificationError handleCloseSnackBar={handleErrorCloseSnackBar} message={fetchingError} openSnackBar={openErrorSnackBar}/>
  </>
  )
};
