"use client";

import { FaCartPlus } from "react-icons/fa";
import { tableReg, tableVip2, tableVip1 } from "./lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";

type prev = {
    table?: string;
    seat: string;
};

type vip = { id: number; type: string; seat: any };

export default function Home() {
    const [vip1, setVip1] = useState<vip[]>(tableVip1);
    const [vip2, setVip2] = useState<vip[]>(tableVip2);
    const [reg, setReg] = useState<vip[]>(tableReg);
    const [vipClick, setVipClick] = useState(false);
    const [regClick, setRegClick] = useState(false);
    const [table, setTable] = useState();
    const [choosen, setChoosen] = useState<prev[]>([]);
    const router = useRouter();

    function handleTableClick(id: any) {
        setTable(() => {
            console.log(id);
            return id;
        });
        id < 7 ? setVipClick(true) : setRegClick(true);
    }

    function handleSetSeat(num: any) {
        const isAlreadyInList = choosen.some(
            (item) => item.table === table && item.seat === num
        );

        if (isAlreadyInList) {
            setChoosen((prev) => {
                return prev.filter((data) => {
                    return !(data.table === table && data.seat === num);
                });
            });
        } else {
            setChoosen((prev) => {
                return [...prev, { table: table, seat: num }];
            });
        }

        if (table !== undefined && table < 4) {
            setVip1((prev) => {
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
        }
        if (table !== undefined && table < 7) {
            setVip2((prev) => {
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
        }
        if (table !== undefined && table > 6) {
            setReg((prev) => {
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
        }

        console.log(choosen);
    }

    function handleExitPop() {
        setVipClick(false);
        setRegClick(false);
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
                <div
                    className={`z-10 bg-slate-800/80 w-[100%] h-[100%] fixed top-0 left-0 ${
                        vipClick ? "fixed" : "hidden"
                    } `}
                    onClick={handleExitPop}
                >
                    <div
                        className="flex flex-col items-center justify-center h-full gap-5"
                        onClick={() => console.log("hello")}
                    >
                        <h1 className=" text-5xl text-text font-bold">
                            Choose yout seat
                        </h1>
                        <div className="w-100 mx-10 my-15">
                            <div id="chair" className="flex justify-between">
                                <div
                                    className={` w-30 h-13 rounded-t-lg text-center ${
                                        (table ?? 1) < 4
                                            ? vip1[(table ?? 1) - 1]?.seat?.[
                                                  "1"
                                              ]
                                                ? "bg-reserved"
                                                : "bg-chair-vip"
                                            : vip2[(table ?? 1) - 4]?.seat?.[
                                                  "1"
                                              ]
                                            ? "bg-reserved"
                                            : "bg-chair-vip"
                                    }`}
                                    onClick={() => handleSetSeat(1)}
                                >
                                    1
                                </div>
                                <div
                                    className={` w-30 h-13 rounded-t-lg text-center ${
                                        (table ?? 1) < 4
                                            ? vip1[(table ?? 1) - 1]?.seat?.[
                                                  "2"
                                              ]
                                                ? "bg-reserved"
                                                : "bg-chair-vip"
                                            : vip2[(table ?? 1) - 4]?.seat?.[
                                                  "2"
                                              ]
                                            ? "bg-reserved"
                                            : "bg-chair-vip"
                                    }`}
                                    onClick={() => handleSetSeat(2)}
                                >
                                    2
                                </div>
                                <div
                                    className={` w-30 h-13 rounded-t-lg text-center ${
                                        (table ?? 1) < 4
                                            ? vip1[(table ?? 1) - 1]?.seat?.[
                                                  "3"
                                              ]
                                                ? "bg-reserved"
                                                : "bg-chair-vip"
                                            : vip2[(table ?? 1) - 4]?.seat?.[
                                                  "3"
                                              ]
                                            ? "bg-reserved"
                                            : "bg-chair-vip"
                                    }`}
                                    onClick={() => handleSetSeat(3)}
                                >
                                    3
                                </div>
                            </div>
                            <div className="w-full h-40 bg-table-vip flex items-center justify-center font-bold text-2xl text-text">
                               {table} VIP
                            </div>
                            <div id="chair" className="flex justify-between">
                                <div
                                    className={` w-30 h-13 rounded-b-lg text-center ${
                                        (table ?? 1) < 4
                                            ? vip1[(table ?? 1) - 1]?.seat?.[
                                                  "4"
                                              ]
                                                ? "bg-reserved"
                                                : "bg-chair-vip"
                                            : vip2[(table ?? 1) - 4]?.seat?.[
                                                  "4"
                                              ]
                                            ? "bg-reserved"
                                            : "bg-chair-vip"
                                    }`}
                                    onClick={() => handleSetSeat(4)}
                                >
                                    4
                                </div>
                                <div
                                    className={` w-30 h-13 rounded-b-lg text-center ${
                                        (table ?? 1) < 4
                                            ? vip1[(table ?? 1) - 1]?.seat?.[
                                                  "5"
                                              ]
                                                ? "bg-reserved"
                                                : "bg-chair-vip"
                                            : vip2[(table ?? 1) - 4]?.seat?.[
                                                  "5"
                                              ]
                                            ? "bg-reserved"
                                            : "bg-chair-vip"
                                    }`}
                                    onClick={() => handleSetSeat(5)}
                                >
                                    5
                                </div>
                                <div
                                    className={` w-30 h-13 rounded-b-lg text-center ${
                                        (table ?? 1) < 4
                                            ? vip1[(table ?? 1) - 1]?.seat?.[
                                                  "6"
                                              ]
                                                ? "bg-reserved"
                                                : "bg-chair-vip"
                                            : vip2[(table ?? 1) - 4]?.seat?.[
                                                  "6"
                                              ]
                                            ? "bg-reserved"
                                            : "bg-chair-vip"
                                    }`}
                                    onClick={() => handleSetSeat(6)}
                                >
                                    6
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end pop-up  */}

                <div className=" flex items-center justify-between">
                    {/* left side */}
                    <div className="">
                        {vip1.map((table, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-60 mx-10 my-15"
                                    onClick={() => handleTableClick(table.id)}
                                >
                                    <div
                                        id="chair"
                                        className="flex justify-between"
                                    >
                                        <div
                                            className={` w-15 h-8 rounded-t-lg text-center  transition-all duration-300 ${
                                                table.seat[1]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            1
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                                table.seat[2]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            2
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                                table.seat[3]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            3
                                        </div>
                                    </div>
                                    <div className="w-full h-20 bg-table-vip flex items-center justify-center font-bold text-2xl text-text">
                                        {table.id} {table.type}
                                    </div>
                                    <div
                                        id="chair"
                                        className="flex justify-between"
                                    >
                                        <div
                                            className={` w-15 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                                table.seat[4]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            4
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                                table.seat[5]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            5
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                                table.seat[6]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            6
                                        </div>
                                    </div>
                                </div>
                            );
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
                        {vip2.map((table, index) => {
                            return (
                                <div
                                    key={index}
                                    className="w-60 mx-10 my-15"
                                    onClick={() => handleTableClick(table.id)}
                                >
                                    <div
                                        id="chair"
                                        className="flex justify-between"
                                    >
                                        <div
                                            className={` w-15 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                                table.seat[1]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            1
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                                table.seat[2]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            2
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                                table.seat[3]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            3
                                        </div>
                                    </div>
                                    <div className="w-full h-20 bg-table-vip flex items-center justify-center font-bold text-2xl text-text">
                                        {table.id} {table.type}
                                    </div>
                                    <div
                                        id="chair"
                                        className="flex justify-between"
                                    >
                                        <div
                                            className={` w-15 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                                table.seat[4]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            4
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                                table.seat[5]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            5
                                        </div>
                                        <div
                                            className={` w-15 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                                table.seat[6]
                                                    ? "bg-reserved"
                                                    : "bg-chair-vip"
                                            }`}
                                        >
                                            6
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* end right side */}
                </div>
            </div>

            {/* start pop-up  */}
            <div
                className={`z-10 bg-slate-800/80 w-[100%] h-[100%] fixed top-0 left-0 ${
                    regClick ? "fixed" : "hidden"
                }`}
                onClick={handleExitPop}
            >
                <div className="flex flex-col items-center justify-center h-full gap-5">
                    <h1 className=" text-5xl text-text font-bold">
                        Choose yout seat
                    </h1>
                    <div className="w-100 mx-10 my-15">
                        <div id="chair" className="flex justify-between">
                            <div
                                className={` w-20 h-10 rounded-t-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["1"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(1)}
                            >
                                1
                            </div>
                            <div
                                className={` w-20 h-10 rounded-t-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["2"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(2)}
                            >
                                2
                            </div>
                            <div
                                className={` w-20 h-10 rounded-t-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["3"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(3)}
                            >
                                3
                            </div>
                            <div
                                className={` w-20 h-10 rounded-t-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["4"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(4)}
                            >
                                4
                            </div>
                        </div>
                        <div className="w-full h-40 bg-table-reg flex items-center justify-center font-bold text-2xl text-slate-800">
                           {table} Regular
                        </div>
                        <div id="chair" className="flex justify-between">
                            <div
                                className={` w-20 h-10 rounded-b-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["5"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(5)}
                            >
                                5
                            </div>
                            <div
                                className={` w-20 h-10 rounded-b-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["6"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(6)}
                            >
                                6
                            </div>
                            <div
                                className={` w-20 h-10 rounded-b-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["7"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(7)}
                            >
                                7
                            </div>
                            <div
                                className={` w-20 h-10 rounded-b-lg text-center ${
                                    reg[(table ?? 0) - 7]?.seat?.["8"]
                                        ? "bg-reserved"
                                        : "bg-chair-reg"
                                }`}
                                onClick={() => handleSetSeat(8)}
                            >
                                8
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end pop-up  */}

            {/* start regular */}
            <div className="bg-background w-full  px-20 py-10 grid grid-cols-4 gap-10">
                {/* start regular */}
                {reg.map((table, index) => {
                    return (
                        <div
                            key={index}
                            className="w-60 mx-10"
                            onClick={() => handleTableClick(table.id)}
                        >
                            <div id="chair" className="flex justify-between">
                                <div
                                    className={` w-12 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                        table.seat[1]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    1
                                </div>
                                <div
                                    className={` w-12 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                        table.seat[2]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    2
                                </div>
                                <div
                                    className={` w-12 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                        table.seat[3]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    3
                                </div>
                                <div
                                    className={` w-12 h-8 rounded-t-lg text-center transition-all duration-300 ${
                                        table.seat[4]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    4
                                </div>
                            </div>
                            <div className="w-full h-20 bg-table-reg flex items-center justify-center font-bold text-1xl text-slate-800">
                                {table.id} {table.type}
                            </div>
                            <div id="chair" className="flex justify-between">
                                <div
                                    className={` w-12 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                        table.seat[5]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    5
                                </div>
                                <div
                                    className={` w-12 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                        table.seat[6]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    6
                                </div>
                                <div
                                    className={` w-12 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                        table.seat[7]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    7
                                </div>
                                <div
                                    className={` w-12 h-8 rounded-b-lg text-center transition-all duration-300 ${
                                        table.seat[8]
                                            ? "bg-reserved"
                                            : "bg-chair-reg"
                                    }`}
                                >
                                    8
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* end regular */}
        </div>
    );
}
