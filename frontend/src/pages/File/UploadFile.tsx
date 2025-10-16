import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UploadFile.module.css";
import { handleFileChange } from "./helpers/handle-file-change.helper";
import { handleUpload } from "./helpers/handle-upload.helper";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<String>("");
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const navigate = useNavigate();

  return (
    <div className={styles.uploadContainer}>
      <h2>Upload de Arquivo CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleFileChange(e, setFile, setMessage)}
        className={styles.uploadInput}
      />
      <button
        onClick={async () => {
          setLoading(true);
          const success = await handleUpload(file, setMessage);
          if (success) setTimeout(() => navigate("/reports"), 1500);
          setLoading(false);
        }}
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
