export default function Footer() {
    return (
        <div className="w-full h-auto py-4 bg-gray-900 absolute bottom-0 flex flex-col items-center content-center">
            <div className="flex">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <h2 className="text-white text-xl ml-2">JungliMoviez</h2>
            </div>
            <div className="flex items-center gap-5 text-white">
                <h3>Term and Privacy Notice</h3>
                <h3>Send us Feedback</h3>
                <h3>help</h3>
            </div>
        </div>
    );
}