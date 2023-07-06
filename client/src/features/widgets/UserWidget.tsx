import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../state/store';

interface UserWidgetProps {
  userId?: number;
  picturePath?: string;
}

export default function UserWidget(props: UserWidgetProps) {
  const { userId, picturePath } = props ?? {};

  const [user, setUser] = useState<any | null>(null);
  const navigate = useNavigate();
  const token = useSelector<RootState>((state) => state.token);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  if (!user) {
    return null;
  }

  const { firstName, lastName, location, occupation, viewedProfile, impressions, friends } = user ?? {};

  useEffect(() => {
    getUser();
  }, []);

  return <></>;
}
