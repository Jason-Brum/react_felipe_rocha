import { useSearchParams } from "react-router-dom";
import AddTask from "../components/AddTask";
import { ChevronLeftIcon } from "lucide-react";

function TaskPage() {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <div className="flex justify-center relative mb-6">
            <button className="absolute left-0 top-0 p-2 text-slate-100" onClick={() => window.history.back()}>
                <ChevronLeftIcon />
            </button>
        </div>
        <h1 className="text-slate-100 text-3xl font-bold text-center">
          Detalhes da tarefa
        </h1>

        <div className="bg-slate-200 p-4 rounded-md shadow">
          <h2 className="text-xl  font-bold text-slate-600">{title}</h2>
          <p className="text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
