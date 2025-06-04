/*import React, { useState } from 'react';
import './App.css';

function App() {
  const [jobDescription, setJobDescription] = useState('');
  const [s3Key, setS3Key] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const apiUrl = 'https://kwai473wi8.execute-api.us-east-1.amazonaws.com/prod';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setQuestions([]);
    try {
      // Validate job description
      const validateResponse = await fetch(`${apiUrl}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: jobDescription }),
      });
      if (!validateResponse.ok) throw new Error('Validation failed');
      const validateData = await validateResponse.json();
      const newS3Key = validateData.s3_key;
      setS3Key(newS3Key);

      // Get questions
      const questionsResponse = await fetch(`${apiUrl}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ s3_key: newS3Key }),
      });
      if (!questionsResponse.ok) throw new Error('Questions fetch failed');
      const questionsData = await questionsResponse.json();
      setQuestions(questionsData.questions || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>AI Interview Coach</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description..."
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Generate Questions</button>
      </form>
      {questions.length > 0 && (
        <div>
          <h2>Interview Questions:</h2>
          <ul>
            {questions.map((q, index) => <li key={index}>{q}</li>)}
          </ul>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;*/

// import React, { useState } from 'react';
// import './App.css';

// export default function App() {
//   const [jobDescription, setJobDescription] = useState('');
//   const [s3Key, setS3Key] = useState('');
//   const [questions, setQuestions] = useState([]);
//   const [error, setError] = useState('');

//   const apiUrl = 'https://kwai473wi8.execute-api.us-east-1.amazonaws.com/prod';

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setQuestions([]);
//     try {
//       const validateResponse = await fetch(`${apiUrl}/validate`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ query: jobDescription }),
//       });

//       if (!validateResponse.ok) throw new Error('Validation failed');
//       const validateData = await validateResponse.json();
//       const newS3Key = validateData.s3_key;
//       setS3Key(newS3Key);

//       const questionsResponse = await fetch(`${apiUrl}/questions`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ s3_key: newS3Key }),
//       });

//       if (!questionsResponse.ok) throw new Error('Questions fetch failed');
//       const questionsData = await questionsResponse.json();
//       setQuestions(questionsData.questions || []);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="container">
//       <header className="header">
//         <div className="header-content">
//           <div className="logo-container">
//             <div className="logo-outer">
//               <div className="logo-inner">
//                 <div className="logo-center"></div>
//               </div>
//             </div>
//           </div>
//           <h1 className="header-title">Intprep</h1>
//         </div>
//       </header>

//       <main className="main-content">
//         <div className="content-wrapper">
//           <form onSubmit={handleSubmit} className="content-container">
//             <div className="grid-container">
//               {/* Job Description Section */}
//               <div className="section">
//                 <h2 className="section-title">Job description</h2>
//                 <div className="content-box">
//                   <textarea
//                     value={jobDescription}
//                     onChange={(e) => setJobDescription(e.target.value)}
//                     placeholder="Paste job description here..."
//                     rows="12"
//                     className="job-textarea"
//                   />
//                 </div>
//               </div>

//               {/* Questions Section */}
//               <div className="section">
//                 <h2 className="section-title">Questions</h2>
//                 <div className="content-box">
//                   {questions.length > 0 ? (
//                     <div className="questions-list">
//                       {questions.map((q, index) => (
//                         <div className="question-item" key={index}>
//                           <span className="question-number">{index + 1}.</span> {q}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="placeholder-text">Questions will appear here after submission.</p>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="button-container">
//               <button className="submit-button" type="submit">
//                 Generate Questions
//               </button>
//             </div>

//             {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }



"use client"

import { useState } from "react"

export default function App() {
  const [jobDescription, setJobDescription] = useState("")
  const [s3Key, setS3Key] = useState("")
  const [questions, setQuestions] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const apiUrl = "https://kwai473wi8.execute-api.us-east-1.amazonaws.com/prod"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setQuestions([])
    setIsLoading(true)

    try {
      const validateResponse = await fetch(`${apiUrl}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: jobDescription }),
      })

      if (!validateResponse.ok) throw new Error("Validation failed")
      const validateData = await validateResponse.json()
      const newS3Key = validateData.s3_key
      setS3Key(newS3Key)

      const questionsResponse = await fetch(`${apiUrl}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ s3_key: newS3Key }),
      })

      if (!questionsResponse.ok) throw new Error("Questions fetch failed")
      const questionsData = await questionsResponse.json()
      setQuestions(questionsData.questions || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logoContainer}>
            <div style={styles.logo}>
              <span style={styles.logoText}>🎯</span>
            </div>
            <h1 style={styles.title}>AI Interview Coach</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.contentWrapper}>
          <div style={styles.gridContainer}>
            {/* Left Side - Input */}
            <div style={styles.inputSection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Job Description</h2>
                <p style={styles.sectionSubtitle}>
                  Paste the job description below to generate relevant interview questions
                </p>
              </div>

              <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.textareaContainer}>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here...

Example:
- Software Engineer position
- Required skills: React, Node.js, Python
- Experience: 3+ years
- Responsibilities: Build web applications..."
                    style={styles.textarea}
                    rows={16}
                    required
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(isLoading ? styles.submitButtonLoading : {}),
                    ...(jobDescription.trim() === "" ? styles.submitButtonDisabled : {}),
                  }}
                  disabled={isLoading || jobDescription.trim() === ""}
                >
                  {isLoading ? (
                    <>
                      <span style={styles.spinner}></span>
                      Generating Questions...
                    </>
                  ) : (
                    "Generate Interview Questions"
                  )}
                </button>
              </form>
            </div>

            {/* Right Side - Output */}
            <div style={styles.outputSection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Interview Questions</h2>
                <p style={styles.sectionSubtitle}>
                  {questions.length > 0
                    ? `${questions.length} questions generated based on your job description`
                    : "Generated questions will appear here"}
                </p>
              </div>

              <div style={styles.outputContainer}>
                {error && (
                  <div style={styles.errorContainer}>
                    <div style={styles.errorIcon}>⚠️</div>
                    <div>
                      <h3 style={styles.errorTitle}>Error</h3>
                      <p style={styles.errorMessage}>{error}</p>
                    </div>
                  </div>
                )}

                {questions.length > 0 ? (
                  <div style={styles.questionsList}>
                    {questions.map((question, index) => (
                      <div key={index} style={styles.questionItem}>
                        <div style={styles.questionNumber}>{index + 1}</div>
                        <div style={styles.questionText}>{question}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !error && (
                    <div style={styles.placeholderContainer}>
                      <div style={styles.placeholderIcon}>💡</div>
                      <h3 style={styles.placeholderTitle}>Ready to Practice?</h3>
                      <p style={styles.placeholderText}>
                        Enter a job description on the left to generate personalized interview questions that will help
                        you prepare for your next opportunity.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "1rem 0",
    position: "sticky",
    top: 0,
    zIndex: 10,
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  logo: {
    width: "40px",
    height: "40px",
    backgroundColor: "#3b82f6",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "1.5rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: 0,
  },
  main: {
    flex: 1,
    padding: "2rem 0",
  },
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 1.5rem",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    minHeight: "600px",
  },
  inputSection: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  outputSection: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  sectionHeader: {
    marginBottom: "1.5rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 0.5rem 0",
  },
  sectionSubtitle: {
    fontSize: "0.875rem",
    color: "#64748b",
    margin: 0,
    lineHeight: "1.4",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  textareaContainer: {
    // flex: 1,
    marginBottom: "1rem",
  },
  textarea: {
    width: "100%",
    // height: "100%",
    minHeight: "400px",
    // padding: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  submitButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "0.75rem 1.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  },
  submitButtonLoading: {
    backgroundColor: "#6b7280",
    cursor: "not-allowed",
  },
  submitButtonDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #ffffff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  outputContainer: {
    height: "500px",
    overflowY: "auto",
  },
  questionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  questionItem: {
    display: "flex",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  questionNumber: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "600",
    flexShrink: 0,
  },
  questionText: {
    fontSize: "0.875rem",
    lineHeight: "1.5",
    color: "#374151",
  },
  placeholderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    textAlign: "center",
    padding: "2rem",
  },
  placeholderIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  placeholderTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#374151",
    margin: "0 0 0.5rem 0",
  },
  placeholderText: {
    fontSize: "0.875rem",
    color: "#6b7280",
    lineHeight: "1.5",
    margin: 0,
  },
  errorContainer: {
    display: "flex",
    gap: "0.75rem",
    padding: "1rem",
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    border: "1px solid #fecaca",
  },
  errorIcon: {
    fontSize: "1.25rem",
    flexShrink: 0,
  },
  errorTitle: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#dc2626",
    margin: "0 0 0.25rem 0",
  },
  errorMessage: {
    fontSize: "0.875rem",
    color: "#7f1d1d",
    margin: 0,
    lineHeight: "1.4",
  },
}
