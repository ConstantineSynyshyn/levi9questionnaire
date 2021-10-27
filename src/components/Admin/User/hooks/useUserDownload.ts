import { useCallback } from "react"

import { DOWNLOAD_USER_LIST } from "@constants/apiRoutes"
import { getTimeLeftString, getTimeObject } from "@utils/index"

const columns = [
  [
    "Email",
    "Is confirmed",
    "Quiz start time",
    "Quiz end time",
    "Score",
    "Quiz time",
  ],
]

const useUserDownload = () => {
  return useCallback(() => {
    fetch(DOWNLOAD_USER_LIST, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((users) => {
        const result = users.reduce((list: string[][], item: any) => {
          const quizStartTimeValue = item.quizStartTime
            ? new Date(item.quizStartTime)
            : null
          const quizEndTimeValue = item.quizEndTime
            ? new Date(item.quizEndTime)
            : null
          const email = item.email
          const isConfirmed = item.isConfirmed ? "Yes" : "No"
          const quizStartTime = quizStartTimeValue
            ? `${quizStartTimeValue.toLocaleDateString()} ${quizStartTimeValue.toLocaleTimeString()}`
            : "-"
          const quizEndTime = quizEndTimeValue
            ? `${quizEndTimeValue.toLocaleDateString()} ${quizEndTimeValue.toLocaleTimeString()}`
            : "-"
          const score = item?.quizScore || "-"
          const quizTime = item?.quizTime
            ? getTimeLeftString(getTimeObject(item?.quizTime))
            : "-"
          return [
            ...list,
            [email, isConfirmed, quizStartTime, quizEndTime, score, quizTime],
          ]
        }, columns)
        let csvContent =
          "data:text/csv;charset=utf-8," +
          result.map((item: string[]) => item.join(",")).join("\n")
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => {
        console.log("download failed")
      })
  }, [])
}

export default useUserDownload
