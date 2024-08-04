import dayjs from 'dayjs'

const FormatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

const convertFirestoreTimestampToDayjs = (timestamp) => {
    const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    return dayjs(milliseconds);
}

export { FormatDate, convertFirestoreTimestampToDayjs } 