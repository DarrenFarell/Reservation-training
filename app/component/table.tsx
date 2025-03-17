import  Seat from "./seat";


export default function Table(props: any) {
  function handleTableClick() {
    return props.onTableCLick(props.id, props.type);
  }
  return (
    <div className={`w-60 mx-10 ${props.py}`} onClick={() => handleTableClick()}>
      {props.type === "vip" ? (
        <div id="chair" className="flex justify-between">
          {Object.entries(props.isChoose).map(([key, value], index) => 
            index < 3 ? <Seat vip={true} isTop={true} ischoose={value} num={key} key={index}/>: null
          )}
        </div>
      ) : (
        <div id="chair" className="flex justify-between">
          {Object.entries(props.isChoose).map(([key, value], index) => 
            index < 4 ? <Seat vip={false} isTop={true} ischoose={value} num={key} key={index}/>: null
          )}
        </div>
      )}

      <div
        className={`w-full h-20 flex items-center justify-center font-bold ${
          props.type === "vip"
            ? " bg-table-vip  text-2xl text-text"
            : " bg-table-reg  text-1xl text-slate-800"
        }`}
      >
        {props.id} {props.type}
      </div>

      
      {props.type  === "vip" ? (
        
        <div id="chair" className="flex justify-between">
          {Object.entries(props.isChoose).map(([key, value], index) => 
            index > 2 ? <Seat vip={true} isTop={false} ischoose={value} num={key} key={index}/>: null
          )}
        </div>
      ) : (
        <div id="chair" className="flex justify-between">
          {Object.entries(props.isChoose).map(([key, value], index) => 
            index > 3 ? <Seat vip={false} isTop={false} ischoose={value} num={key} key={index}/>: null
          )}
        </div>
      )}
      </div>
  );
}
