import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { Calendar } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { localizer, getMessagesES } from "../../helpers"
import { useState } from "react"
import { useAuthStore, useCalendarStore, useUIStore } from "../../hooks"
import { useEffect } from "react"

export const CalendarPage = () => {
     const { user } = useAuthStore()
     const { openDateModal } = useUIStore()
     const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
     const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week")
     const eventStyleGetter = (event, start, end, isSelected) => {
          const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid) 
          const style = {
               backgroundColor: isMyEvent? "#347CF7": '#465660',
               borderRadius: "0px",
               opacity: 0.8,
               color: "#fff",
          }
          return { style }
     }

     const onViewChanged = (event) => {
          localStorage.setItem("lastView", event)
          setLastView(event)
     }

     const onSelect = (event) => {
          setActiveEvent(event)
     }

     const onDoubleClick = () => {
          openDateModal()
     }

     useEffect(() => {
          startLoadingEvents()
     }, [])

     return (
          <>
               <Navbar />
               <Calendar
                    culture='es'
                    localizer={localizer}
                    defaultView={lastView}
                    events={events}
                    startAccessor='start'
                    endAccessor='end'
                    style={{ height: "calc(100vh - 80px)" }}
                    messages={getMessagesES()}
                    eventPropGetter={eventStyleGetter}
                    components={{
                         event: CalendarEvent,
                    }}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelect}
                    onView={onViewChanged}
               />
               <CalendarModal />
               <FabAddNew />
               <FabDelete />
          </>
     )
}
