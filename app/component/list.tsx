import { MdDelete } from "react-icons/md";
import SubList from "@/app/component/sub-list";

export default function List(props: any) {
    function handleDelete() {
        props.handleDeleteTable(props.index);
    }
    return (
        <div
            className={` ${
                props.cart ? "rounded-2xl" : "mb-8 rounded-3xl"
            } overflow-hidden`}
        >
            <div
                className={`w-full flex justify-between items-center py-4 rounded-t-2xl  mt-8 ${
                    props.cart
                        ? "px-5 bg-table-vip text-text text-3xl"
                        : "px-4 bg-table-reg text-3xl text-slate-800"
                }`}
            >

                <p >Table {props.data.table}</p>
                <p >{props.data.type}</p>
                
                {props.cart ? (
                    <div
                        className="cursor-pointer"
                        onClick={() => handleDelete()}
                    >
                        <MdDelete className="text-text text-3xl" />
                    </div>
                ) : (
                    <p>
                        Rp:{" "}
                        {(
                            props.data.seat.length *
                            (props.data.type == "vip" ? 250000 : 150000)
                        ).toLocaleString()}
                    </p>
                )}
            </div>

            {props.data.seat.map((seatNum: any, seatIndex: any) => 
                {
                   return props.cart ? (
                        <SubList
                            cart={true}
                            key={seatIndex}     
                            seatNum={seatNum}
                            seatIndex={seatIndex}
                            index={props.index}
                            onDelete={props.handleDeleteSeat}
                        />
                    ) : (
                        <SubList
                            seatId={seatNum}
                            data={props.data}
                            key={seatIndex}
                        />
                    );
                
            })}
        </div>
    );
}

