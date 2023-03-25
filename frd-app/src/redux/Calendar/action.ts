export function addEvent(event:object) {
    return {
      type: '@@calendar/ADD_EVENT' as const,
      event:event
    }
  }

  export type CalendarEventAction = ReturnType<typeof addEvent>;