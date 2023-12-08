import Spinner from "./Spinner"

export default function Button({ onSubmit, text, loading, disabled }){
    return (
        <button onClick={onSubmit} disabled={disabled} className="min-w-[4rem]">
            <div className="group relative block h-full bg-white before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-dashed before:border-gray-900">
                <div className="rounded-lg border-2 border-gray-900 bg-white transition -translate-y-1 -translate-x-1 px-2 py-1 hover:bg-lime-200 group-hover:translate-y-0 group-hover:translate-x-0">
                    {!loading ? text : <Spinner/>}
                </div>
            </div>
        </button>
    )
}