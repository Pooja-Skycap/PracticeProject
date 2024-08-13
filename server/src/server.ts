import app from "./app";
const PORT = process.env.PORT || 5400;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
