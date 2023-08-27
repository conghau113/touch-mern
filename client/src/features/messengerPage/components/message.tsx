import SharedAvatarAuthUser from '../../../components/shared/SharedAvatar';

interface MessageProps {
  conservant: any;
  message: any;
}

export default function Message(props: MessageProps) {
  const username = props.conservant.username;
  const message = props.message;

  let styles: any = {};
  if (message.direction === 'to') {
    styles = {
      justifyContent: 'flex-start',
    };
  } else if (message.direction === 'from') {
    styles = {
      messageColor: 'gray-100',
      justifyContent: 'flex-end',
    };
  }

  return (
    <>
      <div className={`flex items-end gap-2 py-1 w-full ${styles?.justifyContent} `}>
        {message.direction === 'to' && <SharedAvatarAuthUser avatar={username} />}
        <div className='rounded-xl bg-gray-100 border py-3 max-h-70% px-2'>{message.content}</div>
      </div>
    </>
  );
}
