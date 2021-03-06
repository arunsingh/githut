import React from "react"
import ReactDOM from "react-dom"
import Layout from "./components/Layout"
import styles from '../style.styl' // eslint-disable-line no-unused-vars
import 'jquery' // Material Button
import 'materialize-css' // Style

/**
 * Entrypoint for the react app
 * Provides a basic app wrapper for react
 * @author Fabian Beuke <mail@beuke.org>
 * @license AGPL-3.0
 */
const app = document.createElement('div')
app.id = "app"
document.body.appendChild(app);
ReactDOM.render(<Layout/>, app)
