import {
  useEffect,
  useSelector,
  useDispatch,
  DataGrid,
  GridColDef,
  Box,
  Typography,
} from "../../utils/commonImports";

import { RootState, AppDispatch } from "../../store/configureStore";
import { fetchUsers } from "../../store/users/thunk";

const columns: GridColDef[] = [
  {
    field: "index",
    headerName: "ID",
    width: 80,
    renderCell: (params) => params.row.index + 1,
  },
  { field: "name", headerName: "Name", width: 200 },
  { field: "age", headerName: "Age", width: 200 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
];
const UserList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  console.log("users", users);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const usersWithIndex = users.map((user, index) => ({
    ...user,
    index,
  }));
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        User List
      </Typography>
      <DataGrid
        getRowId={(row) => row._id}
        rows={usersWithIndex}
        columns={columns}
        checkboxSelection
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 },
          },
          sorting: {
            sortModel: [{ field: "username", sort: "asc" }],
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
};

export default UserList;
