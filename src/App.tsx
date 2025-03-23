import LoadingComponent from "./components/LoadingComponent";
import Box from "./components/ui/Box";
import Router from "./router";

const App = () => {
  return (
    <Box className="min-h-screen">
      <Router />
      <LoadingComponent />
    </Box>
  );
};

export default App;
