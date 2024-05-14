import useBreadcrumbs from "use-react-router-breadcrumbs";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { memo } from "react";
import { routeConfigPrivate } from "../../../app/routing/libs/routeConfig";

const BreadcrumbStyled = styled(NavLink)`
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  transition: 0.3s all;
  color: var(--breadcrumbs-color);
  &:hover {
    color: var(--breadcrumbs-color-hover);
  }
`;

export const Breadcrumbs = memo(() => {
  const breadcrumbs = useBreadcrumbs(routeConfigPrivate);
  console.log(breadcrumbs);
  return (
    <>
      {breadcrumbs.map(({ match, breadcrumb, key }, index) => {
        const isKey = key === "/";
        return (
          !isKey && (
            <BreadcrumbStyled key={match.pathname} to={match.pathname}>
              {breadcrumb} {index !== breadcrumbs.length - 1 ? " / " : ""}
            </BreadcrumbStyled>
          )
        );
      })}
    </>
  );
});
