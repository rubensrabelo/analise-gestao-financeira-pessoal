import { useState } from "react";
import styles from "./UploadFile.module.css";
import { handleFileChange } from "./helpers/handleFileChange";
import { useUpload } from "./helpers/useUpload";

function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<String>("");
  
  const { handleSubmit, loading } = useUpload(file, setMessage);

  return (
    <div className={styles.uploadContainer}>

      <div className={`${styles.uploadBox} ${file ? styles.hasFile : ""}`}>
        <h2>Upload de Arquivo CSV</h2>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => handleFileChange(e, setFile, setMessage)}
          className={styles.uploadInput}
          data-testid="file-input"
        />
        <button
          onClick={handleSubmit}
          disabled={!file || loading}
          className={`${styles.uploadButton} ${file ? styles.fileSelected : ""}`}
          data-testid="submit-button"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </div>

      {message && <pre className={styles.uploadMessage}>{message}</pre>}
    </div>
  );
}


export default UploadPage;
