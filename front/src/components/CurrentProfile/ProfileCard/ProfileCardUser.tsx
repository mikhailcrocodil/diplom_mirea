import React, { FC } from "react";
import { CardUser, InfoBlock } from "./ProfileCard.styled";
import { useTranslation } from "react-i18next";
import { useFormatDate } from "../../../shared/hooks/useFormatDate";

type Props = {
  email: string;
  country?: string;
  city?: string;
  timezone?: string;
  date_registration?: string;
};
// I18N ADD REQUEST
const ProfileCardUser: FC<Props> = ({
  country,
  timezone,
  city,
  email,
  date_registration = "",
}) => {
  const { t } = useTranslation();
  const { formatIsoDate } = useFormatDate();
  return (
    <CardUser>
      <InfoBlock>
        <span>{t("labels.email")}</span>
        <span>{email}</span>
      </InfoBlock>
      {(country || city) && (
        <InfoBlock>
          <span>{t("labels.country_city")}</span>
          <span>
            {country}, {city}
          </span>
        </InfoBlock>
      )}
      {timezone && (
        <InfoBlock>
          <span>{t("labels.timezone")}</span>
          <span>{timezone}</span>
        </InfoBlock>
      )}
      <InfoBlock>
        <span>{t("labels.date_registration")}</span>
        <span>{formatIsoDate(date_registration)}</span>
      </InfoBlock>
    </CardUser>
  );
};

export default ProfileCardUser;
