export default function StepTwoA({ onNext }: { onNext: (data: any) => void }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 font-mono">
      <h2 className="text-2xl font-bold mb-6 text-black">
        Step 2A: Solo Developer Focus
      </h2>

      <button
        onClick={() => onNext({ step2: "solo_choice" })}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
      >
        Continue
      </button>
    </div>
  );
}
