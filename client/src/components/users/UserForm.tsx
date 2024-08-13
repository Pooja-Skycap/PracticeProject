import { RootState } from "../../store/configureStore";
import { submitUser } from "../../store/users/thunk";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  zodResolver,
  useForm,
  Controller,
  Box,
  Container,
  useDispatch,
} from "../../utils/commonImports";
import { userSchema, UserFormValues } from "../../utils/validationSchema";

const UserForm = () => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      age: 0,
      address: "",
      status: "active",
    },
  });
  const onSubmit = async (data: UserFormValues) => {
    try {
      const result = await dispatch(submitUser(data) as any);
      console.log("Form Data:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl fullWidth margin="normal" error={!!errors.name}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.age}>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Age"
                  type="number"
                  variant="outlined"
                  error={!!errors.age}
                  helperText={errors.age?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.address}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address"
                  variant="outlined"
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal" error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select {...field} label="Status" error={!!errors.status}>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                </Select>
              )}
            />
            {errors.status && (
              <FormHelperText>{errors.status.message}</FormHelperText>
            )}
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default UserForm;
