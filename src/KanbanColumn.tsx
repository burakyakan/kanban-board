import { Card, CardTitle, CardHeader } from "./components/ui/card";
import KanbanTask from "./KanbanTask.tsx";

type Task = {
  id: string;
  title: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

type KanbanColumnProps = {
  id: string;
  columnTitle: string;
  accentColor: string;
  bgColor: string;
  tasks: Task[];
};

function KanbanColumn(props: KanbanColumnProps) {
  return (
    <div>
      <Card className="p-5 rounded-4xl w-80 min-h-78" style={{ backgroundColor: props.bgColor }}>
        <CardHeader>
          <CardTitle className="text-center font-bold text-2xl" style={{ color: props.accentColor }}>
            {props.columnTitle}
          </CardTitle>
        </CardHeader>
        {props.tasks.map(({ id, title, status, createdAt, updatedAt }) => (
          <KanbanTask
            key={id}
            id={id}
            title={title}
            status={status}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        ))}
      </Card>
    </div>
  );
}

export default KanbanColumn