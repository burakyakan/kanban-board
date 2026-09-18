import KanbanAddTaskMenu from "./KanbanAddTaskMenu";
import KanbanColumn from "./KanbanColumn";
import { DragDropProvider, type DragOverEvent } from "@dnd-kit/react";
import initialTasks from "./tasks.json";

import { useState } from "react";

import { move } from "@dnd-kit/helpers";

const columns = [
  { id: "backlog", status: "Backlog" },
  { id: "toDo", status: "To-Do" },
  { id: "inProgress", status: "In Progress" },
  { id: "done", status: "Done" },
];

function KanbanBoard() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleDragOver(event: DragOverEvent) {
    const targetId = String(event.operation.target?.id ?? "");
    const destinationStatus =
      columns.find((column) => column.id === targetId)?.status ??
      tasks.find((task) => task.id === targetId)?.status;

    if (!destinationStatus) return;

    setTasks((currentTasks) => {
      const movedTasks = move(currentTasks, event);

      return movedTasks.map((task) =>
        task.id === String(event.operation.source?.id ?? "")
          ? { ...task, status: destinationStatus }
          : task
      );
    });
  }

  return (
    <div>
      <div className="flex justify-center m-10">
        <KanbanAddTaskMenu></KanbanAddTaskMenu>
      </div>

      <DragDropProvider onDragOver={handleDragOver}>
        <div className="flex gap-5 justify-center">
  
            <KanbanColumn
              key={'backlog'}
              id="backlog"
              index={1}
              columnTitle="Backlog"
              accentColor="#F87171"
              bgColor="#FDF2F2"
              tasks={tasks.filter((task) => task.status === "Backlog")}
            />

            <KanbanColumn
              key={'toDo'}
              id="toDo"
              index={2}
              columnTitle="To-Do"
              accentColor="#60A5FA"
              bgColor="#F0F7FF"
              tasks={tasks.filter((task) => task.status === "To-Do")}
            />

            <KanbanColumn
              key={'inProgress'}
              id="inProgress"
              index={3}
              columnTitle="In Progress"
              accentColor="#FB923C"
              bgColor="#FFF7ED"
              tasks={tasks.filter((task) => task.status === "In Progress")}
            />

            <KanbanColumn
              key={'done'}
              id="done"
              index={4}
              columnTitle="Done"
              accentColor="#4ADE80"
              bgColor="#F0FDF4"
              tasks={tasks.filter((task) => task.status === "Done")}
            />
  
        </div>
      </DragDropProvider>

    </div>
  );
}

export default KanbanBoard