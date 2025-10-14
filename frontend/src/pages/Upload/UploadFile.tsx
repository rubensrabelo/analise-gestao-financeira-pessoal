import { useState } from "react";
import styles from "./UploadFile.module.css";
import { uploadCsv } from "../../api/services/file/upload-file.service";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file before uploading.");
      return;
    }

    setLoading(true);
    try {
      const result = await uploadCsv(file);
      setMessage(`${result.message}\n Path: ${result.path}`);

      setTimeout(() => {
        navigate("/reports");
      }, 1500);
    } catch (err: any) {
      setMessage(`${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h2>Upload de Arquivo CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className={styles.uploadInput}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={styles.uploadButton}
      >
        {loading ? "Enviando..." : "Enviar Arquivo"}
      </button>

      {message && <pre className={styles.uploadMessage}>{message}</pre>}
    </div>
  );
}

export default UploadPage;
