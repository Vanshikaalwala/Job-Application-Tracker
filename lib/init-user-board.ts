import connectDB from "./db";
import {Board,Column} from "./models";

const DEFAULT_COLUMN = [
    {name:"Wishlist",order: 0},
    {name:"Applied",order: 1},
    {name:"Interviewing",order: 2},
    {name:"Offer",order: 3},
    {name:"Rejected",order: 4},
]

export async function initializeUserBoard(userId: string){
    try{
        await connectDB();

        //check if board exists
        const existingBoard = await Board.findOne({userId: userId, name:"Job Hunt"})

        if(existingBoard){
            return existingBoard;
        }
        //else create a board
        const board = await Board.create({
            name: "Job Hunt",
            userId,
            columns: []
        })

        //create default column
        const column = await Promise.all(
            DEFAULT_COLUMN.map((col)=>{
                return Column.create({
                    name: col.name,
                    order: col.order,
                    boardId: board._id,
                    jobApplication: [],
                })
            })
        );

        //update the board with new columnid
        board.columns = column.map((col)=> col._id);
        await board.save();

        return board;
    }
    catch(err){
        throw err;
    }
}