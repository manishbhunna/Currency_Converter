import React, { useReducer,useEffect, useState } from 'react'

const Home = () => {
  
  const [Country, setCountry]=useState([]);
  const [usercurrency1,setusercurrency1]=useState("USD");
  const [usercurrency2,setusercurrency2]=useState("INR");
  const [Currency1,setCurrency1]=useState(10);
   const [Currency2,setCurrency2]=useState([]);


  useEffect(() => {
    const fetchdata = async ()=>{
    try{const res = await 
      fetch("https://countriesnow.space/api/v0.1/countries")
       const data= await res.json();
   setCountry(data.data)
      }
       catch (error){
    console.log("Error fetching data:",error)
   }
  }
   fetchdata()
    }
    , 
    []
  );
    
  const handleinput1 = async (e) => {
  const countryName = e.target.value;

  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/currency", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ country:countryName  })
});

    const data = await res.json();
    setusercurrency1(data.data.currency)

  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

const handleinput2 = async (e) => {
  const countryName = e.target.value;

  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/currency", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ country:countryName  })
});

    const data = await res.json();
    setusercurrency2(data.data.currency)

  } catch (error) {
    console.log("Error fetching data:", error);
  }
};


const api="fyP3lHlEYxcH1WtiOEUhCQf6768MhV1n"

useEffect(()=>{
const fetchdata=async()=>{
  const res= await fetch(`https://api.apilayer.com/currency_data/live?source=${usercurrency1}&currencies=${usercurrency2}`,{
   headers: {
  apikey:api}});
  const data= await res.json();
  console.log(data.quotes)
  setCurrency2(data.quotes)

}
fetchdata();
},[usercurrency2])

const amounthandle=(e)=>{
   setCurrency1(e.target.value)
}
   const num =Currency1*Currency2[`${usercurrency1}${usercurrency2}`];
   const formatted = num.toFixed(2);


  return (
   <div className="container mt-4">
  <h1>Currency Converter</h1>

  {/* Input + First Currency Select */}
  <div className="row g-3 align-items-end mt-3">
    <div className="col-md-4">
      <input
        onChange={amounthandle}
        type="number"
        min={0}
        placeholder="Enter Any Amount"
        className="form-control"
      />
    </div>

    <div className="col-md-4 d-flex flex-column">
      <label className="form-label fw-semibold mb-1">From Currency</label>
      <select
        onChange={handleinput1}
        className="form-select shadow-sm currencylist"
        defaultValue=""
      >
        <option value="" disabled>
          Choose currency
        </option>
        {Country.map((cur) => (
          <option key={cur.iso3} value={cur.country}>
            {cur.country} ({cur.iso3})
          </option>
        ))}
      </select>
    </div>

    <div className="col-md-4 d-flex flex-column">
      <label className="form-label fw-semibold mb-1">To Currency</label>
      <select
        onChange={handleinput2}
        className="form-select shadow-sm currencylist"
        defaultValue=""
      >
        <option value="" disabled>
          Choose currency
        </option>
        {Country.map((cur) => (
          <option key={cur.iso3} value={cur.country}>
            {cur.country} ({cur.iso3})
          </option>
        ))}
      </select>
    </div>
  </div>

  <div className="mt-4">
  <h2> Live Results</h2>
  </div>

  <div className="mt-5">
    <h1> 1 {usercurrency1} = {Currency2[`${usercurrency1}${usercurrency2}`]} {usercurrency2}</h1>
  </div>
  <div className="mt-5">
    <h1> {Currency1} {usercurrency1} ={formatted}  {usercurrency2}</h1>
  </div>

  
</div>

  )
}

export default Home