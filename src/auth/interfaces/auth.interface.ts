export interface IToken {
  userId: number;
  email: string;
  isAdmin: boolean;
}

export interface IRequest extends Request {
  user?: IToken;
}

export const RoleStr = ['User', 'Admin'] as const;
export type RoleType = typeof RoleStr[number];
