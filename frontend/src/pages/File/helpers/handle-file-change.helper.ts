export function handleFileChange(
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: (file: File | null) => void,
  setMessage: (msg: string) => void
) {
  const selected = e.target.files?.[0] || null;
  setFile(selected);
  setMessage("");
}
