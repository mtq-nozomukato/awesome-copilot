const strengthColors = [
  { color: "bg-red-500", label: "非常に弱い" },
  { color: "bg-orange-400", label: "弱い" },
  { color: "bg-yellow-400", label: "普通" },
  { color: "bg-green-500", label: "強い" },
];

export default function StrengthIndicator({ strength }: { strength: number }) {
  return (
    <div className="w-full flex items-center gap-2 mt-2" aria-live="polite">
      <div className={`h-3 w-24 rounded ${strengthColors[strength]?.color || 'bg-gray-300'}`}></div>
      <span className="text-sm dark:text-white">{strengthColors[strength]?.label || '未評価'}</span>
    </div>
  );
}
