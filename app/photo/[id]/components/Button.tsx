function Button({text}: { text: string }) {
    return (
        <div className="pt-6">
            <button
                className="cursor-pointer w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                onClick={() =>
                    window.location.href = `https://wa.me/15551234567`
                }
            >
                {text}
            </button>
        </div>
    );
};

export default Button;