import { useDroppable } from "@dnd-kit/react";
import { Card, CardTitle, CardHeader, CardContent } from "./components/ui/card";
import KanbanTask from "./KanbanTask.tsx";

import type { Task, KanbanColumnProps } from "@/types/kanban.ts";
import { useSortable } from "@dnd-kit/react/sortable";


function KanbanColumn(props: KanbanColumnProps) {

  const { ref } = useDroppable({
    id: props.id,
    type: "Column",
    accept: ["Task"]
  });

  return (
    <div ref={ref} className="Column">
      <Card className="p-5 rounded-4xl w-80 min-h-78" style={{ backgroundColor: props.bgColor }}>
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl" style={{ color: props.accentColor }}>
            {props.columnTitle}
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col gap-5">
          {props.tasks.map(({ id, title, status, createdAt, updatedAt }, index) => (
            <KanbanTask
              key={id}
              id={id}
              title={title}
              status={status}
              createdAt={createdAt}
              updatedAt={updatedAt}
              index={index}
            />
          ))}
        </div>


      </Card>
    </div>
  );
}

export default KanbanColumn