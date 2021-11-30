import WorkCounter from "../components/workcounter";
import WorkSummary from "../components/worksummary";

const Employee = () => {
    let currentSessionTime;

  return (
    <div>
      <WorkCounter sessionTime={currentSessionTime} />
      <WorkSummary sessionTime={currentSessionTime} />
    </div>
  );
};

export default Employee;
