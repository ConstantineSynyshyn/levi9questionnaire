import React from "react";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { useRouter } from "next/router";

import { ROUTES } from "@constants/routes";
import useHandleSort from './hooks/useHandleSort';
import useHandlePageChange from './hooks/useHandlePageChange';
import { UsersOverviewType } from "./types";
import BaseTable from "./Table";

interface Props {
  users: UsersOverviewType
  count: number
  rowPerPage: number
}

const columnsConfig = [
  {
    title: "Email",
    fieldName: "email",
    sortable: true,
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
    title: "Score",
    fieldName: "score",
    sortable: true,
  },
  {
    title: "Quiz time",
    fieldName: "quizTime",
    sortable: true,
  },
  {
    title: "Is email confirmed",
    fieldName: "isConfirmed",
  },
];

const UserOverview: React.FC<Props> = (props) => {
  const { users, count, rowPerPage } = props;
  const router = useRouter();
  const { sortBy, direction, doOrderList } = useHandleSort();
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
        score: item?.score || '-',
        quizTime: item?.quizTime || '-',
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
  const { currentPage, handleChangePage } = useHandlePageChange()

  return (
    <Paper>
      <Box p={2}>
        <BaseTable
          data={data}
          columns={columnsConfig}
          onRowClick={onClick}
          sortBy={sortBy}
          direction={direction}
          onOrderClick={doOrderList}
          count={count}
          currentPage={currentPage - 1}
          handlePage={handleChangePage}
          rowPerPage={rowPerPage}
        />
      </Box>
    </Paper>
  );
};

export default UserOverview;
