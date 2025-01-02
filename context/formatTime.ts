export const formatTimeClock = (timeInMillis: number) => {
    // const hours = Math.floor(timeInMillis/3600000);
    // const minutes = Math.floor((timeInMillis % 3600000) / 60000);
    // const seconds = Math.floor((timeInMillis%60000) / 1000);
    // const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10? '0' :''}${seconds}`;
    // return formattedTime;

    // const formatTime = (timeInSeconds: number) => {
      const hours = String(Math.floor(timeInMillis / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((timeInMillis % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(timeInMillis % 60).padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    // };
  }


  export const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  export const mins = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "40",
    "45",
    "50",
    "55",
  ];
