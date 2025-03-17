export default function Seat(props: any) {
  return (
    <div
      className={` ${props.vip?"w-15" : "w-12" } h-8 ${props.isTop == true?"rounded-t-lg" : "rounded-b-lg"} text-center transition-all duration-300 ${
        props.ischoose ? "bg-reserved" : props.vip ? "bg-chair-vip" : "bg-chair-reg"
      }`}
    >
      {props.num}
    </div>
  );
}


// props.num =  table.seat[1]