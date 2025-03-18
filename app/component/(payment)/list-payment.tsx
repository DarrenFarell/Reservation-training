import SubList from "@/app/component/(payment)/sub-list-pay";
export default function List(props:any) {
    return (
        <div className="py-4 px-5 mb-8" >
            <div
                className="w-full rounded flex justify-between items-center bg-table-reg p-3 text-3xl text-slate-800 "
            >
                <p>Table {props.data.table}</p>
                <p>{props.data.type}</p>
                <p>
                    Rp:{" "}
                    {(
                        props.data.seat.length *
                        (props.data.type == "vip" ? 250000 : 150000)
                    ).toLocaleString()}
                </p>
            </div>
            {props.data.seat.map((i: any, index: any) => {
                return <SubList seatId={i} data={props.data} key={index} />;
            })}
        </div>
    );
}
