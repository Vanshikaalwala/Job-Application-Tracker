"use client"

import { Board,Column } from "@/lib/models/models.types";
import { Award, Calendar, CheckCircle2, Mic, MoreVertical, Trash2, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import JobApplicationDialog from "./job-application-dialog";

interface KanbanBoardProps{
  board: Board;
  userId: string;
}

interface colconfig{
  color:string, icon: React.ReactNode
}

const COL_CONFIG: Array<colconfig> = [
  {
    color: "bg-cyan-500",
    icon: <Calendar />
  },
  {
    color: "bg-purple-500",
    icon: <CheckCircle2  className=" h-4 w-4"/>
  },
  {
    color: "bg-green-500",
    icon: <Mic  className=" h-4 w-4"/>
  },
  {
    color: "bg-yellow-500",
    icon: <Award  className=" h-4 w-4"/>
  },
  {
    color: "bg-red-500",
    icon: <XCircle  className=" h-4 w-4"/>
  },
]

function DropableColumn({column,config,boardId}:{column:Column; config:colconfig; boardId: string }){
  // console.log(column);
  return (
  <Card className=" min-w-[300px] shrink-0 shadow-md p-0">
    <CardHeader className={`${config.color} text-white pb-3 pt-3`}>
      <div className=" flex items-center justify-between">
        <div className=" flex items-center gap-2">
          {config.icon}
          <CardTitle className=" text-base font-semibold">{column.name}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className=" h-6 w-6 hover:bg-white/20">
              <MoreVertical className=" h-4 w-4"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><Trash2/>delete column</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </CardHeader>

    <CardContent className=" space-y-2 pt-2 min-h-[400px] bg-gray-50/50 rounded-b-lg">

        <JobApplicationDialog columnId={column._id} boardId={boardId}/>
    </CardContent>
  </Card>
  )
}

export default function KanbanBoard({board, userId}: KanbanBoardProps){
  const columns = board.columns;
  return(
    <>
      <div>
        <div>
          {columns.map((col,key)=>{
            const config= COL_CONFIG[key] || {
                color: "bg-gray-500",
                icon: <Calendar  className=" h-4 w-4"/>
            };
            return(
              <DropableColumn key={key} column={col} config={config} boardId={board._id}/>
            );
          })}
        </div>
      </div>
    </>
  );
}

