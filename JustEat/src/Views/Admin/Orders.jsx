import { useEffect } from "react";
import Header from "../../Components/Header";
import { useUser } from "../../Contexts/User";

export default function Orders(){

    const { getUserInfo } = useUser();
    
    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <div className="absolute w-full h-full flex flex-col">
            <div className="flex flex-col min-w-full min-h-full p-8">
                <Header />
            </div>
        </div>
    );
}