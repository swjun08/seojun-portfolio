/**
 * Purely decorative, very low-opacity color drift behind the page.
 * Rollback: delete the <AmbientBackground /> line in layout.tsx (one line) —
 * this file can stay unused, or delete it too, no other coupling.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="ambient-field pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="ambient-blob ambient-blob-a" />
      <div className="ambient-blob ambient-blob-b" />
      <div className="ambient-blob ambient-blob-c" />
    </div>
  );
}
