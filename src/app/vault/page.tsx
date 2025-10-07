import Vault from '@/components/Vault';

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800">My Vault</h1>
      </div>
      <Vault />
    </div>
  );
}