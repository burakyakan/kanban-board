import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function KanbanAddTaskMenu() {


  return (
    <div>
      <div className="flex items-center gap-4">
        <Input type="text" placeholder="Add a task..." className="max-w-md w-3xl" />
        <Button>Add Task</Button>
      </div>
    </div>

  );
}

export default KanbanAddTaskMenu