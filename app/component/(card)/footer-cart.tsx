import { useRouter } from "next/navigation";


export default function Footer(props:any) {
      const router = useRouter();
    
    return (
        <div className="w-full py-4 px-5 rounded-2xl bg-table-reg flex justify-evenly items-center mt-8">
            <p className="text-slate-800 text-3xl text-center">
                total Seat : 12
            </p>

            <p
                className="text-xl text-center bg-[#3E1E1A] p-2 px-4 shadow-lg rounded-lg text-text hover:bg-background cursor-pointer"
                onClick={() =>
                    router.push(
                        `/payment?dta=${encodeURIComponent(
                            JSON.stringify(props.choosen)
                        )}`
                    )
                }
            >
                Buy
            </p>
        </div>
    );
}
