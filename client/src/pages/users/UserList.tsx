import {
  useEffect,
  useSelector,
  useDispatch,
  DataGrid,
  GridColDef,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  toast,
  ToastContainer,
  EditButton,
  DeleteButton,
  IconButton,
  useState,
  useNavigate,
} from "../../utils/commonImports";
import "react-toastify/dist/ReactToastify.css";
import { RootState, AppDispatch } from "../../store/configureStore";
import { deleteUser, fetchUsers } from "../../store/users/thunk";
import { clearAlert } from "../../store/users/slice";
import {
  FormHeading,
  InnerContainer,
  StyledBox,
  UserContainer,
} from "./UserListStyle";

const UserList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const alert = useSelector((state: RootState) => state.users.alert);
  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  //const alertShown = useRef(false);

  useEffect(() => {
    dispatch(fetchUsers());
    console.log("dispatch", dispatch(fetchUsers()));
  }, []);

  useEffect(() => {
    if (alert.message) {
      toast.dismiss();
      if (alert.type === "success") {
        toast.success(alert.message);
      } else if (alert.type === "error") {
        toast.error(alert.message);
      }

      dispatch(clearAlert());
    }
  }, [alert]);

  const usersWithIndex = users.map((user, index) => ({
    ...user,
    index,
  }));

  const handleEdit = (userId: string) => {
    navigate(`/createUser/${userId}`);
  };

  const handleDeleteClick = (userId: string) => {
    setUserToDelete(userId);
    setOpenDialog(true);
  };

  const handleDelete = () => {
    if (userToDelete) {
      try {
        dispatch(deleteUser(userToDelete)).unwrap();
        setOpenDialog(false);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    {
      field: "index",
      headerName: "ID",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => params.row.index + 1,
    },
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "age", headerName: "Age", flex: 1, minWidth: 100 },
    { field: "address", headerName: "Address", flex: 2, minWidth: 200 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        const status = params.value;
        const color = status === "active" ? "#0ba30b" : "#e92a2a";

        return (
          <Button
            variant="contained"
            style={{ backgroundColor: color, color: "white" }}
          >
            {status}
          </Button>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={() => handleEdit(params.row._id)}
            color="primary"
          >
            <EditButton />
          </IconButton>
          <IconButton
            onClick={() => handleDeleteClick(params.row._id)}
            color="error"
          >
            <DeleteButton />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <UserContainer>
      <InnerContainer>
        <StyledBox>
          <FormHeading variant="h4" gutterBottom>
            User List
          </FormHeading>
          <DataGrid
            getRowId={(row) => row._id}
            rows={usersWithIndex}
            columns={columns}
            checkboxSelection
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
              sorting: {
                sortModel: [{ field: "username", sort: "asc" }],
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </StyledBox>
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
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this user?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </InnerContainer>
    </UserContainer>
  );
};

export default UserList;
