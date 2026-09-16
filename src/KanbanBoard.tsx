import KanbanAddTaskMenu from "./KanbanAddTaskMenu";
import KanbanColumn from "./KanbanColumn";
import tasks from "./tasks.json";

function KanbanBoard() {
  return (
    <div className="">
      <div className="taskBoard">
        <KanbanAddTaskMenu></KanbanAddTaskMenu>
      </div>

      <div className="flex gap-5">
        <div>
          <KanbanColumn
            id="backlog-column"
            columnTitle="Backlog"
            accentColor="#F87171"
            bgColor="#FDF2F2"
            tasks={tasks.filter((task) => task.status === "Backlog")}
          />
        </div>
        <div>
          <KanbanColumn
            id="to-do-column"
            columnTitle="To-Do"
            accentColor="#60A5FA"
            bgColor="#F0F7FF"
            tasks={tasks.filter((task) => task.status === "To-Do")}
          />
        </div>
        <div>
          <KanbanColumn
            id="in-progress-column"
            columnTitle="In Progress"
            accentColor="#FB923C"
            bgColor="#FFF7ED"
            tasks={tasks.filter((task) => task.status === "In Progress")}
          />
        </div>
        <div>
          <KanbanColumn
            id="done"
            columnTitle="Done"
            accentColor="#4ADE80"
            bgColor="#F0FDF4"
            tasks={tasks.filter((task) => task.status === "Done")}
          />
        </div>
      </div>
    </div>
  );
}

export default KanbanBoard