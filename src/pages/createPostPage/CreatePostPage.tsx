import {useForm} from "react-hook-form";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography
} from '@mui/material';

type CreatePostFields = {
  title: string;
  categories: string,
  postText: string;
  readTime: string;
  imagePath: string;
 }
export const CreatePostPage = () => {
  const fetchingData = false
  const {
    register, handleSubmit, reset, formState: { errors }
  } = useForm<CreatePostFields>({
    defaultValues: {
      title: '',
      categories: '',
      postText: '',
      readTime: '',
      imagePath: ''
    }
  });

  const onSubmit = async (
    data : CreatePostFields
  ) => {
    console.log(data)
    reset()
  };
  return (
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
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
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
          {...register('postText', {
            required: 'Required field',
          })}
          error={!!errors.postText}
          helperText={errors.postText?.message}
          required
          fullWidth
          name="postText"
          label="Post Text"
          type="postText"
          id="postText"
          autoComplete="postText"
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
          {...register('imagePath', {
            required: 'Required field',
          })}
          error={!!errors.imagePath}
          helperText={errors.imagePath?.message}
          required
          fullWidth
          name="imagePath"
          label="Image Path"
          type="imagePath"
          id="imagePath"
          autoComplete="imagePath"
          disabled={fetchingData}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          CREATE
        </Button>
        {fetchingData && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
      </Box>
    </Box>
  )
};
