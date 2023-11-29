export default function Header(){
    return (
        <div className="flex justify-between p-4 shadow">
            <div className="flex">
                <img src="logo.svg" title="JustEat" alt="JustEat" className="w-36" />
                <div className="flex items-center ml-8 space-x-6">
                    <a href="#" className="text-lg hover:underline text-zinc-800">Restaurantes</a>
                    <a href="#" className="text-lg hover:underline text-zinc-800">Estafetas</a>
                    <a href="#" className="text-lg hover:underline text-zinc-800">Ajuda</a>
                </div>
            </div>
            <div className="flex space-x-4">
                <button className="border-2 rounded-md px-3 py-1 border-zinc-800 text-lg font-medium text-zinc-800 hover:bg-zinc-800 hover:text-white">Criar Conta</button>
                <button className="border-2 rounded-md px-3 py-1 border-zinc-800 bg-zinc-800 text-lg text-white hover:bg-zinc-900 hover:border-zinc-900 font-medium">Iniciar Sessão</button>
            </div>
        </div>  
    );
}