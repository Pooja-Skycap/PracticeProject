import { AppDispatch, RootState } from "../../store/configureStore";
import { fetchUserById, submitUser, updateUser } from "../../store/users/thunk";
import {
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
  toast,
  ToastContainer,
  useEffect,
  useSelector,
  useNavigate,
  useParams,
} from "../../utils/commonImports";
import "react-toastify/dist/ReactToastify.css";
import { userSchema, UserFormValues } from "../../utils/validationSchema";
import { clearAlert } from "../../store/users/slice";
import TextFieldInput from "./TextFieldInput";

const UserForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  console.log("userId", userId);
  const dispatch = useDispatch<AppDispatch>();
  const alert = useSelector((state: RootState) => state.users.alert);
  const user = useSelector((state: RootState) => state.users.user);
  const status = useSelector((state: RootState) => state.users.status);

  const {
    control,
    handleSubmit,
    reset,
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

  useEffect(() => {
    if (userId) {
      const result = dispatch(fetchUserById(userId));
      console.log("result", result);
    } else {
      reset({
        name: "",
        age: 0,
        address: "",
        status: "active",
      });
    }
    return () => {
      dispatch(clearAlert());
      reset();
    };
  }, [userId, dispatch, reset]);

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        age: user.age || 0,
        address: user.address || "",
        status: user.status || "active",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UserFormValues) => {
    try {
      if (userId) {
        const result = await dispatch(
          updateUser({ userId, userData: { ...data, _id: userId } })
        ).unwrap();
        console.log("User updated:", result);
      } else {
        await dispatch(submitUser(data)).unwrap();
      }
      navigate("/users");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    if (alert.message) {
      if (alert.type === "success") {
        toast.success(alert.message);
      } else if (alert.type === "error") {
        toast.error(alert.message);
      }
      dispatch(clearAlert());
    }
  }, [alert, dispatch]);

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
        {status === "loading" && <div>Loading...</div>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextFieldInput
            name="name"
            control={control}
            label="Name"
            errors={errors}
          />
          <TextFieldInput
            name="age"
            control={control}
            label="Age"
            type="number"
            errors={errors}
          />
          <TextFieldInput
            name="address"
            control={control}
            label="Address"
            errors={errors}
          />

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
            {userId ? "Update" : "Submit"}
          </Button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </Container>
  );
};

export default UserForm;
