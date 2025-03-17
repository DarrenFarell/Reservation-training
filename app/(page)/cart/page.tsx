"use client";
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type data = {
  table: string;
  type: string;
  seat: any[];
};

export default function Cart() {
  const [choosen, setChoosen] = useState<data[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedSeats = localStorage.getItem("choosenSeats");
    if (storedSeats) {
      setChoosen(JSON.parse(storedSeats)); // Restore data
    }
  }, []);

  function handleDelete(id: any) {
    setChoosen((prev) => {
      return prev.filter((data, index) => {
        return index != id;
      });
    });
  }
  function handleDeleteSeat(seatNum: any, tableNum: any) {
    setChoosen((prev) => {
      return prev.map((data, index) => {
        return index == tableNum
          ? {
              ...data,
              seat: data.seat.filter((i, index) => index != seatNum),
            }
          : { ...data };
      });
    });

    setChoosen((prev) => {
        return prev.filter((data, index) => {
            return data.seat.length != 0
        })
    })
  }
  
  const countSeat = choosen.reduce((acc, data)=> {
    return acc + data.seat.length
  },0)

  return (
    <div>
      <div className="bg-[#3E1E1A] w-full py-4 px-20 flex justify-between items-center">
        <h1 className="text-text text-4xl">A'Resto</h1>
        <FaCartPlus className="text-text text-2xl" />
      </div>
      <div className=" min-h-[100vh] w-full bg-background px-20 py-5">
        <div className="w-1/2 mx-auto">
          {choosen.map((data, index) => {
            return (
              <div className="rounded-2xl overflow-hidden">
                <div
                  key={index}
                  className="w-full py-4 px-5 rounded-t-2xl bg-table-vip flex justify-between items-center mt-8"
                >
                  <p className="text-text text-3xl">Table {data.table}</p>
                  <p className="text-text text-3xl">{data.type}</p>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDelete className="text-text text-3xl" />
                  </div>
                </div>
                {data.seat.map((seatNum: any, seatIndex) => {
                  return (
                    <div className="w-full py-2 px-5 bg-table-reg flex justify-between items-center border-b-1">
                      <p className="text-slate-700 text-xl">Seat {seatNum}</p>
                      <div
                        className="cursor-pointer"
                        onClick={() => handleDeleteSeat(seatIndex, index)}
                      >
                        <MdDelete className="text-slate-700 text-xl" />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

          <div className="w-full py-4 px-5 rounded-2xl bg-table-reg flex justify-evenly items-center mt-8">
            <p className="text-slate-800 text-3xl text-center">
              total Seat : {countSeat}
            </p>

            <p
              className="text-xl text-center bg-[#3E1E1A] p-2 px-4 shadow-lg rounded-lg text-text hover:bg-background cursor-pointer"
              onClick={() =>
                router.push(
                  `/payment?data=${encodeURIComponent(JSON.stringify(choosen))}`
                )
              }
            >
              Buy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
