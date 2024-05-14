import { RoutePath } from "../../../../../../app/routing/libs/routePaths";
import { NavLink } from "react-router-dom";
import React from "react";
import { Translation } from "react-i18next";
export const adminItems = [
  {
    content: (
      <NavLink to={`${RoutePath.manage_courses}`}>
        <Translation>{(t) => t("dropdown.admin.manage_courses")}</Translation>
      </NavLink>
    ),
    id: 2,
  },
  {
    content: (
      <NavLink to={`${RoutePath.manage_users}`}>
        <Translation>{(t) => t("dropdown.admin.manage_users")}</Translation>
      </NavLink>
    ),
    id: 1,
  },
  {
    content: (
      <NavLink to={`${RoutePath.all_courses}`}>
        <Translation>{(t) => t("dropdown.admin.all_courses")}</Translation>
      </NavLink>
    ),
    id: 3,
  },
];

export const studentItems = [
  {
    content: (
      <NavLink to={`${RoutePath.all_courses}`}>
        <Translation>{(t) => t("dropdown.student.my_courses")}</Translation>
      </NavLink>
    ),
    id: 1,
  },
];

export const teacherItems = [
  {
    content: (
      <NavLink to={`${RoutePath.all_courses}`}>
        <Translation>{(t) => t("dropdown.student.my_courses")}</Translation>
      </NavLink>
    ),
    id: 1,
  },
];
