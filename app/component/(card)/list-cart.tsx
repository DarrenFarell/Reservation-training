import { MdDelete } from "react-icons/md";
import SubList from "@/app/component/(card)/sub-list-card";

export default function List(props: any) {
    function handleDelete() {
        props.handleDeleteTable(props.index);
    }
    return (
        <div className="rounded-2xl overflow-hidden">
            <div className="w-full py-4 px-5 rounded-t-2xl bg-table-vip flex justify-between items-center mt-8">
                <p className="text-text text-3xl">Table {props.data.table}</p>
                <p className="text-text text-3xl">{props.data.type}</p>
                <div className="cursor-pointer" onClick={() => handleDelete()}>
                    <MdDelete className="text-text text-3xl" />
                </div>
            </div>
            {props.data.seat.map((seatNum: any, seatIndex: any) => {
                return (
                    <SubList
                        seatNum={seatNum}
                        seatIndex={seatIndex}
                        index={props.index}
                        onDelete={props.handleDeleteSeat}
                    />
                );
            })}
        </div>
    );
}
