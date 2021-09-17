import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";

import { ROUTES } from "@constants/routes";
import { UsersOverviewType } from "./types";
import BaseTable from "./Table";

interface Props {
  users: UsersOverviewType;
}

const columnsConfig = [
  {
    title: "Email",
    fieldName: "email",
  },
  {
    title: "Quiz started at",
    fieldName: "quizStartTime",
  },
  {
    title: "Quiz passed at",
    fieldName: "quizEndTime",
  },
  {
    title: "Is email confirmed",
    fieldName: "isConfirmed",
  },
];

const UserOverview: React.FC<Props> = (props) => {
  const { users } = props;
  const router = useRouter();
  const data = React.useMemo(
    () =>
      [...users].map((item) => ({
        email: item.email,
        isConfirmed: item.isConfirmed ? "Yes" : "No",
        quizStartTime: item.quizStartTime
          ? new Date(item.quizStartTime).toUTCString()
          : "-",
        quizEndTime: item.quizEndTime
          ? new Date(item.quizStartTime).toUTCString()
          : "-",
      })),
    [users]
  );
  const onClick = React.useCallback(
    (row) => {
      router.push({
        pathname: ROUTES.USERS_INFO,
        query: { id: row.email },
      });
    },
    [router]
  );
  return (
    <Paper>
      <Box p={2}>
        <BaseTable data={data} columns={columnsConfig} onRowClick={onClick} />
      </Box>
    </Paper>
  );
};

export default UserOverview;
