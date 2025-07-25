'ue client'

import 'react-calendar/dist/Calendar.css'
import Calendar from "react-calendar"

export function CalendarAmostra({ setData, data }: any) {
    return (
        <div className="react-calendar">
            <Calendar className="custom-calendar" onChange={setData} value={data} />
        </div>
    )
}