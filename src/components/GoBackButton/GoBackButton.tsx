import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import ArrowLeftIcon from 'components/icons/ArrowLeftIcon';

const GoBackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      buttonStyle="secondary"
      iconSlot={<ArrowLeftIcon width={32} height={32} />}
      onClick={() => navigate(-1)}
    >
      Go back
    </Button>
  );
};

export default React.memo(GoBackButton);
