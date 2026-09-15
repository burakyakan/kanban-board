import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import KanbanBoard from "./KanbanBoard";

function App() {

  let test = 5;
  let number: number[] = [1, 2, 3];
  let messi: string[] = ["messi", "ronaldo"];

  messi.forEach(n => n.endsWith("@stu.yasar.edu.tr"));

  let burak: boolean = true;

  if (typeof burak === 'boolean') {

  }

  return (
    <div>

      <div>
        <Input placeholder="Add New Task..."></Input>
        <Button>Add Task</Button>
      </div>

    </div>
  )
}

export default App
