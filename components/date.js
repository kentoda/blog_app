import {parseISO, format} from 'date-fns'

// 分割代入
export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLL d, yyyy')}</time>
}