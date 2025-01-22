import ControlledSelectMenu from "../../../components/ControlledSelectMenu";
import SelectMenu from "../../../components/ui/SelectMenu";

const QuestionManagement = () => {
  return (
    <div>
      <SelectMenu
        label="أنواع البحوث"
        options={[
          {
            label: "البحث الإجتماعي الأولي",
            options: "",
          },
        ]}
      />
    </div>
  );
};

export default QuestionManagement;
