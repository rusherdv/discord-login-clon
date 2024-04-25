const parseAccountTimestamp = (timestamp) => {
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const parseMessageTimestamp = (timestamp) => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);
  
  const sameDay = currentDate.getDate() === messageDate.getDate() &&
                  currentDate.getMonth() === messageDate.getMonth() &&
                  currentDate.getFullYear() === messageDate.getFullYear();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = yesterday.getDate() === messageDate.getDate() &&
                      yesterday.getMonth() === messageDate.getMonth() &&
                      yesterday.getFullYear() === messageDate.getFullYear();

  if (sameDay) {
    return `hoy a las ${messageDate.getHours()}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
  } else if (isYesterday) {
    return `ayer a las ${messageDate.getHours()}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
  } else {
    const formattedDate = `${messageDate.getDate().toString().padStart(2, '0')}/${(messageDate.getMonth() + 1).toString().padStart(2, '0')}/${messageDate.getFullYear()} ${messageDate.getHours()}:${messageDate.getMinutes().toString().padStart(2, '0')}`;
    return formattedDate;
  }
};

export {
    parseAccountTimestamp,
    parseMessageTimestamp
}