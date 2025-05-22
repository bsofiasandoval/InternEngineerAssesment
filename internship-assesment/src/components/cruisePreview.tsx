export const CruisePreview = ({
  id,
  name,
  imageUrl,
  description,
}: {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}) => {
  return (
    <div className="flex bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 mb-4">
      <div className="flex-shrink-0">
        <img 
          className="w-32 h-24 object-cover" 
          src={imageUrl} 
          alt={name}
        />
      </div>
      <div className="flex-1 p-4">
        <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer line-clamp-1">
          {name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
};
