import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "@base-ui/react/button";
import { useSortable } from "@dnd-kit/react/sortable";

import {Trash} from 'lucide-react';

import type { Task, KanbanColumnProps } from "@/types/kanban.ts";


type KanbanTaskProps = Task & { index: number };

function KanbanTask({ id, status, title, updatedAt, createdAt, index }: KanbanTaskProps) {

  const { ref, isDragging } = useSortable({ id, index, type: "Task", accept: "Task" });

  function getBadgeColor(status: string) {

    if (status === "Backlog") return 'bg-red-400';
    if (status === "To-Do") return 'bg-blue-400';
    if (status === "In Progress") return 'bg-orange-400';
    if (status === "Done") return 'bg-green-500';

      return 'bg-gray-500';

  }

  return (
    <div ref={ref} className={`${isDragging ? 'opacity-60' : ''}`}>
      <Card key={id} id={id} className="bg-white flex items-center cursor-grab">
        <CardHeader className="flex items-center">
          <Badge className={getBadgeColor(status)}>{status}</Badge>
          <Button className="bg-gray-400 hover:bg-gray-500 rounded-xl h-5 pl-2 pr-2"><Trash size={16} color="white" /></Button>
          <p>{index + 1}</p>
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