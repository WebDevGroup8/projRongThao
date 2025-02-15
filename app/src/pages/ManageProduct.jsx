//import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function ManageProduct() {
    return (
        <div className="flex flex-col w-screen h-screen ">
            <div className="flex flex-row items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold">Manage Product</h1>
                <div className="flex gap-2">
                    <button
                        type="button"
                        className="text-white bg-primary hover:bg-primary-light font-semibold rounded-lg text-sm w-full px-5 py-2.5 text-center  "
                    >+ Create new</button>
                </div>
            </div>
            <div className="flex items-center justify-between mb-8">
                <div className="relative w-[300px]">
                    <input
                        type="search"
                        placeholder="Search"
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Search className="text-gray-400 absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                </div>
            </div>
            <div className="flex items-center justify-between mb-8">

            </div>
        </div>
    );
};