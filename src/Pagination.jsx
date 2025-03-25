import React from "react"

export default function Pagination({ totalPosts, limit, setPage, currentPage }) {
    const totalPages = Math.ceil(totalPosts / limit);
    let pages = [];

    // Always show first page
    pages.push(1);

    // Show ellipsis if current page is far from start
    if (currentPage > 3) {
        pages.push('...')
    }

    // Show one page before current page if it's not adjacent to first page
    if (currentPage > 2) {
        pages.push(currentPage - 1);
    }

    // Show current page if it's not first or last
    if (currentPage !== 1 && currentPage !== totalPages) {
        pages.push(currentPage);
    }

    // Show one page after current page if it's not adjacent to last page
    if (currentPage < totalPages - 1) {
        pages.push(currentPage + 1);
    }

    // Show ellipsis if current page is far from end
    if (currentPage < totalPages - 2) {
        pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
        pages.push(totalPages);
    }

    return (
        <div className="flex items-center justify-center gap-1 mt-4">
                {/* Previous Button (<<) */}
            <button
                className={`w-8 h-8 rounded text-white cursor-pointer flex items-center justify-center ${
                    currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
                }`}
                onClick={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                &lt;&lt;
            </button>

            {/* Page Numbers */}
            {pages.map((item, index) => {
                if (item === '...') {
                    return (
                        <span key={index} className="mx-1">
                            ...
                        </span>
                    );
                }
                return (
                    <button
                        key={index}
                        className={`w-8 h-8 rounded text-white cursor-pointer ${
                            item === currentPage ? 'bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'
                        }`}
                        onClick={() => setPage(item)}
                    >
                        {item}
                    </button>
                );
            })}

            {/* Next Button (>>) */}
            <button
                className={`w-8 h-8 rounded text-white cursor-pointer flex items-center justify-center ${
                    currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-500 hover:bg-sky-600'
                }`}
                onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                &gt;&gt;
            </button>
        </div>
    )
}