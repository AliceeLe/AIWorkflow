export default function StepThree({ onNext }: { onNext: (data: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Step 3: Privacy & Infrastructure
      </h2>

      <button
        onClick={() => onNext({ step3: "infra_choice" })}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}
