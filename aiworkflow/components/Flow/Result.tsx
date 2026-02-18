export default function Result({ data }: { data: any }) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">
        Recommendation
      </h2>

      <pre className="bg-gray-100 p-6 rounded-lg text-left">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
