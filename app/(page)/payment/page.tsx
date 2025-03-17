"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pay() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const choosenSeats = data ? JSON.parse(decodeURIComponent(data)) : [];
  const [form, setForm] = useState<any[]>(choosenSeats);
    
  const totalPrice = form.reduce((acc, data)=> {
    console.log(data.type)
    return acc + (data.seat.length * (data.type == "vip" ? 250000 : 150000))
  },0)

  return (
    <div>
      <div className="bg-[#3E1E1A] w-full py-4 px-20 flex justify-between items-center">
        <h1 className="text-text text-4xl">A'Resto</h1>
      </div>
      <div className=" min-h-[100vh] w-full bg-background px-20 py-10">
        <div className="w-2/3 mx-auto pb-10">
          {form.map((data: any, index: number) => {
            return (
              <div className="py-4 px-5 mb-8" key={index}>
                <div
                  key={index}
                  className="w-full rounded flex justify-between items-center"
                >
                  <p className="text-text text-3xl">Table {data.table}</p>
                  <p className="text-text text-3xl">{data.type}</p>
                  <p className="text-text text-3xl">
                    Rp:{" "}
                    {(
                      data.seat.length * (data.type == "vip" ? 250000 : 150000)
                    ).toLocaleString()}
                  </p>
                </div>
                {data.seat.map((i: any, index: any) => {
                  return (
                    <div className="flex justify-between items-center mx-auto px-5" key={index}>
                      <p className="text-text mt-3 text-2xl">seat {i}</p>
                      <p className="text-text mt-3 text-2xl">Rp: {data.type == "regular" ? "150,000": "250,000"}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="w-full fixed bottom-0 bg-table-vip left-0 p-5">
          <p className="text-center text-2xl">
            Total: {totalPrice.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
