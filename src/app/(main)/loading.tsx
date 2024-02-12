import Spinner from "@/components/ui/spinner";

export default function Loading() {

    return (
        <div className="h-screen flex flex-row items-center justify-center gap-3">
            <Spinner/>
           <div className="text-red-500 text-4xl italic">Loading...</div>
        </div>
    );
}