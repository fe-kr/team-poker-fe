import React from 'react';
import useUserContext from '@hooks/useUserContext';

const withRoomAdminVisibility = Component => props => {
  const { isAdmin } = useUserContext();

  return isAdmin && <Component {...props} />;
};

export default withRoomAdminVisibility;
