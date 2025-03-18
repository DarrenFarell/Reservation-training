import { useRouter } from "next/navigation";
import { FaCartPlus } from "react-icons/fa";


export default function CartButton(props:any) {
    const router = useRouter();

    return (
        <div
            className="cursor-pointer"
            onClick={() => {
                localStorage.setItem("choosenSeats", JSON.stringify(props.choosen));
                router.push("/cart");
            }}
        >
            <FaCartPlus className="text-text text-2xl" />
        </div>
    );
}
