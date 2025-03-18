import { MdDelete } from "react-icons/md";

export default function SubList(props:any) {
    function handleDeleteSeat() {
        props.onDelete(props.seatIndex, props.index)
    }
    return (
        <div className={`flex justify-between items-center py-2  ${props.cart ? "bg-table-reg text-slate-700 px-10 text-xl" : "bg-table-vip border-background px-5 text-2xl text-text"}  border-b-1  `}>
            <p className="">Seat {props.cart? props.seatNum : props.seatId}</p>
            {props.cart ? <div
                className="cursor-pointer"
                onClick={() => handleDeleteSeat()}
            >
                <MdDelete />
            </div> : <p>Rp: {props.data.type == "regular" ? "150,000" : "250,000"}</p> }
        </div>
    );
}
