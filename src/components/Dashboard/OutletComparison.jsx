const OutletComparison = () => {
    return (
        <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
            <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Monitor className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Soon</h2>
                <p className="text-gray-600">
                    The outlet comparison feature is currently under development.
                    Stay tuned for detailed analytics and comparisons between different outlets.
                </p>
            </div>
        </div>
    );
};

export default OutletComparison;