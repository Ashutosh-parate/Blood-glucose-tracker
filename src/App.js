import React, { useState } from 'react';
import logo from "./components/images/ATHMA.png";

function GlucoseForm() {
  const [patientName, setPatientName] = useState('');
  const [patientID, setPatientID] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [oes, setOES] = useState('');
  const [ab, setAB] = useState('');
  const [bl, setBL] = useState('');
  const [al, setAL] = useState('');
  const [bd, setBD] = useState('');
  const [ad, setAD] = useState('');
  const [mn, setMN] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formStyle = {
    maxWidth: '550px',
    margin: 'auto',
    padding: '40px',
    paddingright: '10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
  };

  const logoStyle = {
    width: '120px',
    marginBottom: '10px',
  };

  const formTitleStyle = {
    fontSize: '25px', // Reduced by 30%
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    backgroundColor: '#f2f2f2',
  };

  const buttonStyle = {
    backgroundColor: '#007bff', // Blue color
    color: '#fff',
    padding: '12px', // Increased padding
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    width: '100%',
    marginBottom: '10px', // Added margin between buttons
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    display: 'block',
    fontSize: '14px', // Reduced by 30%
  };

  const warningTextStyle = {
    color: 'red',
    fontWeight: 'bold', // Make the text bold
    marginTop: '5px',
    marginBottom: '15px',
    fontSize: '12px',
  };

  const lowTextStyle = {
    color: 'orange',
    fontWeight: 'bold', // Make the text bold
    marginTop: '5px',
    marginBottom: '15px',
    fontSize: '12px',
  };

  const idealRanges = {
    oes: [70, 99],
    ab: [0, 140],
    bl: [70, 99],
    al: [0, 140],
    bd: [70, 99],
    ad: [0, 140],
    mn: [70, 99],
  };

  const calculateAverage = () => {
    const total = parseFloat(oes) + parseFloat(ab) + parseFloat(bl) + parseFloat(al) + parseFloat(bd) + parseFloat(ad) + parseFloat(mn);
    return (total / 7).toFixed(2);
  };

  const getResult = () => {
    const average = calculateAverage();
    if (average < 100) {
      return 'Normal';
    } else if (average >= 100 && average < 126) {
      return 'Prediabetes';
    } else {
      return 'Diabetes';
    }
  };

  const getWarningMessage = () => {
    if (getResult() === 'Diabetes') {
      return 'Warning: You should consult a doctor immediately.';
    }
    return null;
  };

  const handleWhatsAppClick = () => {
    const message = `Hi, it's an emergency. My glucose level is ${calculateAverage()} mg/dL. What should I do now?`;
    window.open(`https://api.whatsapp.com/send?phone=919371930894&text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isOutsideIdealRange = (value, [min, max]) => {
    if (value < min) {
      return 'low';
    } else if (value > max) {
      return 'high';
    }
    return 'normal';
  };

  const renderInputField = (label, value, setValue, id, idealRange) => {
    const rangeStatus = isOutsideIdealRange(parseFloat(value), idealRange);
    
    return (
      <div>
        <label htmlFor={id} style={labelStyle}>{label}</label>
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={inputStyle}
          placeholder="Enter glucose level"
          required
        />
        {rangeStatus === 'high' && value && (
          <div style={warningTextStyle}>Your glucose level is higher than normal. Please consult a doctor.</div>
        )}
        {rangeStatus === 'low' && value && (
          <div style={lowTextStyle}>Your glucose level is lower than normal. Please take care.</div>
        )}
      </div>
    );
  };

  return (
    <div style={formStyle}>
      <div style={headerStyle}>
        <img src={logo} alt="Company Logo" style={logoStyle} />
        <div style={formTitleStyle}>Blood Glucose Tracker</div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="patientName" style={labelStyle}>Patient Name:</label>
          <input
            type="text"
            id="patientName"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            style={inputStyle}
            placeholder="Enter patient name"
            required
          />
        </div>
        <div>
          <label htmlFor="patientID" style={labelStyle}>Patient ID:</label>
          <input
            type="text"
            id="patientID"
            value={patientID}
            onChange={(e) => setPatientID(e.target.value)}
            style={inputStyle}
            placeholder="Enter patient ID"
            required
          />
        </div>
        <div>
          <label htmlFor="date" style={labelStyle}>Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        {renderInputField("On Empty Stomach (OES) - Ideal range is 70 to 99 mg/dL:", oes, setOES, "oes", idealRanges.oes)}
        {renderInputField("2 Hours After Breakfast (AB) - Ideal range is less than 140 mg/dL:", ab, setAB, "ab", idealRanges.ab)}
        {renderInputField("Before Lunch (BL) - Ideal range is 70 to 99 mg/dL:", bl, setBL, "bl", idealRanges.bl)}
        {renderInputField("2 Hours After Lunch (AL) - Ideal range is less than 140 mg/dL:", al, setAL, "al", idealRanges.al)}
        {renderInputField("Before Dinner (BD) - Ideal range is 70 to 99 mg/dL:", bd, setBD, "bd", idealRanges.bd)}
        {renderInputField("2 Hours After Dinner (AD) - Ideal range is less than 140 mg/dL:", ad, setAD, "ad", idealRanges.ad)}
        {renderInputField("Middle of the Night at 3 AM (MN) - Ideal range is 70 to 99 mg/dL:", mn, setMN, "mn", idealRanges.mn)}
        {submitted && (
          <>
            <div style={labelStyle}>
              <strong>Average Glucose Level:</strong> {calculateAverage()} mg/dL
            </div>
            <div style={labelStyle} className={getResult().toLowerCase()}>
              <strong>Result:</strong> {getResult()}
            </div>
            {getWarningMessage() && (
              <div style={warningTextStyle}>
                <strong>{getWarningMessage()}</strong>
              </div>
            )}
            <button
              type="button"
              style={buttonStyle}
              onClick={handleWhatsAppClick}
            >
              Send Emergency Message
            </button>
          </>
        )}
        <button
          type="submit"
          style={buttonStyle}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default GlucoseForm;
