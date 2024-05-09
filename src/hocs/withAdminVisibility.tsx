import useUserContext from '@hooks/useUserContext';

const withRoomAdminVisibility = Component => {
  const EnhancedComponent = props => {
    const { isAdmin } = useUserContext();

    return isAdmin && <Component {...props} />;
  };

  EnhancedComponent.displayName = `WithRoomAdminVisibility.${Component.displayName || Component.name}`;

  return EnhancedComponent;
};

export default withRoomAdminVisibility;
