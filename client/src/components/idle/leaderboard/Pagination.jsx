function Pagination({ total, limit, page, setPage }) {
    const numPages = 10;
    const lastPage = Math.ceil(total / limit);
    const pageCnt = Math.floor((page-1) / numPages) * 10;

    
    return (
        <div className="w-full flex items-center justify-center px-10">
            <div className="w-full flex items-center justify-between">
                <button className="cursor-pointer hover:SUITE-Bold hover:text-[#7b9b18] px-2"
                    onClick={() => setPage(page - 1)} disabled={page === 1}
                >
                    <p className="text-sm ml-3 font-medium leading-none">{"<"}</p>
                </button>

                <div className="flex items-center">
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        page === i + 1 + pageCnt
                        ?
                        // <p className="SUITE-Bold text-[#7b9b18]"
                        <p className="SUITE-Bold text-lg text-[#7b9b18] px-2 rounded-lg"
                            key={i + 1 + pageCnt}
                        >
                            {i + 1 + pageCnt} 
                        </p>
                        :
                        i + 1 + pageCnt <= lastPage &&
                        <p className="cursor-pointer text-sm hover:SUITE-Bold hover:text-[#7b9b18] px-2"
                            key={i + 1 + pageCnt}
                            onClick={() => setPage(i + 1 + pageCnt)}
                            aria-current={page === i + 1 + pageCnt ? "page" : null}
                        >
                            {i + 1 + pageCnt}
                        </p>
                    ))}
                </div>
                
                <button className="cursor-pointer hover:SUITE-Bold hover:text-[#7b9b18] px-2"
                    onClick={() => setPage(page + 1)} disabled={page === lastPage}
                >
                    <p className="text-sm font-medium leading-none mr-3">{">"}</p>
                </button>
            </div>
        </div>
    )
}

export default Pagination;