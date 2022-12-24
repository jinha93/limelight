import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

function Pagination({ total, limit, page, setPage }) {
    const numPages = 10;
    const lastPage = Math.ceil(total / limit);
    const pageCnt = Math.floor((page-1) / numPages) * 10;

    
    return (
        <div className="w-full flex items-center justify-center py-5">
            <div className="w-screen flex items-center justify-between p-3 bg-white/80 rounded-xl shadow">
                <button className="flex items-center hover:text-[#ABDB25] cursor-pointer"
                    onClick={() => setPage(page - 1)} disabled={page === 1}
                >
                    <FaChevronLeft/>
                    <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
                </button>

                <div className="md:flex hidden">
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        page === i + 1 + pageCnt
                        ?
                        <p className="text-sm font-medium leading-none cursor-pointer text-[#ABDB25] border-t border-[#ABDB25] pt-3 mr-4 px-2"
                            key={i + 1 + pageCnt}
                        >
                            {i + 1 + pageCnt} 
                        </p>
                        :
                        i + 1 + pageCnt <= lastPage &&
                        <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-[#ABDB25] border-t border-transparent hover:border-[#ABDB25] pt-3 mr-4 px-2"
                            key={i + 1 + pageCnt}
                            onClick={() => setPage(i + 1 + pageCnt)}
                            aria-current={page === i + 1 + pageCnt ? "page" : null}
                        >
                            {i + 1 + pageCnt}
                        </p>
                    ))}
                </div>
                
                <button className="flex items-center hover:text-[#ABDB25] cursor-pointer"
                    onClick={() => setPage(page + 1)} disabled={page === lastPage}
                >
                    <p className="text-sm font-medium leading-none mr-3">Next</p>
                    <FaChevronRight/>
                </button>
            </div>
        </div>
    )
}

export default Pagination;