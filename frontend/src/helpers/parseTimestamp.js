export const formatChatDate = async timestamp => {
  const currentDate = new Date();
  const messageDate = new Date(timestamp);

  // Comparar si el mensaje fue enviado el mismo día
  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    // Obtener la hora en formato AM/PM
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convertir a formato 12 horas

    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${amOrPm}`;
  }

  // Comparar si el mensaje fue enviado el día anterior
  currentDate.setDate(currentDate.getDate() - 1);
  if (
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Yesterday";
  }

  // Comparar si el mensaje fue enviado antes de ayer pero dentro de la misma semana
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const messageDayOfWeek = daysOfWeek[messageDate.getDay()];
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
  const daysDiff = currentDate.getDate() - messageDate.getDate();

  if (daysDiff <= 7 && messageDayOfWeek !== currentDayOfWeek) {
    return messageDayOfWeek;
  }

  // Si ninguna de las condiciones anteriores se cumple, devolver la fecha en formato predeterminado
  return messageDate.toLocaleDateString();
};
