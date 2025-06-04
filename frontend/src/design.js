import "./App.css"

export default function Page() {
    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <div className="logo-container">
                        <div className="logo-outer">
                            <div className="logo-inner">
                                <div className="logo-center"></div>
                            </div>
                        </div>
                    </div>
                    <h1 className="header-title">Intprep</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="content-container">
                        <div className="grid-container">
                            {/* Job Description Section */}
                            <div className="section">
                                <h2 className="section-title">Job description</h2>
                                <div className="content-box">
                                    <p className="job-description">
                                        We are looking for a motivated Software Developer Intern to join our development team. You will
                                        assist in building, testing, and maintaining web and backend applications. This role offers hands-on
                                        experience with modern technologies like JavaScript, React, Python, REST APIs, and cloud services.
                                        Ideal candidates are quick learners with strong problem-solving skills and a passion for technology.
                                    </p>
                                </div>
                            </div>

                            {/* Questions Section */}
                            <div className="section">
                                <h2 className="section-title">Questions</h2>
                                <div className="content-box">
                                    <div className="questions-list">
                                        <div className="question-item">
                                            <span className="question-number">1.</span> How would you explain the difference between REST and
                                            RESTful APIs?
                                        </div>
                                        <div className="question-item">
                                            <span className="question-number">2.</span> What is the role of useEffect in React, and when would
                                            you use it?
                                        </div>
                                        <div className="question-item">
                                            <span className="question-number">3.</span> How do you ensure your code is reliable and
                                            maintainable?
                                        </div>
                                        <div className="question-item">
                                            <span className="question-number">4.</span> Have you ever deployed an application or worked with
                                            cloud services (like AWS, Azure, or GCP)?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="button-container">
                            <button className="submit-button" onClick={() => console.log("Submit clicked")}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}