import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from "react-router-dom"
import { CalendarApp } from "./CalendarApp"
import "./styles.css"

ReactDOM.createRoot(document.getElementById("root")).render(
     // <React.StrictMode>
          <Router>
               <CalendarApp />
          </Router>
     // </React.StrictMode>
)
