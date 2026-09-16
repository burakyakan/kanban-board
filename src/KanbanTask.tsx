import { Card, CardHeader, CardContent, CardFooter } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "@base-ui/react/button";



function KanbanTask(props: any) {



  return (
    <div>
      <Card key={props.id} className="bg-white flex items-center">
        <CardHeader className="flex items-center">
          <Badge>{props.status}</Badge>
          <Button className="bg-red-400 rounded-xl w-25">Delete Task</Button>
        </CardHeader>
        <CardContent className="text-2xl">
          <p>{props.title}</p>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p>Updated: {props.updatedAt}</p>
          <p>Created: {props.createdAt}</p>
        </CardFooter>
      </Card>

    </div>
  );

}

export default KanbanTask