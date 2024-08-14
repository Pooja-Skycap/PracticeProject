import UserForm from "../../components/users/UserForm";
import { Box, Container } from "../../utils/commonImports";

const CreateUsers = () => {
  return (
    <Box
      sx={{
        minHeight: "93vh",
        backgroundColor: "#e9e9e9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 3,
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: 3,
          }}
        >
          <h1>User Form</h1>
          <UserForm />
        </Box>
      </Container>
    </Box>
  );
};

export default CreateUsers;
