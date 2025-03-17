

export default function PopUp(props:any) {

    function handleExitPop(){
        props.handleExitPop()
    }

    function handleSetSeat(id:any) {
        props.onSeatClick(id, "vip")
    }

  return (
    <div
      className={`z-10 bg-slate-800/80 w-[100%] h-[100%] fixed top-0 left-0 ${
        props.isShow ? "fixed" : "hidden"
      } `}
      onClick={handleExitPop}
    >
      <div
        className="flex flex-col items-center justify-center h-full gap-5"
        onClick={() => console.log("hello")}
      >
        <h1 className=" text-5xl text-text font-bold">Choose yout seat</h1>
        <div className="w-100 mx-10 my-15">
          <div id="chair" className="flex justify-between">
            {Object.entries(props.data[props.table -1]?.seat || {}).map(([key, value], index) => 
                        index < 3 ?<div
                        className={` w-30 h-13 rounded-t-lg text-center ${
                          value
                            ? "bg-reserved"
                            : "bg-chair-vip"
                        }`}
                        onClick={() => handleSetSeat(key)}
                      >
                        {key}
                      </div>: null
                      )}
            
          </div>
          <div className="w-full h-40 bg-table-vip flex items-center justify-center font-bold text-2xl text-text">
            {props.table} VIP
          </div>
          <div id="chair" className="flex justify-between">
          {Object.entries(props.data[props.table -1]?.seat || {}).map(([key, value], index) => 
                        index > 2 ?<div
                        className={` w-30 h-13 rounded-b-lg text-center ${
                          value
                            ? "bg-reserved"
                            : "bg-chair-vip"
                        }`}
                        onClick={() => handleSetSeat(key)}
                      >
                        {key}
                      </div>: null
                      )}

          </div>
        </div>
      </div>
    </div>
  );
}
