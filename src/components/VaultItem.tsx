'use client';

interface VaultItemProps {
  item: {
    _id: string;
    title: string;
    username: string;
    url?: string;
    notes?: string;
  };
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onCopyPassword: (id: string) => void;
}

export default function VaultItem({ item, onEdit, onDelete, onCopyPassword }: VaultItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
          {item.username && (
            <p className="text-sm text-gray-600">👤 {item.username}</p>
          )}
 {item.url && (
  <a
    href={item.url}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-blue-600 hover:underline block mt-1"
  >
    🔗 {item.url}
  </a>
)}
        </div>
      </div>

      {item.notes && (
        <p className="text-sm text-gray-500 mb-3 italic">📝 {item.notes}</p>
      )}

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onCopyPassword(item._id)}
          className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Copy Password
        </button>
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}