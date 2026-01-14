/**
 * Google Calendar integration utilities
 * Allows users to add stock benefit dates to their Google Calendar
 */

export interface CalendarEvent {
  title: string;
  description: string;
  startDate: string; // YYYY-MM-DD format
  endDate: string; // YYYY-MM-DD format
}

/**
 * Generate a Google Calendar add event URL
 * Opens Google Calendar in a new window with pre-filled event details
 */
export const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    dates: `${event.startDate.replace(/-/g, '')}/${event.endDate.replace(/-/g, '')}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

/**
 * Open Google Calendar add event in a new window
 */
export const addToGoogleCalendar = (event: CalendarEvent): void => {
  const url = generateGoogleCalendarUrl(event);
  window.open(url, '_blank', 'width=800,height=600');
};

/**
 * Create a calendar event from stock benefit data
 */
export const createBenefitCalendarEvent = (
  companyName: string,
  exRightDate: string,
  benefitDescription: string,
  eventType: 'ex-right' | 'ex-dividend' = 'ex-right'
): CalendarEvent => {
  const dateObj = new Date(exRightDate);
  const dateStr = dateObj.toISOString().split('T')[0];
  
  const eventLabel = eventType === 'ex-right' ? '権利確定日' : '権利落ち日';
  
  return {
    title: `${companyName} - ${eventLabel}`,
    description: `${companyName}の${eventLabel}\n優待内容: ${benefitDescription}`,
    startDate: dateStr,
    endDate: dateStr,
  };
};
