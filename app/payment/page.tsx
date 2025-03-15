"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Pay() {
    const searchParams = useSearchParams();
    const data = searchParams.get("data");
    const choosenSeats = data ? JSON.parse(decodeURIComponent(data)) : [];
    const [price, setPrice] = useState<number[]>([]);

    useEffect(() => {
        const newPrices = choosenSeats.map((data:any) =>
            data.table < 7 ? 250000 : 150000
        );
        console.log(newPrices)
        setPrice(newPrices);
    }, []);
    
    let total = price.reduce((acc, num) => acc + num, 0);
    console.log(total);

    return (
        <div>
            <div className="bg-[#3E1E1A] w-full py-4 px-20 flex justify-between items-center">
                <h1 className="text-text text-4xl">A'Resto</h1>
            </div>
            <div className=" min-h-[100vh] w-full bg-background px-20 py-10">
                <div className="w-2/3 mx-auto pb-10">
                    {choosenSeats.map((data: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="w-full py-4 px-5 rounded flex justify-between items-center"
                            >
                                <p className="text-text text-3xl">
                                    Table {data.table} Seat {data.seat}
                                </p>
                                <p className="text-text text-2xl">
                                    {data.table < 7 ? "VIP" : "Reguler"}
                                </p>
                                <p className="text-text text-3xl">
                                    Rp: {data.table < 7 ? "250,000" : "150,000"}
                                </p>
                            </div>
                        );
                    })}
                </div>
                <div className="w-full fixed bottom-0 bg-table-vip left-0 p-5">
                    <p className="text-center text-2xl">
                        Total: {total.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
