export type User = {
  id: string;
  name: string;
  balance: number;
};

export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type Member = {
  id: string;
  discount: number;
  postsLimitPerMonth: number;
};
