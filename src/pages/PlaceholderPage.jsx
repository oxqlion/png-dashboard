const PlaceholderPage = ({ title }) => {
    return (
      <div className="p-8">
        <div className="bg-white rounded-lg shadow-md p-12 border border-gray-200 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-gray-600">This page is under development.</p>
        </div>
      </div>
    );
  };

export default PlaceholderPage;