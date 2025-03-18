export default function SUbList(props:any) {
    return (
        <div
            className="flex justify-between items-center mx-auto px-5 text-text mt-3 text-2xl"  
        >
            <p>seat {props.seatId}</p>
            <p>Rp: {props.data.type == "regular" ? "150,000" : "250,000"}</p>
        </div>
    );
}
