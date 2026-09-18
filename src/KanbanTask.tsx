import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "@base-ui/react/button";
import { useSortable } from "@dnd-kit/react/sortable";

import type { Task, KanbanColumnProps } from "@/types/kanban.ts";


type KanbanTaskProps = Task & { index: number };

function KanbanTask({ id, status, title, updatedAt, createdAt, index }: KanbanTaskProps) {

  const { ref, isDragging } = useSortable({ id, index, type: "Task", accept: "Task" });

  return (
    <div ref={ref} data-dragging={isDragging}
      className={'Task'}>
      <Card key={id} id={id} className="bg-white flex items-center">
        <CardHeader className="flex items-center">
          <Badge>{status}</Badge>
          <Button className="bg-red-400 rounded-xl w-25">Delete Task</Button>
        </CardHeader>
        <CardContent className="text-2xl">
          <p>{title} + {id}</p>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p>Updated: {updatedAt}</p>
          <p>Created: {createdAt}</p>
        </CardFooter>
      </Card>

    </div>
  );

}

export default KanbanTask