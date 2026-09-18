export type Task = {
  id: string;
  title: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type KanbanColumnProps = {
  id: string;
  index: number;
  columnTitle: string;
  accentColor: string;
  bgColor: string;
  tasks: Task[];
};