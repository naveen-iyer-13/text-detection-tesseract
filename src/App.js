import React, { useState } from 'react';
import ResultsModal from './ResultsModal'
import LoadingModal from './LoadingModal'
import './App.css';

var Tesseract = window.Tesseract;

function App(props){

  const [uploads, setUploads] = useState([])
  const [existingList, setExistingList] = useState([])
  const [recentImageData, setRecentImageData] = useState([])
  const [loading, setLoading] = useState(false)
  const [showOldResults, setShowOldResults] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  const handleChange = (event) => {
    let uploads = []
    uploads.push(URL.createObjectURL(event.target.files[0]))
    setUploads(uploads)
  }

  const generateText = () => {
    if (uploads.length > 0) {
      setLoading(true)
      Tesseract.recognize(
        uploads[0],
        'eng',
        { logger: m => setLoadingText(m.status) }
      ).then(({ data: { text } }) => {
        setLoading(false)
        let newObj = {img: uploads[0], text: text}
        setRecentImageData([newObj])
        setUploads([])
        var tempArray = [...existingList, newObj]
        setExistingList(tempArray)
      })
    }
  }

  const closeModals = (e) => {
    e.stopPropagation()
    if (!loading) {
      setLoading(false)
      setRecentImageData([])
      setShowOldResults(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Text Recognition App</h1>
      </header>

      { /* File uploader */ }
      <section className="hero">
        <label className="fileUploaderContainer">
          Click here to upload Image
          <input type="file" accept="image/png, image/jpeg" id="fileUploader" onChange={handleChange} />
        </label>

        <div>
          { uploads.map((value, index) => {
            return <img alt={"uploaded"+index} src={value} width="150px" style={{margin: "20px auto", display: "flex"}}/>
          }) }
        </div>

        <button onClick={generateText} className="button">Generate</button>
        <button onClick={() => setShowOldResults(true)} className="button">Show older results</button>

        {showOldResults && <ResultsModal headerText="Result History" data={existingList} closeModals={closeModals}/>}
        {loading && <LoadingModal text={loadingText} data={existingList} closeModals={closeModals}/>}
        {recentImageData.length > 0 && <ResultsModal headerText="Result" data={recentImageData} closeModals={closeModals}/>}
      </section>

    </div>
  )

}



export default App
