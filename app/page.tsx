"use client";

import { FaCartPlus } from "react-icons/fa";
import { fullData } from "./lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Table from "./component/table";
import PopUp from "./component/popup";
import PopUpReg from "./component/popup-reg";

type data = { id: number; type: string; seat: any };

export default function Home() {
  const [data, setData] = useState<data[]>(fullData);
  const [vipClick, setVipClick] = useState(false);
  const [regClick, setRegClick] = useState(false);
  const [table, setTable] = useState();
  const [choosen, setChoosen] = useState<any[]>([]);
  const router = useRouter();

  function handleTableClick(id: any, type: any) {
    setTable(() => {
      console.log(id);
      return id;
    });
    type === "vip" ? setVipClick(true) : setRegClick(true);
  }

  function handleSetSeat(num: any, type: string) {
    const isAlreadyInList = choosen.some(
      (item) => item.table == table && item.seat.includes(num)
    );
    if (isAlreadyInList) {
      setChoosen((prev) => {
        return prev.map((data) => {
          return data.table == table
            ? {...data, seat: data.seat.filter((i:any) => i != num)}
            : {...data};
        });
      });
    } else {
      const isChoose = choosen.some((item) => item.table == table);
      console.log(isChoose);
      if (isChoose) {
        setChoosen((prev) => {
          return prev.map((data: any) => {
            return data.table == table
              ? { ...data, seat: [...data.seat, num] }
              : {...data};
          });
        });
      } else {
        setChoosen((prev) => [
          ...prev,
          { table: `${table}`, type: type, seat: [num] },
        ]);
      }
    }

    setData((prev) => {
      return prev.map((data) => {
        if (data.id != table) {
          return data;
        } else {
          return {
            ...data,
            seat: {
              ...data.seat,
              [Number(num)]: !data.seat[`${num}`],
            },
          };
        }
      });
    });

    console.log(choosen);
  }

  function handleExitPop() {
    setVipClick(false);
    setRegClick(false);
    console.log(choosen)
  }

  return (
    <div className="">
      <div className="bg-[#3E1E1A] w-full py-4 px-20 flex justify-between items-center">
        <h1 className="text-text text-4xl">A'Resto</h1>
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.setItem("choosenSeats", JSON.stringify(choosen));
            router.push("/cart");
          }}
        >
          <FaCartPlus className="text-text text-2xl" />
        </div>
      </div>

      <div className="bg-background w-full  px-20 ">
        {/* start pop-up  */}
        <PopUp
          handleExitPop={handleExitPop}
          onSeatClick={handleSetSeat}
          isShow={vipClick}
          data={data}
          table={table}
        />
        <PopUpReg
          handleExitPop={handleExitPop}
          onSeatClick={handleSetSeat}
          isShow={regClick}
          data={data}
          table={table}
        />
        {/* end pop-up  */}

        <div className=" flex items-center justify-between">
          {/* left side */}
          <div className="">
            {data.map((table, index) => {
              return index < 3 ? (
                <Table
                  type={table.type}
                  py="py-5"
                  id={table.id}
                  onTableCLick={handleTableClick}
                  isChoose={table.seat}
                />
              ) : null;
            })}
          </div>
          {/* end left side */}

          {/* start center side */}
          <div>
            <div className="w-[600] h-[500] bg-stage rounded-lg flex justify-center items-center text-3xl text-text font-bold">
              Stage
            </div>
          </div>
          {/* end center side */}

          {/* start right side */}
          <div>
            {data.map((table, index) => {
              return index > 2 && index < 6 ? (
                <Table
                  type={table.type}
                  py="py-5"
                  id={table.id}
                  onTableCLick={handleTableClick}
                  isChoose={table.seat}
                />
              ) : null;
            })}
          </div>
          {/* end right side */}
        </div>
      </div>

      {/* start regular */}
      <div className="bg-background w-full  px-20 py-10 grid grid-cols-4 gap-10">
        {data.map((table, index) => {
          return index > 5 ? (
            <Table
              type={table.type}
              py="py-5"
              id={table.id}
              onTableCLick={handleTableClick}
              isChoose={table.seat}
            />
          ) : null;
        })}
      </div>
      {/* end regular */}
    </div>
  );
}
