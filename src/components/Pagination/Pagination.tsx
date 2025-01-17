import { NavLink } from 'react-router-dom'
import './Pagination.scss'

export function buildPaginationScheme (currentPage: number, pagesCount: number): (number)[] {
  const prevPageNumber:number = currentPage - 1
  const nextPageNumber:number = currentPage + 1

  const scheme = [1, prevPageNumber, currentPage, nextPageNumber, pagesCount] // строим схему
  const filteredScheme = scheme.filter(item => item > 0 && item <= pagesCount) // чистим те, которые меньше 0 или больше pagesCounter
  const set = new Set(filteredScheme) // удаляем дубли
  const result = Array.from(set) // обратно приводим к массиву

  if (result[0] + 1 !== result[1]) result.splice(1, 0, -1) // если между первым и вторым элементом пропуск, вставляем ...
  const lastElement = result[result.length - 1]
  const secondLastElement = result[result.length - 2]
  if (secondLastElement + 1 !== lastElement) {
    result.splice(result.length - 1, 0, -1)
  } // если между последним и предпоследним пропуск, вставляем ...

  return result
}

export function renderPagination (pagesCount: number, currentPage: number, link: string) {
  if (!pagesCount) return null

  const paginationScheme = buildPaginationScheme(currentPage, pagesCount)

  return (
      <ul className="pagination">
        {paginationScheme.map((item:number, index) => {
          if (item === -1) {
            return (
              <li className="page-item" key={index}>
                <span className="page-link">...</span>
              </li>
            )
          }
          if (`${item}` === `${currentPage}`) {
            return (
              <li className="page-item active" key={index}>
                <NavLink className="page-link" to={`${link}${item}`}>
                  {item}
                </NavLink>
              </li>
            )
          }

          return (
            <li className="page-item" key={index}>
              <NavLink className="page-link" to={`${link}${item}`}>
                {item}
              </NavLink>
            </li>
          )
        })}
      </ul>
  )
}
