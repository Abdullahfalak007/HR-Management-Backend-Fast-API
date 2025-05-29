"use client";

type Props = {
  isEditing: boolean;
  data: {
    email: string;
    slackId: string;
    skypeId: string;
    githubId: string;
  };
  onChange: (d: Partial<Props["data"]>) => void;
  onBack: () => void;
  onSubmit: () => void;
  submitting: boolean;
};

export default function StepAccountAccess({
  isEditing,
  data,
  onChange,
  onBack,
  onSubmit,
  submitting,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {Object.entries(data).map(([name, value]) => (
          <input
            key={name}
            name={name}
            type={name === "email" ? "email" : "text"}
            placeholder={`Enter ${name}`}
            value={value}
            onChange={handleChange}
            readOnly={isEditing && name === "email" && Boolean(value)}
            className={`
              h-12 w-full bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 placeholder-[var(--input-placeholder)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]
              ${
                isEditing && name === "email" && value
                  ? "cursor-not-allowed bg-opacity-50"
                  : ""
              }
            `}
          />
        ))}
      </div>

      {/* Cancel/Add only when Adding */}
      {!isEditing && (
        <div className="flex justify-between pt-4 border-t border-[var(--border)]">
          <button
            onClick={onBack}
            className="px-6 py-2 rounded border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--text-primary)]"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="bg-[var(--accent)] px-6 py-2 rounded text-[var(--text-primary)] hover:bg-[var(--accent-hover)] disabled:opacity-50 transition"
          >
            {submitting ? "Submitting..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
}
