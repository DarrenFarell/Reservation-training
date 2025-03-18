"use client";

import { fullData } from "./lib/data";
import { useState } from "react";
import Table from "./component/table";
import PopUp from "./component/popup";
import PopUpReg from "./component/popup-reg";
import CartButton from "@/app/component/cart-button";

type data = { id: number; type: string; seat: any };

export default function Home() {
    const [data, setData] = useState<data[]>(fullData);
    const [vipClick, setVipClick] = useState(false);
    const [regClick, setRegClick] = useState(false);
    const [table, setTable] = useState();
    const [choosen, setChoosen] = useState<any[]>([]);

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
                        ? {
                              ...data,
                              seat: data.seat.filter((i: any) => i != num),
                          }
                        : { ...data };
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
                            : { ...data };
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
        console.log(choosen);
    }

    return (
        <div className="">
            <div className="bg-[#3E1E1A] w-full py-4 px-20 flex justify-between items-center">
                <h1 className="text-text text-4xl">A'Resto</h1>
                <CartButton choosen={choosen}/>
            </div>

            <div className="bg-background w-full  px-20 ">

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

                <div className=" flex items-center justify-between">
                    <div className="">
                        {data.map((table, index) => {
                            return index < 3 ? (
                                <Table
                                    key={index}
                                    type={table.type}
                                    py="py-5"
                                    id={table.id}
                                    onTableCLick={handleTableClick}
                                    isChoose={table.seat}
                                />
                            ) : null;
                        })}
                    </div>

                    <div>
                        <div className="w-[600] h-[500] bg-stage rounded-lg flex justify-center items-center text-3xl text-text font-bold">
                            Stage
                        </div>
                    </div>

                    <div>
                        {data.map((table, index) => {
                            return index > 2 && index < 6 ? (
                                <Table
                                    key={index}
                                    type={table.type}
                                    py="py-5"
                                    id={table.id}
                                    onTableCLick={handleTableClick}
                                    isChoose={table.seat}
                                />
                            ) : null;
                        })}
                    </div>
                </div>
            </div>

            <div className="bg-background w-full  px-20 py-10 grid grid-cols-4 gap-10">
                {data.map((table, index) => {
                    return index > 5 ? (
                        <Table
                            key={index}
                            type={table.type}
                            py="py-5"
                            id={table.id}
                            onTableCLick={handleTableClick}
                            isChoose={table.seat}
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
}
