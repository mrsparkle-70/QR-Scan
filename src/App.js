import './App.css';
import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  const [scanResult, setScanResult] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scannerRef.current.render(success, error);

    function success(result) {
      scannerRef.current.clear();
      setScanResult(result);
    }

    function error(err) {
      console.warn(err);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        const scannerElement = document.getElementById('reader');
        if (scannerElement) {
          scannerElement.innerHTML = '';
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>QR scanning</h1>
      {scanResult ? (
        <div>
          Success: <a href={scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default App;
