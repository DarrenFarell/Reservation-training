import { MdDelete } from "react-icons/md";

export default function SubList(props:any) {
    function handleDeleteSeat() {
        props.onDelete(props.seatIndex, props.index)
    }
    return (
        <div className="w-full py-2 px-10 bg-table-reg flex justify-between items-center border-b-1">
            <p className="text-slate-700 text-xl">Seat {props.seatNum}</p>
            <div
                className="cursor-pointer"
                onClick={() => handleDeleteSeat()}
            >
                <MdDelete className="text-slate-700 text-xl" />
            </div>
        </div>
    );
}
