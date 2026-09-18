import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import KanbanBoard from "./KanbanBoard";

import { DragDropProvider } from "@dnd-kit/react";

function App() {


  return (
    <div>


      <div>
        <KanbanBoard></KanbanBoard>
      </div>

    </div>
  )
}

export default App
