"use client";
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type data = {
    table: string;
    seat: string;
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

    return (
        <div>
            <div className="bg-[#3E1E1A] w-full py-4 px-20 flex justify-between items-center">
                <h1 className="text-text text-4xl">A'Resto</h1>
                <FaCartPlus className="text-text text-2xl" />
            </div>
            <div className=" min-h-[100vh] w-full bg-background px-20 py-10">
                <div className="w-1/2 mx-auto">
                    {choosen.map((data, index) => {
                        return (
                            <div key={index} className="w-full py-4 px-5 rounded bg-table-vip flex justify-between items-center mb-5">
                                <p className="text-text text-3xl">
                                    Table {data.table} Seat {data.seat}
                                </p>
                                <p className="text-text text-2xl">
                                    {Number(data.table) < 7 ? "VIP" : "Reguler"}
                                </p>
                                <div
                                    className="cursor-pointer"
                                    onClick={() => handleDelete(index)}
                                >
                                    <MdDelete className="text-text text-3xl" />
                                </div>
                            </div>
                        );
                    })}

                    <div className="w-full py-4 px-5 rounded bg-table-reg flex justify-evenly items-center mb-5">
                        <p className="text-slate-800 text-3xl text-center">
                            total Seat : {choosen.length}
                        </p>

                        <p
                            className="text-xl text-center bg-[#3E1E1A] p-2 px-4 shadow-lg rounded-lg text-text hover:bg-background cursor-pointer"
                            onClick={ () => router.push(`/payment?data=${encodeURIComponent(JSON.stringify(choosen))}`)}
                        >
                            Buy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
