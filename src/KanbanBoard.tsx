import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import KanbanAddTask from "./KanbanAddTask";
import KanbanColumn from "./KanbanColumn";

function KanbanBoard() {
  return (
    <div>
      <div className="taskBoard">
        <KanbanAddTask></KanbanAddTask>
      </div>

      <div>
        <div>
          <KanbanColumn></KanbanColumn>
        </div>
        
      </div>
    </div>

  );
}

export default KanbanBoard