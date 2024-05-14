export type ChatProps = {
  id: number;
  created_at: string;
  user: {
    id: number;
    name: string;
    surname: string;
    img: string;
    patronymic?: string;
  };
  updated_at?: string;
};

export type MessageProps = {
  id: number;
  chat_id: number;
  user_id: number;
  text: string;
  created_at: string;
  user: {
    id: number;
    name: string;
    surname: string;
    img: string;
    patronymic?: string;
  };
  updated_at?: string;
};
