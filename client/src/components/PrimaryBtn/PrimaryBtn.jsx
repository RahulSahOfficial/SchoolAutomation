import "./PrimaryBtn.css"
export default function ({btnText,btnOnClick}) {
  return (
    <button onClick={btnOnClick} className="p-btn">{btnText}</button>
  )
}