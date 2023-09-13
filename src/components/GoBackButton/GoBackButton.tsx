import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ArrowDefaultIcon from 'components/icons/ArrowDefaultIcon';

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      buttonStyle="secondary"
      iconSlot={<ArrowDefaultIcon width={32} height={32} direction="left" />}
      onClick={() => navigate(-1)}
    >
      Go back
    </Button>
  );
};

export default React.memo(GoBackButton);
