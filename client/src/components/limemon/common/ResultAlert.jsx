import { FaCheckCircle, FaInfoCircle } from "react-icons/fa"

export default function ResultAlert({ type, title, text }) {
    switch (type) {
        case 'success':
            return (
                <div role="alert" className="rounded border-l-4 border-green-500 bg-green-50 p-3 absolute right-5 bottom-5 w-80 h-20 z-50">
                    <div class="flex items-center gap-2 text-green-800">
                        <FaCheckCircle />
                        <strong class="block font-medium">{title}</strong>
                    </div>

                    <p className="mt-2 text-sm text-green-700">
                        {text}
                    </p>
                </div>
            )
        case 'danger':
            return (
                <div role="alert" className="rounded border-l-4 border-red-500 bg-red-50 p-3 absolute right-5 bottom-5 w-80 h-20 z-50">
                    <div class="flex items-center gap-2 text-red-800">
                        <FaInfoCircle />
                        <strong class="block font-medium">{title}</strong>
                    </div>

                    <p className="mt-2 text-sm text-red-700">
                        {text}
                    </p>
                </div>
            )
        case 'warning':
            return (
                <div role="alert" className="rounded border-l-4 border-yellow-500 bg-yellow-50 p-3 absolute right-5 bottom-5 w-80 h-20 z-50">
                    <div class="flex items-center gap-2 text-yellow-800">
                        <FaInfoCircle />
                        <strong class="block font-medium">{title}</strong>
                    </div>

                    <p className="mt-2 text-sm text-yellow-700">
                        {text}
                    </p>
                </div>
            )
    }
}