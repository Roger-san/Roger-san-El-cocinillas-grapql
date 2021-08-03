import React from "react"

export default function pagination({ totalRecipes, pagePosition, setPagePosition }) {
  const pagesCuantity = Math.ceil(totalRecipes / 12)
  const handleClick = (event) => {
    setPagePosition(Number(event.target.id))
  }
  return (
    <div className="navigation" aria-label="Page navigation">
      <ul className="pagination">
        {[...Array(pagesCuantity)].map((x, i) => (
          <li
            key={`page-${i}`}
            className={`page-item page${i + 1} ${pagePosition == i && "active"}`}
            onClick={handleClick}
          >
            <a className="page-link" href="#" id={`${i}`}>
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
