"use client";
import { useState, useEffect } from "react";
import List from "@/app/component/(card)/list-cart";
import Footer from "@/app/component/(card)/footer-cart";


type data = {
  table: string;
  type: string;
  seat: any[];
};

export default function Cart() {
  const [choosen, setChoosen] = useState<data[]>([]);

  useEffect(() => {
    const storedSeats = localStorage.getItem("choosenSeats");
    if (storedSeats) {
      setChoosen(JSON.parse(storedSeats)); 
    }

    setChoosen((prev) => {
        return prev.map((data,index) => {
            return {...data, seat: data.seat.sort()}
        })
    })
    setChoosen((prev) => {
        return prev.filter((data,index) => {
            return data.seat.length != 0
        })
    })
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
      </div>
      <div className=" min-h-[100vh] w-full bg-background px-20 py-5">
        <div className="w-1/2 mx-auto">
          {choosen.map((data, index) => {
            return (
              <List data={data} handleDeleteSeat={handleDeleteSeat} index={index} handleDeleteTable={handleDelete}/>
            );
          })}

          <Footer countSeat={countSeat} choosen={choosen}/>
        </div>
      </div>
    </div>
  );
}
