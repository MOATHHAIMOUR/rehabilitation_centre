import Box from "../../components/ui/Box";
import { Outlet } from "react-router-dom";

const FirstResearshPage = () => {
  return (
    <Box className="px-8 py-5 flex flex-col gap-8">
      <Box className="flex items-center gap-4">
        <img className="w-20" src="/src/assets/images/exam.png" />
        <h1 className="text-4xl font-semibold">البحث الأولي</h1>
      </Box>
      <Outlet />
    </Box>
  );
};

export default FirstResearshPage;
