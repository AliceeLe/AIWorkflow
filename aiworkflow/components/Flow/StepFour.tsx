export default function StepFour({ onNext }: { onNext: (data: any) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Step 4: Budget & Scale
      </h2>

      <button
        onClick={() => onNext({ step4: "budget_choice" })}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Finish
      </button>
    </div>
  );
}
